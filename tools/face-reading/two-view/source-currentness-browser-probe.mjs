/* global process, fetch, WebSocket */
// Optional local Edge/Chromium CDP probe for a disposable private-intake copy.
// Never reads pixels from the browser or writes its profile outside the test temp.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

export async function openSourceCurrentnessBrowser({ address, temporary }) {
  const edge =
    process.env.FACE_REVIEW_BROWSER_EXE ||
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const userData = join(temporary, 'browser-profile');
  const child = spawn(
    edge,
    [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      '--remote-debugging-port=0',
      '--remote-allow-origins=*',
      '--user-data-dir=' + userData,
      address + '/two-view',
    ],
    { stdio: 'ignore', windowsHide: true },
  );
  let socket;
  let callId = 0;
  const pending = new Map();
  try {
    let debugPort;
    for (let i = 0; i < 150; i++) {
      try {
        const content = await readFile(join(userData, 'DevToolsActivePort'), 'utf8');
        debugPort = Number(content.trim().split(/\r?\n/)[0]);
        if (Number.isInteger(debugPort) && debugPort > 0) break;
      } catch {
        /* Browser startup continues. */
      }
      if (child.exitCode !== null) throw Error('BROWSER_EXITED_EARLY');
      await sleep(100);
    }
    if (!debugPort) throw Error('BROWSER_DEBUG_PORT_UNAVAILABLE');
    let target;
    for (let i = 0; i < 100; i++) {
      const pages = await (await fetch('http://127.0.0.1:' + debugPort + '/json/list')).json();
      target = pages.find((p) => p.type === 'page' && p.url.startsWith(address));
      if (target) break;
      await sleep(100);
    }
    assert.ok(target?.webSocketDebuggerUrl, 'BROWSER_PAGE_UNAVAILABLE');
    socket = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((yes, no) => {
      socket.addEventListener('open', yes, { once: true });
      socket.addEventListener('error', no, { once: true });
    });
    socket.addEventListener('message', ({ data }) => {
      let response;
      try {
        response = JSON.parse(data);
      } catch {
        return;
      }
      if (!response.id || !pending.has(response.id)) return;
      const { yes, no } = pending.get(response.id);
      pending.delete(response.id);
      if (response.error) no(Error(response.error.message));
      else yes(response.result);
    });
    function send(method, params = {}) {
      return new Promise((yes, no) => {
        const id = ++callId;
        pending.set(id, { yes, no });
        socket.send(JSON.stringify({ id, method, params }));
      });
    }
    async function evaluate(expression) {
      const reply = await send('Runtime.evaluate', {
        expression,
        returnByValue: true,
        awaitPromise: true,
      });
      if (reply.exceptionDetails) throw Error('BROWSER_EVALUATION_FAILED');
      return reply.result.value;
    }
    await send('Page.bringToFront');
    await send('Runtime.enable');
    return {
      evaluate,
      async untilReady() {
        for (let i = 0; i < 150; i++) {
          if ((await evaluate('document.body?.dataset.ready')) === 'true') return;
          await sleep(100);
        }
        const diagnostic = await evaluate(
          '({ state: document.body?.dataset.ready, status: document.querySelector("#status")?.textContent, scripts: [...document.scripts].map(s => s.src), url: location.href })',
        );
        throw Error(
          'BROWSER_INITIAL_STATE_UNAVAILABLE ' + JSON.stringify(diagnostic).slice(0, 700),
        );
      },
      async untilBlocked() {
        await evaluate('window.dispatchEvent(new Event("focus")); true');
        for (let i = 0; i < 150; i++) {
          const result = await evaluate(
            '({ ready: document.body?.dataset.ready, records: window.twoViewSnapshot?.().records.length, views: document.querySelector("main")?.querySelectorAll("img").length })',
          );
          if (result?.ready === 'source_changed') {
            assert.equal(result.records, 0, 'BROWSER_STALE_RECORDS');
            assert.equal(result.views, 0, 'BROWSER_STALE_IMAGES');
            return;
          }
          await sleep(100);
        }
        throw Error('BROWSER_STALE_SOURCE_NOT_BLOCKED');
      },
      async close() {
        try {
          await send('Browser.close');
        } catch {
          child.kill();
        }
        socket.close();
      },
    };
  } catch (error) {
    socket?.close();
    child.kill();
    throw error;
  }
}

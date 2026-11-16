/* global AbortController, setTimeout, clearTimeout */
export class PreviewJobs {
  constructor({ deadlineMs = 30000, onChange = () => {} } = {}) {
    this.deadlineMs = deadlineMs;
    this.onChange = onChange;
    this.generation = 0;
    this.items = [];
    this.active = null;
  }
  cancel() {
    this.generation++;
    this.active?.abort();
    for (const item of this.items)
      if (item.state === 'queued' || item.state === 'running') item.state = 'cancelled';
    this.onChange(this.snapshot());
  }
  snapshot() {
    return this.items.map(({ captureRef, viewRole, state, reason }) => ({
      captureRef,
      viewRole,
      state,
      ...(reason ? { reason } : {}),
    }));
  }
  async run(tasks, handler) {
    this.cancel();
    const generation = this.generation;
    if (new Set(tasks.map((t) => t.captureRef)).size !== tasks.length)
      throw Error('DUPLICATE_CAPTURE_REF');
    this.items = tasks.map((t) => ({
      captureRef: t.captureRef,
      viewRole: t.viewRole,
      state: 'queued',
    }));
    this.onChange(this.snapshot());
    const results = [];
    for (let i = 0; i < tasks.length && generation === this.generation; i++) {
      const item = this.items[i],
        controller = new AbortController();
      this.active = controller;
      item.state = 'running';
      this.onChange(this.snapshot());
      let timer;
      try {
        const result = await new Promise((resolve, reject) => {
          const aborted = () =>
            reject(
              Error(controller.signal.reason === 'timeout' ? 'TASK_TIMEOUT' : 'TASK_CANCELLED'),
            );
          controller.signal.addEventListener('abort', aborted, { once: true });
          timer = setTimeout(() => controller.abort('timeout'), this.deadlineMs);
          Promise.resolve()
            .then(() => handler(tasks[i], { generation, signal: controller.signal }))
            .then(resolve, reject)
            .finally(() => controller.signal.removeEventListener('abort', aborted));
        });
        if (generation !== this.generation) break;
        item.state = 'completed';
        results.push({ captureRef: item.captureRef, result });
      } catch (error) {
        if (generation !== this.generation) break;
        item.state = 'failed';
        item.reason = error.message === 'TASK_TIMEOUT' ? 'TASK_TIMEOUT' : 'TASK_FAILED';
        results.push({ captureRef: item.captureRef, error: item.reason });
      } finally {
        clearTimeout(timer);
        if (generation === this.generation) {
          this.active = null;
          this.onChange(this.snapshot());
        }
      }
    }
    return { generation, current: generation === this.generation, results };
  }
}

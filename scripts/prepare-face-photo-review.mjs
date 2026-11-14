import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, basename, relative, isAbsolute, sep } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import process from 'node:process';
import { prepareWorksheet } from './run-multisignal-hairline-review-packet.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
function privatePath(path) {
  const full = resolve(path),
    rel = relative(root, full);
  if (
    !isAbsolute(rel) &&
    rel !== '..' &&
    !rel.startsWith(`..${sep}`) &&
    !full.startsWith(resolve(root, '.cache/face-reading') + sep)
  )
    throw new Error('private review output/input must stay outside repository source');
  return full;
}

/** One standalone private review artifact; no new HTTP/API application. */
export async function prepareFacePhotoReview(summaryPath, outputPath) {
  const worksheet = await prepareWorksheet(privatePath(summaryPath));
  const rows = [];
  for (const record of worksheet.records) {
    const detail = JSON.parse(await readFile(record.privateEvidence.candidatePath, 'utf8'));
    const bytes = await readFile(detail.sourcePath);
    if (bytes.length > 16 * 1024 * 1024) throw new Error('private image resource limit');
    // Decode the same encoded raster used by the existing extractor, without
    // browser EXIF auto-rotation changing the coordinate system of human labels.
    const rendered = spawnSync(
      process.env.FACE_READING_PYTHON || (process.platform === 'win32' ? 'python' : 'python3'),
      [
        '-c',
        "import sys,io,json,base64; from PIL import Image; im=Image.open(io.BytesIO(sys.stdin.buffer.read())).convert('RGB'); b=io.BytesIO(); im.save(b,format='PNG'); print(json.dumps({'width':im.width,'height':im.height,'image':base64.b64encode(b.getvalue()).decode('ascii')}))",
      ],
      { input: bytes, maxBuffer: 64 * 1024 * 1024, windowsHide: true },
    );
    if (rendered.error || rendered.status !== 0) throw new Error('private raster preview failed');
    const raster = JSON.parse(rendered.stdout.toString('utf8'));
    const guard = detail.exposureGuardReasons;
    const reason = detail.candidateBoundaryExposed
      ? '후보선 표시 · 정확성은 사람 확인 필요'
      : guard.length
        ? '기존 노출 보호 규칙: ' + guard.join(', ')
        : !detail.rawSignals.faceBasisStable
          ? '얼굴 탐색 기준이 안정적이지 않음'
          : '기존 후보 표시 조건 미충족 · 경계 범위 신호 ' +
            detail.rawSignals.pathCoverage.toFixed(3);
    rows.push({
      id: record.recordId,
      fileName: basename(detail.sourcePath),
      width: raster.width,
      height: raster.height,
      sourceImageSha256: 'sha256:' + createHash('sha256').update(bytes).digest('hex'),
      original: 'data:image/png;base64,' + raster.image,
      overlay: record.privateEvidence.overlayPath
        ? 'data:image/jpeg;base64,' +
          (await readFile(record.privateEvidence.overlayPath)).toString('base64')
        : null,
      candidate: detail.candidateBoundaryExposed,
      state: detail.engineeringPreviewState,
      reason,
      labels: {
        assertionAuthority: 'human_label_assertion',
        visibleOnly: true,
        hairlineY: null,
        browY: null,
        nasalApexY: null,
        lowerFaceY: null,
      },
    });
  }
  const data = JSON.stringify({ worksheet, rows }).replace(/</gu, '\\u003c');
  const page = `<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>실제 사진 삼정 기준선·헤어라인 사람 검토</title>
<style>*{box-sizing:border-box}body{font:16px/1.6 system-ui,sans-serif;background:#f2f4f6;color:#17222e;margin:0}main{max-width:1320px;margin:auto;padding:20px}header,section{background:white;border:1px solid #dbe1e7;border-radius:12px;padding:18px;margin:14px 0}h1{font-size:25px;margin:0}h2{font-size:20px}p{margin:8px 0}.note{font-size:14px;color:#566578}.nav{position:sticky;top:0;z-index:5;background:#f2f4f6;display:flex;gap:12px;padding:10px 0}button,select{font:inherit;padding:8px 12px;border:1px solid #acb9c8;border-radius:7px;background:white}button{cursor:pointer}button:disabled{opacity:.4}#picker{flex:1}.pair{display:grid;grid-template-columns:1fr 1fr;gap:14px}figure{margin:0;background:#edf0f4}figcaption{padding:8px;text-align:center;font-weight:bold}.picture{height:500px;position:relative}.picture img,.picture svg{width:100%;height:100%;object-fit:contain;position:absolute;inset:0}.picture svg{pointer-events:none}#left{cursor:crosshair}.labels,.questions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.question{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px;background:#f6f8fa}.question span{flex:1}table{border-collapse:collapse;width:100%;margin:10px 0}td,th{border:1px solid #dce2e8;text-align:left;padding:7px}#reason{padding:8px;background:#fff3d8}.actions{display:flex;gap:10px;flex-wrap:wrap}.badge{color:#925600}input[type=checkbox]{width:20px;height:20px}#gaps{font-weight:bold}@media(max-width:720px){main{padding:10px}.pair,.questions,.labels{grid-template-columns:1fr}.picture{height:360px}}</style>
<main><header><h1>실제 사진 · 헤어라인 검토와 삼정 참고 기준선</h1><p id="summary"></p><p class="note">A 관찰은 처리됐습니다. B 승인된 삼정 측정과 C 개인별 전통 해석은 아직 보류입니다. 아래 픽셀 간격은 사람이 직접 지정한 사진 참고 수치이며 보정된 길이가 아닙니다.</p><p class="note">원본 사진·검토 내용·사진 식별값이 포함된 비공개 로컬 파일입니다. 공개 저장소에 올리지 마세요.</p></header>
<nav class="nav"><button id="prev">← 이전</button><select id="picker" aria-label="검토할 사진"></select><button id="next">다음 →</button></nav>
<section><h2 id="title"></h2><p id="reason"></p><p class="note">빨강: 기존 헤어라인 후보 · 초록: 얼굴 탐색 영역(중앙 추정일 수 있음) · 파랑: 눈 후보. 주황선은 아래에서 사람이 직접 지정한 참고 기준선입니다.</p>
<div class="pair"><figure><figcaption>원본 저장 픽셀 방향 · 기준선 위치를 클릭</figcaption><div class="picture" id="left"><img id="original" alt="원본 사진"><svg id="markers" preserveAspectRatio="xMidYMid meet"></svg></div></figure><figure><figcaption>기존 검출 결과 · 숨긴 경계는 복원하지 않음</figcaption><div class="picture"><img id="overlay" alt="기존 도구 인식 결과"></div></figure></div>
<h2>사진 기준선 지정 — 선택 사항</h2><p>기준선을 고른 뒤 왼쪽 사진에서 <b>실제로 보이는 위치</b>를 클릭하세요. 가려졌거나 기준이 불분명하면 비워 두세요. 모델 위치를 자동으로 채우지 않습니다.</p><div class="actions"><select id="anchor" aria-label="지정할 기준선"><option value="hairlineY">머리카락·피부 경계</option><option value="browY">직접 관찰한 눈썹 기준선</option><option value="nasalApexY">직접 관찰한 코끝 기준선</option><option value="lowerFaceY">직접 관찰한 턱 아래 기준선</option></select><button id="clear">선택한 기준선 지우기</button></div><table><thead><tr><th>기준선</th><th>사진 Y 좌표(px)</th></tr></thead><tbody id="coordinates"></tbody></table><p id="gaps"></p><p class="note">이 좌표는 FR292/FR266 독립 주석이나 FR319 실측 좌표가 아닙니다. 클릭은 사람의 참고 주석일 뿐 전통 기준점 승인으로 바뀌지 않습니다.</p><label><input id="visible" type="checkbox"> 직접 지정한 위치가 이 사진에서 보이는 기준임을 확인합니다.</label><p><button id="save-labels">현재 사진의 참고 좌표 파일 저장</button></p>
<h2>기존 헤어라인 사람 검토 기록</h2><p class="note">기존 worksheet의 질문입니다. 정확하다고 미리 선택된 항목은 없습니다. 사진을 직접 본 뒤 답하세요. 촬영 독립성·세션·검증 표본 경로는 자동 승인하지 않습니다.</p><div id="questions" class="questions"></div><p><label><input id="review-completed" type="checkbox"> 위 질문에 직접 답했고 원본과 결과의 비교 검토를 완료했습니다.</label></p><button id="save-review">기존 형식의 전체 검토 worksheet 저장</button><p id="message" role="status"></p></section></main>
<script>const data=${data};
const $=id=>document.getElementById(id),rows=data.rows,worksheet=data.worksheet;
let current=Math.max(0,rows.findIndex(r=>r.candidate));
const names={hairlineY:'머리카락·피부 경계',browY:'눈썹',nasalApexY:'코끝',lowerFaceY:'턱 아래'};
const questions={visibleHairCandidateObserved:'머리카락 후보를 확인했나요?',foreheadSkinCandidateObserved:'이마 피부 후보를 확인했나요?',diagnosticHairlineCandidateObserved:'헤어라인 경계 후보를 확인했나요?',grossMislocalizationObserved:'크게 잘못된 위치를 찾았나요?',hiddenCompletionObserved:'가려진 경계를 만들어 냈나요?',outOfFrameCompletionObserved:'사진 밖 경계를 만들어 냈나요?',visibleInterfaceCandidateObserved:'보이는 피부·머리카락 경계를 따르나요?',directPromptAuthoritativeHallucinationRisk:'근거 없는 경계를 사실처럼 제시할 위험이 있나요?'};
rows.forEach((r,i)=>{const o=document.createElement('option');o.value=String(i);o.textContent=(i+1)+' · '+r.fileName+(r.candidate?' · 후보선 있음':' · 후보선 숨김');$('picker').append(o)});
$('summary').textContent=rows.length+'장 · 후보선 '+rows.filter(r=>r.candidate).length+'장 · 사람 검토 기록은 저장 전까지 미완료';
function download(name,value){const a=document.createElement('a'),url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)+'\\n'],{type:'application/json'}));a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function record(){return worksheet.records.find(r=>r.recordId===rows[current].id)}
function coordinates(){const row=rows[current];$('coordinates').replaceChildren();$('markers').replaceChildren();for(const [key,name]of Object.entries(names)){const tr=document.createElement('tr'),n=document.createElement('td'),v=document.createElement('td');n.textContent=name;v.textContent=row.labels[key]===null?'미지정':row.labels[key].toFixed(2);tr.append(n,v);$('coordinates').append(tr);if(row.labels[key]!==null){const line=document.createElementNS('http://www.w3.org/2000/svg','line');for(const [k,value]of Object.entries({x1:0,x2:row.width,y1:row.labels[key],y2:row.labels[key],stroke:'#e68700','stroke-width':Math.max(1,row.width/300)}))line.setAttribute(k,value);$('markers').append(line)}}const y=Object.keys(names).map(k=>row.labels[k]),g=[0,1,2].map(i=>y[i]===null||y[i+1]===null?null:y[i+1]-y[i]);if(g.some(v=>v!==null&&v<=0)){$('gaps').textContent='기준선 순서를 확인하세요. 간격을 산출하지 않았습니다.';return}const total=g.every(v=>v!==null)?g.reduce((a,b)=>a+b,0):null;$('gaps').textContent=['상부 참고 간격','중부 참고 간격','하부 참고 간격'].map((n,i)=>n+': '+(g[i]===null?'보류':g[i].toFixed(2)+'px'+(total?' ('+(100*g[i]/total).toFixed(2)+'%)':''))).join(' · ')}
function selectQuestion(key,label,choices){const box=document.createElement('label'),text=document.createElement('span'),select=document.createElement('select');box.className='question';text.textContent=label;const blank=document.createElement('option');blank.value='';blank.textContent='미응답';select.append(blank);for(const [value,title]of choices){const o=document.createElement('option');o.value=String(value);o.textContent=title;select.append(o)}const value=record().review[key];select.value=value===null?'':String(value);select.onchange=()=>{record().review[key]=select.value===''?null:select.value==='true'?true:select.value==='false'?false:select.value;record().review.reviewCompleted=false;$('review-completed').checked=false};box.append(text,select);$('questions').append(box)}
function show(index){current=Math.max(0,Math.min(rows.length-1,index));const r=rows[current];$('picker').value=String(current);$('title').textContent=(current+1)+' · '+r.fileName+' · '+r.width+'×'+r.height+'px';$('reason').textContent=r.reason;$('original').src=r.original;$('overlay').src=r.overlay||r.original;$('markers').setAttribute('viewBox','0 0 '+r.width+' '+r.height);$('prev').disabled=current===0;$('next').disabled=current===rows.length-1;$('visible').checked=false;$('message').textContent='';$('questions').replaceChildren();for(const[key,label]of Object.entries(questions))selectQuestion(key,label,[[true,'예'],[false,'아니오']]);selectQuestion('candidateFailureMode','후보의 실패 유형',[['useful_candidate','검토에 유용한 후보'],['leakage','다른 영역으로 번짐'],['hallucination','근거 없는 경계'],['unavailable','판단 불가/후보 없음'],['ambiguous','모호함']]);selectQuestion('disposition','이번 관찰이 추가 검토를 지지하나요?',[['supports_further_evaluation','추가 검토 지지'],['inconclusive','판단 보류'],['rejects_current_candidate_behavior','현재 후보 동작 거부']]);$('review-completed').checked=record().review.reviewCompleted;coordinates()}
$('left').onclick=e=>{const row=rows[current],box=$('original').getBoundingClientRect(),scale=Math.min(box.width/row.width,box.height/row.height),top=box.top+(box.height-row.height*scale)/2,y=(e.clientY-top)/scale;if(y<0||y>row.height)return;row.labels[$('anchor').value]=Number(y.toFixed(4));$('visible').checked=false;coordinates()};
$('clear').onclick=()=>{rows[current].labels[$('anchor').value]=null;coordinates()};$('prev').onclick=()=>show(current-1);$('next').onclick=()=>show(current+1);$('picker').onchange=()=>show(Number($('picker').value));
$('review-completed').onchange=()=>{if($('review-completed').checked&&Object.entries(record().review).some(([k,v])=>k!=='reviewCompleted'&&v===null)){$('review-completed').checked=false;$('message').textContent='모든 질문에 답한 뒤 검토 완료를 선택해 주세요.';return}record().review.reviewCompleted=$('review-completed').checked};
$('save-labels').onclick=()=>{if(!$('visible').checked){$('message').textContent='직접 지정한 기준선이 실제로 보이는지 확인해 주세요.';return}const r=rows[current];download(r.id+'-image-labels.json',{schemaVersion:'face-photo-private-image-labels-v1',sourceImageSha256:r.sourceImageSha256,width:r.width,height:r.height,coordinateFrame:'encoded_raster_top_left_no_exif_rotation',labels:r.labels});$('message').textContent='참고 좌표만 저장했습니다. B·C 승인은 발행하지 않았습니다.'};
$('save-review').onclick=()=>{download('hairline-human-review-worksheet.json',worksheet);$('message').textContent='기존 worksheet 형식으로 저장했습니다. 미응답·검증 표본 배정은 그대로 남아 있습니다.'};show(current);
</script></html>`;
  await writeFile(privatePath(outputPath), page, { flag: 'wx', mode: 0o600 });
  return {
    status: 'private_review_prepared',
    recordCount: rows.length,
    humanReviewGenerated: false,
  };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    if (args.length !== 4 || args[0] !== '--summary' || args[2] !== '--output')
      throw new Error('arguments');
    process.stdout.write(JSON.stringify(await prepareFacePhotoReview(args[1], args[3])) + '\n');
  } catch {
    process.stderr.write('{"error":"PRIVATE_PHOTO_REVIEW_PREPARATION_FAILED"}\n');
    process.exitCode = 1;
  }
}

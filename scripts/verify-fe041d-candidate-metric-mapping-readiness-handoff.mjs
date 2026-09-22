import { createHash } from 'node:crypto';
import { mkdtempSync,readFileSync,readdirSync,rmSync,writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os'; import { basename,join,resolve } from 'node:path';
import { execFileSync } from 'node:child_process'; import process from 'node:process';
const E=['./preview-engine','./product-neutral-observation-contract-fe035b','./square-broad-operationalization-readiness-fe041b','./square-broad-candidate-metric-mapping-readiness-fe041d'];
const ok=(x,m)=>{if(!x)throw new Error('FE041D verification failed: '+m)};
const dir=resolve(process.argv[2]??'.artifacts/fe041d'), files=readdirSync(dir).sort(), tgz=files.filter(x=>x.endsWith('.tgz'));
ok(files.length===2&&files.includes('manifest.json')&&tgz.length===1,'handoff shape drift');
const p=resolve(dir,tgz[0]), m=JSON.parse(readFileSync(resolve(dir,'manifest.json'),'utf8')), d=createHash('sha256').update(readFileSync(p)).digest('hex');
ok(m.artifact.sha256===d&&m.artifact.filename===basename(p),'digest drift');
ok(JSON.stringify(m.package.publicExports)===JSON.stringify(E),'exports drift');
ok(m.mappingReadiness.candidateMetricCount===3&&m.mappingReadiness.canonicalRegistryMetricCount===13&&m.mappingReadiness.canonicalRegistryIntersectionCount===0,'mapping cardinality drift');
for(const k of ['canonicalMetricBindingAuthorized','traditionalFangBindingAuthorized','constructValidityEstablished','empiricalSemanticEvidenceAdmitted','calibrationAuthorityIssued','numericThresholdAuthorityIssued','criterionStateIssued','productionSemanticExecutionAuthorized']) ok(m.mappingReadiness[k]===false,k+' widened');
const t=mkdtempSync(join(tmpdir(),'fe041d-'));
try{
 writeFileSync(join(t,'package.json'),JSON.stringify({name:'c',version:'0.0.0',private:true,type:'module'}));
 execFileSync('npm',['install','--ignore-scripts','--no-audit','--no-fund','--package-lock=false',p],{cwd:t,stdio:'pipe'});
 const check=`const x=await import('@myeongha/face-reading/square-broad-candidate-metric-mapping-readiness-fe041d');const r=x.issueSquareBroadCandidateMetricMappingReadinessFE041D();x.assertIssuedSquareBroadCandidateMetricMappingReadinessFE041D(r);if(r.canonicalRegistryIntersection.length!==0||r.mappingDecision.traditionalFangBindingAuthorized!==false||r.authorityBoundary.productionSemanticExecutionAuthorized!==false)throw new Error('authority widened');`;
 execFileSync('node',['--input-type=module','-e',check],{cwd:t,stdio:'pipe'});
}finally{rmSync(t,{recursive:true,force:true})}
process.stdout.write(JSON.stringify({status:'FE041D_HANDOFF_PASS',sha256:d,exactCanonicalIntersectionZeroVerified:true})+'\n');

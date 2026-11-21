import{mkdirSync as M,readdirSync as R,readFileSync as F,writeFileSync as W}from'node:fs';import{join as J}from'node:path';
let I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output',E=1e9;
let S=t=>{let r=t.split('\n').filter(x=>x),w=Math.max(...r.map(x=>x.length))+1,n=w*r.length,A=new Uint8Array(n).fill(1),G=[],B=[],P=0;
r.forEach((s,y)=>{for(let x=0;x<s.length;x++){let c=s[x],i=y*w+x;if(c=='#')continue;A[i]=0;if('.*+'.includes(c))G.push(i);if('$*'.includes(c))B.push(i);if('@+'.includes(c))P=i}});
let so=a=>a.sort((x,y)=>x-y);so(B);
let D=[-w,w,-1,1],L='udlr',ds=G.map(g=>{let d=Array(n).fill(E),q=[g];d[g]=0;for(let h=0;h<q.length;h++){let x=q[h];for(let v of D){let p=x-v,s=x-2*v;if(p>=0&&s>=0&&p<n&&s<n&&!A[p]&&!A[s]&&d[p]==E){d[p]=d[x]+1;q.push(p)}}}return d}),
u=B.map((_,i)=>i),GA=G.map((_,i)=>i),f=a=>u[a]==a?a:u[a]=f(u[a]),cm=new Map;
G.forEach((_,gi)=>{let l=B.map((b,i)=>ds[gi][b]<E?i:-1).filter(i=>i>=0);l.forEach(i=>u[f(i)]=f(l[0]))});
B.forEach((_,i)=>{let k=f(i);cm.set(k,[...(cm.get(k)??[]),i])});
let sc=(gis,fx,pl,bs)=>{let hd=Array(n).fill(E);for(let c=0;c<n;c++)for(let gi of gis)if(ds[gi][c]<hd[c])hd[c]=ds[gi][c];
let H=s=>s.reduce((a,b)=>a+hd[b],0);if(H(bs)>=E)return null;
let gs=new Set(gis.map(gi=>G[gi])),fl=(p,occ)=>{let m=new Map([[p,'']]),q=[p],mn=p;for(let h=0;h<q.length;h++){let x=q[h];for(let k=0;k<4;k++){let y=x+D[k];if(y>=0&&y<n&&!A[y]&&!occ.has(y)&&!m.has(y)){m.set(y,m.get(x)+L[k]);q.push(y);if(y<mn)mn=y}}}return[m,mn]},
SB=[bs],PL=[pl],PA=[-1],SG=[''],GG=[0],best=new Map,key=(s,c)=>s.join(',')+'|'+c;
best.set(key(bs,fl(pl,new Set([...bs,...fx]))[1]),0);
let Q=[],lo=H(bs),qn=1,exp=0;Q[lo]=[0];
while(qn){while(!Q[lo]?.length)lo++;let si=Q[lo].pop();qn--;let st=SB[si],g=GG[si];
if(st.every(b=>gs.has(b))){let m='';for(let t=si;t>0;t=PA[t])m=SG[t]+m;return{m,bs:st,pl:PL[si]}}
let[reach,mn]=fl(PL[si],new Set([...st,...fx]));if(best.get(key(st,mn))<g)continue;if(++exp>4e6)return null;
for(let bi=0;bi<st.length;bi++){let b=st[bi];for(let k=0;k<4;k++){let d=D[k],dest=b+d,walk=reach.get(b-d);
if(dest<0||dest>=n||A[dest]||fx.has(dest)||st.includes(dest)||walk==null||hd[dest]>=E)continue;
let nb=st.slice();nb[bi]=dest;so(nb);let ng=g+1,nk=key(nb,fl(b,new Set([...nb,...fx]))[1]);
if((best.get(nk)??E)<=ng)continue;best.set(nk,ng);SB.push(nb);PL.push(b);PA.push(si);SG.push(walk+L[k]);GG.push(ng);((Q[ng+H(nb)]??=[]).push(SB.length-1),qn++)}}}
return null},
at=gs2=>{let cur=B.slice(),pl=P,all='';for(let{idxs,gis}of gs2){let fx=new Set(cur.filter((_,i)=>!idxs.includes(i))),r=sc(gis,fx,pl,so(idxs.map(i=>cur[i])));if(!r)return null;all+=r.m;idxs.slice().sort((a,b)=>cur[a]-cur[b]).forEach((ci,k)=>cur[ci]=r.bs[k]);pl=r.pl}return all},
gr=[...cm.entries()].map(([k,idxs])=>({idxs,gis:GA.filter(gi=>idxs.some(i=>ds[gi][B[i]]<E))}));
return at(gr)??(gr.length>1?at([{idxs:B.map((_,i)=>i),gis:GA}])??'':'')};
for(let id of R(I).sort()){let m=S(F(J(I,id,'level.txt'),'utf8'));M(J(O,id),{recursive:true});W(J(O,id,'solution.txt'),m+'\n')}

CX.openFile=p=>CX.WM.open('f'+p,p.split('/').pop(),b=>{
 b.innerHTML='<textarea class="fill" spellcheck="false"></textarea><div class="tools"><button>Save</button></div>';const t=b.querySelector('textarea');t.value=CX.FS.f[p]?CX.FS.f[p].c:'';
 b.querySelector('button').onclick=()=>{CX.FS.write(p,t.value);CX.toast('Saved')}});
CX.apps.terminal={name:'Terminal',icon:'▣',open(){CX.WM.open('terminal','Terminal',b=>{
 let cwd='/home',hist=[],hi=0;b.classList.add('term');b.innerHTML='<div class="out"></div><div class="ln"><span class="ps"></span><input spellcheck="false" aria-label="Command"></div>';
 const out=b.querySelector('.out'),inp=b.querySelector('input'),ps=b.querySelector('.ps'),P=()=>ps.textContent='admin@codenix:'+cwd+'$',pr=t=>{out.insertAdjacentText('beforeend',t+'\n');b.scrollTop=b.scrollHeight};P();
 const path=p=>CX.FS.norm(p&&p[0]==='/'?p:cwd+'/'+(p||''));
 const C={help:()=>'Commands: '+Object.keys(C).join(' '),clear:()=>{out.textContent='';return''},date:()=>new Date().toDateString(),time:()=>new Date().toLocaleTimeString(),version:()=>'CODENIX Linux V4 (browser simulation)',
  about:()=>'CODENIX Linux V4: a web OS simulator. Not a real Linux kernel. Commands only touch the virtual filesystem.',whoami:()=>'admin',pwd:()=>cwd,
  echo:a=>{const i=a.indexOf('>');if(i<0)return a.join(' ');CX.FS.write(path(a[i+1]),a.slice(0,i).join(' '));return''},
  ls:a=>CX.FS.ls(path(a[0])).map(x=>x.n+(x.d?'/':'')).join('  ')||'(empty)',
  cd:a=>{const p=path(a[0]||'/home');if(!CX.FS.f[p]||!CX.FS.f[p].d)return'cd: no such directory';cwd=p;P();return''},
  cat:a=>{const f=CX.FS.f[path(a[0])];return f&&!f.d?f.c:'cat: no such file'},
  mkdir:a=>CX.FS.mkdir(path(a[0]))?'':'mkdir: cannot create directory',
  touch:a=>{const p=path(a[0]);if(!CX.FS.f[p])CX.FS.write(p,'');return''},rm:a=>{a[0]?CX.FS.rm(path(a[0])):0;return''}};
 inp.onkeydown=e=>{if(e.key==='Enter'){const l=inp.value.trim();inp.value='';pr(ps.textContent+' '+l);if(l){hist.push(l);hi=hist.length;const[c,...a]=l.split(/\s+/),r=C.hasOwnProperty(c)?C[c](a):c+': command not found';if(r)pr(r)}}
  else if(e.key==='ArrowUp'){hi=Math.max(hi-1,0);inp.value=hist[hi]||''}else if(e.key==='ArrowDown'){hi=Math.min(hi+1,hist.length);inp.value=hist[hi]||''}};
 b.onclick=()=>inp.focus();inp.focus()},{w:560,h:340})}};
CX.apps.notes={name:'Notes',icon:'✎',open(){CX.WM.open('notes','Notes',async b=>{const t=document.createElement('textarea');t.className='fill';t.placeholder='Write a note. It is saved locally in this browser.';t.value=await CX.DB.get('notes','');let h;t.oninput=()=>{clearTimeout(h);h=setTimeout(()=>CX.DB.set('notes',t.value),400)};b.append(t)})}};
CX.apps.calculator={name:'Calculator',icon:'∑',open(){CX.WM.open('calculator','Calculator',b=>{
 const calc=s=>{let i=0;s=s.replace(/\s+/g,'');const E=()=>{let v=T();while(s[i]==='+'||s[i]==='-')v=s[i++]==='+'?v+T():v-T();return v},T=()=>{let v=F();while(s[i]==='*'||s[i]==='/')v=s[i++]==='*'?v*F():v/F();return v},
  F=()=>{if(s[i]==='-'){i++;return-F()}if(s[i]==='('){i++;const v=E();if(s[i++]!==')')throw 0;return v}const m=/^\d*\.?\d+/.exec(s.slice(i));if(!m)throw 0;i+=m[0].length;return+m[0]};const v=E();if(i<s.length)throw 0;return v};
 const keys='C ( ) /|7 8 9 *|4 5 6 -|1 2 3 +|0 . ⌫ ='.split(/[ |]/);let ex='';
 b.innerHTML='<div class="calc"><div class="d">0</div><small></small>'+keys.map(k=>`<button data-k="${k}">${k}</button>`).join('')+'</div>';
 const d=b.querySelector('.d'),h=b.querySelector('small'),show=()=>d.textContent=ex||'0';
 const press=k=>{if(k==='C')ex='';else if(k==='⌫')ex=ex.slice(0,-1);else if(k==='='){try{const r=calc(ex);if(!isFinite(r))throw 0;h.textContent=ex+' = '+(+r.toFixed(10));ex=String(+r.toFixed(10))}catch(e){h.textContent='Invalid expression';ex=''}}else ex+=k;show()};
 b.onclick=e=>e.target.dataset.k&&press(e.target.dataset.k);b.tabIndex=0;b.onkeydown=e=>{if(/^[0-9+\-*/().]$/.test(e.key))press(e.key);else if(e.key==='Enter')press('=');else if(e.key==='Backspace')press('⌫')}},{w:300,h:420})}};
CX.apps.files={name:'Files',icon:'🗂',open(){CX.WM.open('files','Files',b=>{
 let cwd='/home';b.innerHTML='<div class="tools"><button data-a="up">↑ Up</button><button data-a="mk">+ Folder</button><button data-a="ul">Upload</button><input type="file" multiple hidden><span class="path"></span></div><div class="list"></div>';
 const r=()=>{b.querySelector('.path').textContent=cwd;const it=CX.FS.ls(cwd).sort((a,c)=>c.d-a.d||a.n.localeCompare(c.n));
  b.querySelector('.list').innerHTML=it.length?it.map(x=>`<div class="row" data-p="${CX.esc(x.p)}" data-d="${+x.d}"><span>${x.d?'📁':'📄'} ${CX.esc(x.n)}</span>${x.d?'':'<u data-a="dl" title="Download">⬇</u>'}<u data-a="rm" title="Delete">✕</u></div>`).join(''):'<p class="empty">This folder is empty. Create a folder or upload a text file.</p>'};
 b.onclick=e=>{const a=e.target.dataset.a,row=e.target.closest('.row');
  if(a==='up'){cwd=CX.FS.norm(cwd+'/..');r()}else if(a==='mk'){const n=(prompt('Folder name')||'').replace(/\//g,'');if(n){CX.FS.mkdir(cwd+'/'+n);r()}}else if(a==='ul')b.querySelector('input').click();
  else if(a==='rm'){if(confirm('Delete '+row.dataset.p+'?')){CX.FS.rm(row.dataset.p);r()}}
  else if(a==='dl'){const l=document.createElement('a');l.href=URL.createObjectURL(new Blob([CX.FS.f[row.dataset.p].c]));l.download=row.dataset.p.split('/').pop();l.click();URL.revokeObjectURL(l.href)}
  else if(row){if(row.dataset.d==='1'){cwd=row.dataset.p;r()}else CX.openFile(row.dataset.p)}};
 b.querySelector('input').onchange=async e=>{for(const f of e.target.files){if(f.size>1e6||!/\.(txt|md|html|css|js|json|csv)$/i.test(f.name)){CX.toast('Rejected '+f.name+': text files under 1 MB only');continue}CX.FS.write(cwd+'/'+f.name.replace(/\//g,''),await f.text())}e.target.value='';r()};r()})}};

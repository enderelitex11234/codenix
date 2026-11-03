CX.theme={accent:'#8b5cf6',wall:'1'};
CX.applyTheme=t=>{CX.theme=t;document.documentElement.style.setProperty('--ac',t.accent);document.body.dataset.wall=t.wall};
CX.apps.settings={name:'Settings',icon:'⚙',open(){CX.WM.open('settings','Settings',b=>{
 b.innerHTML=`<div class="pad"><label>Accent colour <input type="color" id="ac" value="${CX.theme.accent}"></label><label>Wallpaper <select id="wp"><option value="1">Violet glow</option><option value="2">Gradient</option><option value="3">Graphite</option></select></label>
 <button data-a="ex">Export backup (JSON)</button><button data-a="im">Import backup</button><input type="file" accept=".json" hidden><button data-a="rs" class="danger">Reset system data</button><p id="st"><small>Data lives only in this browser and does not sync across devices.</small></p></div>`;
 const wp=b.querySelector('#wp');wp.value=CX.theme.wall;
 const sv=()=>{CX.applyTheme({accent:b.querySelector('#ac').value,wall:wp.value});CX.DB.set('theme',CX.theme)};b.querySelector('#ac').oninput=sv;wp.onchange=sv;
 navigator.storage&&navigator.storage.estimate&&navigator.storage.estimate().then(s=>b.querySelector('#st').insertAdjacentText('afterbegin','Storage used: '+((s.usage||0)/1024).toFixed(1)+' KB of '+Math.round((s.quota||0)/1048576)+' MB. '));
 const fi=b.querySelector('input[type=file]');
 b.onclick=async e=>{const a=e.target.dataset.a;
  if(a==='ex'){const l=document.createElement('a');l.href=URL.createObjectURL(new Blob([JSON.stringify(await CX.DB.dump())],{type:'application/json'}));l.download='codenix-backup.json';l.click();URL.revokeObjectURL(l.href)}
  if(a==='im')fi.click();
  if(a==='rs'&&confirm('Erase all CODENIX data in this browser?')){await CX.DB.clear();localStorage.clear();location.reload()}};
 fi.onchange=async()=>{try{const d=JSON.parse(await fi.files[0].text());for(const k of ['fs','notes','theme'])if(k in d)await CX.DB.set(k,d[k]);CX.toast('Backup imported. Reloading…');setTimeout(()=>location.reload(),900)}catch(e){CX.toast('Invalid backup file')}}
})}};

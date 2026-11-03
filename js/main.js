(async()=>{
 const $=s=>document.querySelector(s);
 await CX.DB.open();await CX.FS.load();CX.applyTheme(await CX.DB.get('theme',CX.theme));
 const fb=s=>{let h=5381;for(const c of s)h=(h*33^c.charCodeAt(0))>>>0;return 'f'+h.toString(16)};
 const sha=async s=>{try{return [...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))].map(x=>x.toString(16).padStart(2,'0')).join('')}catch(e){return fb(s)}};
 let ph=await CX.DB.get('pw',null);if(!ph){ph=await sha('linux');await CX.DB.set('pw',ph)}
 const lg=()=>{$('#login').hidden=false;$('#pw').value='';$('#pw').focus()};
 const unlock=async()=>{const pw=$('#pw').value;if((await sha(pw))===ph||fb(pw)===ph){localStorage['cx-s']='1';$('#login').hidden=true;desk()}else $('#err').textContent='Wrong password. Demo password: linux'};
 $('#go').onclick=unlock;$('#pw').onkeydown=e=>e.key==='Enter'&&unlock();
 let ready=false;
 const desk=()=>{$('#desktop').hidden=false;if(ready)return;ready=true;const ids=Object.keys(CX.apps);
  $('#icons').innerHTML=ids.map(i=>`<div class="ic" data-id="${i}" tabindex="0"><b>${CX.apps[i].icon}</b>${CX.apps[i].name}</div>`).join('');
  $('#menu').innerHTML=ids.map(i=>`<button data-id="${i}">${CX.apps[i].icon}  ${CX.apps[i].name}</button>`).join('');
  const run=i=>{$('#menu').hidden=true;CX.apps[i].open()};
  $('#icons').ondblclick=e=>{const c=e.target.closest('.ic');c&&run(c.dataset.id)};
  $('#icons').onclick=e=>{const c=e.target.closest('.ic');c&&matchMedia('(pointer:coarse)').matches&&run(c.dataset.id)};
  $('#menu').onclick=e=>{const c=e.target.closest('button');c&&run(c.dataset.id)};
  $('#start').onclick=e=>{e.stopPropagation();$('#menu').hidden=!$('#menu').hidden};
  document.addEventListener('click',e=>{if(!e.target.closest('#menu'))$('#menu').hidden=true});
  $('#lock').onclick=()=>{$('#desktop').hidden=true;lg()};
  $('#out').onclick=()=>{if(confirm('Log out and restart CODENIX?')){localStorage.removeItem('cx-s');location.reload()}};
  const tick=()=>$('#clock').textContent=new Date().toLocaleString([], {weekday:'short',hour:'2-digit',minute:'2-digit'});tick();setInterval(tick,15000);
  addEventListener('keydown',e=>{if(e.ctrlKey&&e.altKey&&e.key.toLowerCase()==='t'){e.preventDefault();run('terminal')}if(e.key==='Escape')$('#menu').hidden=true});
  CX.toast('Welcome to CODENIX Linux V4')};
 let p=0;const iv=setInterval(()=>{p+=8+Math.random()*12;$('#bp').style.width=Math.min(p,100)+'%';if(p>=100){clearInterval(iv);setTimeout(()=>{$('#boot').hidden=true;localStorage['cx-s']==='1'?desk():lg();if(CX.DB.mem)CX.toast('Browser storage is blocked, so changes will not be saved.')},300)}},120);
})().catch(e=>{document.querySelector('#boot small').textContent='Startup error: '+e.message});

CX.WM={z:10,list:{},
open(id,title,render,o={}){
 if(this.list[id]){this.focus(id);return}
 const n=Object.keys(this.list).length,w=document.createElement('div');w.className='win';
 w.style.cssText=`left:${60+n*28}px;top:${40+n*28}px;width:${o.w||520}px;height:${o.h||360}px`;
 w.innerHTML=`<div class="wt"><span>${CX.esc(title)}</span><b data-a="min" title="Minimize">–</b><b data-a="max" title="Maximize">□</b><b data-a="x" title="Close">✕</b></div><div class="wb"></div>`;
 document.getElementById('wins').append(w);this.list[id]={el:w,title};render(w.querySelector('.wb'),w);
 w.addEventListener('pointerdown',()=>this.focus(id));
 w.querySelector('.wt').addEventListener('pointerdown',e=>{if(e.target.dataset.a||w.classList.contains('max'))return;const dx=e.clientX-w.offsetLeft,dy=e.clientY-w.offsetTop;
  const mv=m=>{w.style.left=Math.max(0,m.clientX-dx)+'px';w.style.top=Math.max(0,m.clientY-dy)+'px'},up=()=>{removeEventListener('pointermove',mv);removeEventListener('pointerup',up)};addEventListener('pointermove',mv);addEventListener('pointerup',up)});
 w.querySelector('.wt').addEventListener('click',e=>{const a=e.target.dataset.a;if(a==='x')this.close(id);if(a==='min')this.min(id);if(a==='max')w.classList.toggle('max')});
 w.querySelector('.wt').addEventListener('dblclick',e=>{if(!e.target.dataset.a)w.classList.toggle('max')});
 this.focus(id)},
focus(id){const l=this.list[id];if(!l)return;l.el.hidden=false;l.el.style.zIndex=++this.z;Object.values(this.list).forEach(x=>x.el.classList.remove('active'));l.el.classList.add('active');this.act=id;this.tasks()},
min(id){this.list[id].el.hidden=true;this.act=null;this.tasks()},
close(id){this.list[id].el.remove();delete this.list[id];this.tasks()},
tasks(){const t=document.getElementById('tasks');t.innerHTML=Object.entries(this.list).map(([id,l])=>`<button data-id="${CX.esc(id)}" class="${this.act===id&&!l.el.hidden?'on':''}">${CX.esc(l.title)}</button>`).join('')},
closeAll(){Object.keys(this.list).forEach(i=>this.close(i))}};
document.addEventListener('click',e=>{const b=e.target.closest('#tasks button');if(!b)return;const id=b.dataset.id,l=CX.WM.list[id];l.el.hidden||CX.WM.act!==id?CX.WM.focus(id):CX.WM.min(id)});

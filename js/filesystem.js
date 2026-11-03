CX.FS={f:{},
async load(){this.f=await CX.DB.get('fs',null)||{'/':{d:1},'/home':{d:1},'/home/welcome.txt':{c:'Welcome to CODENIX Linux V4!\nThis is a browser simulation, not a real Linux kernel.'}}},
save(){return CX.DB.set('fs',this.f)},
norm(p){const o=[];p.split('/').forEach(x=>{if(x==='..')o.pop();else if(x&&x!=='.')o.push(x)});return '/'+o.join('/')},
ls(d){d=this.norm(d);const pre=d==='/'?'/':d+'/';return Object.keys(this.f).filter(k=>k!==d&&k.startsWith(pre)&&!k.slice(pre.length).includes('/')).map(k=>({n:k.slice(pre.length),p:k,d:!!this.f[k].d}))},
mkdir(p){p=this.norm(p);if(this.f[p])return false;this.f[p]={d:1};this.save();return true},
write(p,c){p=this.norm(p);if(this.f[p]&&this.f[p].d)return false;this.f[p]={c};this.save();return true},
rm(p){p=this.norm(p);Object.keys(this.f).forEach(k=>{if(k!=='/'&&(k===p||k.startsWith(p+'/')))delete this.f[k]});this.save()}};

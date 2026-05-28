(function(){
  const KEY='groupeniort_state';
  const listeners=[];

  function save(state){
    try{
      localStorage.setItem(KEY, JSON.stringify(state));
      listeners.forEach(cb=>{try{cb(state)}catch(_){} });
      // try remote sync if available (non-blocking)
      if(window.RemoteAPI && typeof window.RemoteAPI.sync==='function'){
        window.RemoteAPI.sync(state).then(ok=>{ if(!ok) console.warn('remote sync failed') });
      }
      return true
    }
    catch(e){ console.warn('StorageAPI.save failed',e); return false }
  }

  function load(){
    try{ const raw=localStorage.getItem(KEY); if(!raw) return null; return JSON.parse(raw) }
    catch(e){ console.warn('StorageAPI.load failed',e); return null }
  }

  function exportFile(filename='groupeniort_map_data.json', state){
    try{
      const payload = state || load() || {CATS:[],ITEMS:{},LINKS:[]};
      const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a'); a.href=url; a.download=filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
      return true;
    }catch(e){ console.warn('StorageAPI.export failed',e); return false }
  }

  function importFile(file){
    return new Promise((resolve,reject)=>{
      const r=new FileReader();
      r.onload=function(){
        try{ const state=JSON.parse(r.result); save(state); resolve(state); }
        catch(e){ reject(e); }
      };
      r.onerror=function(){ reject(r.error); };
      r.readAsText(file);
    });
  }

  function subscribe(cb){ listeners.push(cb); return ()=>{ const i=listeners.indexOf(cb); if(i>=0) listeners.splice(i,1) } }

  window.StorageAPI = { save, load, exportFile, importFile, subscribe, KEY };
})();

// Remote sync API: attempts to POST state to server endpoint /api/bdd
(function(){
  async function sync(state){
    try{
      const res = await fetch('api/bdd',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(state)});
      if(!res.ok) throw new Error('remote write failed');
      return true;
    }catch(e){ console.warn('RemoteAPI.sync failed',e); return false }
  }

  window.RemoteAPI = { sync };
})();

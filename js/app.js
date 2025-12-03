// ShoreSquad — basic JS scaffold
(function(){
  'use strict'

  // Small utilities
  function debounce(fn, wait){
    let t;
    return function(...args){
      clearTimeout(t);
      t = setTimeout(()=>fn.apply(this,args), wait);
    }
  }

  function safeIdle(cb){
    if('requestIdleCallback' in window) requestIdleCallback(cb);
    else setTimeout(cb, 200);
  }

  // UI state
  const state = {joined:false, events:[]};

  function renderEvents(){
    const list = document.getElementById('events');
    list.innerHTML = '';
    if(!state.events.length){
      const li = document.createElement('li'); li.className='event'; li.textContent='No events yet — create one!'; list.appendChild(li); return;
    }
    state.events.forEach(ev=>{
      const li = document.createElement('li'); li.className='event'; li.textContent = `${ev.title} — ${ev.date}`; list.appendChild(li);
    })
  }

  // Toggle join button (example interactivity)
  function initJoinButton(){
    const btn = document.getElementById('join-btn');
    if(!btn) return;
    btn.addEventListener('click', ()=>{
      state.joined = !state.joined;
      btn.setAttribute('aria-pressed', String(state.joined));
      btn.textContent = state.joined ? 'You Joined ✓' : 'Join Crew';
    }, {passive:true});
  }

  // Placeholder: initialize a map library (Leaflet/Mapbox)
  function initMap(){
    // For production, initialize Leaflet or Mapbox GL here.
    // Example: use Leaflet + OpenStreetMap tiles to avoid vendor lock-in.
    // Keep heavy map init inside requestIdleCallback to avoid blocking first paint.
    safeIdle(()=>{
      const mapEl = document.getElementById('map');
      if(mapEl) mapEl.textContent = 'Map ready — initialize Leaflet/Mapbox here.';
    });
  }

  // Placeholder: fetch weather (use an API key server-side ideally)
  async function fetchWeather(lat, lon){
    // Do not commit API keys to repo. Call your backend, which calls OpenWeatherMap or similar.
    // Example flow (pseudo): const resp = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)
    // const data = await resp.json(); update weather UI
    const widget = document.getElementById('weather');
    if(widget) widget.textContent = 'Weather: sunny — 22°C (sample)';
  }

  // App init
  function init(){
    document.getElementById('year').textContent = new Date().getFullYear();
    initJoinButton();
    renderEvents();
    initMap();
    // Example: fetchWeather(36.97, -122.03);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // Exports for console debugging
  window.ShoreSquad = {state, renderEvents, fetchWeather};

})();

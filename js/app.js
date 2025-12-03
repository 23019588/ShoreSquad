// ShoreSquad — Interactive app with Leaflet map, weather, and event management
(function () {
  'use strict';

  // ============================================================================
  // UTILITIES & HELPERS
  // ============================================================================

  /**
   * Debounce function — delays execution until after N ms of inactivity
   * Useful for scroll/resize events and user input
   */
  function debounce(fn, wait) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  /**
   * Throttle function — limits execution to once every N ms
   * Useful for map events (pan, zoom)
   */
  function throttle(fn, limit) {
    let lastRun = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastRun >= limit) {
        fn.apply(this, args);
        lastRun = now;
      }
    };
  }

  /**
   * Safe idle callback with fallback
   * Runs code when browser is idle (good for non-blocking init)
   */
  function safeIdle(callback) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback);
    } else {
      setTimeout(callback, 200);
    }
  }

  /**
   * Fetch with timeout
   * Prevents hanging requests
   */
  async function fetchWithTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }

  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  const state = {
    joined: false,
    events: [
      {
        id: 1,
        title: 'Pasir Ris Cleanup',
        lat: 1.381497,
        lon: 103.955574,
        date: 'Next Cleanup',
        description: 'Street View Asia area — join us!',
        attendees: 12
      }
    ],
    weather: {
      temp: null,
      condition: null,
      lastUpdated: null
    },
    map: null,
    markers: {}
  };

  // ============================================================================
  // DOM ELEMENTS
  // ============================================================================

  const dom = {
    yearSpan: document.getElementById('year'),
    createEventBtn: document.getElementById('create-event-btn'),
    joinBtn: document.getElementById('join-btn'),
    emailInput: document.getElementById('email-input'),
    joinFormBtn: document.getElementById('join-form-btn'),
    joinStatus: document.getElementById('join-status'),
    weatherWidget: document.getElementById('weather'),
    eventsList: document.getElementById('events'),
    mapContainer: document.getElementById('map-container')
  };

  // ============================================================================
  // MAP INITIALIZATION (Leaflet)
  // ============================================================================

  function initMap() {
    if (!dom.mapContainer) return;

    try {
      // Initialize Leaflet map centered on first event (Pasir Ris)
      const defaultLat = 1.381497;
      const defaultLon = 103.955574;

      state.map = L.map('map-container', {
        zoomControl: true,
        attributionControl: true,
        zoom: 15,
        center: [defaultLat, defaultLon]
      });

      // Add OpenStreetMap tiles (free, no API key required)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
        crossOrigin: true
      }).addTo(state.map);

      // Add markers for all events
      state.events.forEach(event => {
        addEventMarker(event);
      });

      // Handle map interactions with throttle to avoid performance issues
      const onMapMove = throttle(() => {
        console.log('Map moved to:', state.map.getCenter());
      }, 300);

      state.map.on('move', onMapMove);

      console.log('✓ Leaflet map initialized successfully');
    } catch (error) {
      console.error('✗ Map initialization failed:', error);
      if (dom.mapContainer) {
        dom.mapContainer.innerHTML = `<p style="padding: 2rem; text-align: center; color: #c33;">Map failed to load: ${error.message}</p>`;
      }
    }
  }

  /**
   * Add a marker to the map for an event
   */
  function addEventMarker(event) {
    if (!state.map) return;

    const marker = L.marker([event.lat, event.lon], {
      title: event.title
    })
      .addTo(state.map)
      .bindPopup(`
        <div style="text-align: center; padding: 0.5rem;">
          <strong>${event.title}</strong><br>
          <small>${event.description}</small><br>
          <small>👥 ${event.attendees} attending</small>
        </div>
      `)
      .openPopup();

    state.markers[event.id] = marker;
  }

  /**
   * Center map on a specific event
   */
  function centerMapOnEvent(eventId) {
    const event = state.events.find(e => e.id === eventId);
    if (!event || !state.map) return;

    state.map.flyTo([event.lat, event.lon], 15, {
      duration: 1.5
    });

    if (state.markers[eventId]) {
      state.markers[eventId].openPopup();
    }
  }

  // ============================================================================
  // WEATHER FUNCTIONALITY
  // ============================================================================

  /**
   * Fetch weather data for Pasir Ris (or use mock data)
   */
  async function fetchWeather(lat, lon) {
    try {
      // Note: For production, use a backend endpoint that proxies API calls
      // Example: /api/weather?lat=1.381497&lon=103.955574
      // Using mock data for now to avoid API key exposure

      // Simulate weather fetch with a delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock weather data (in production, fetch real data server-side)
      const weatherData = {
        temp: 28,
        condition: 'Sunny',
        humidity: 75,
        windSpeed: 8
      };

      state.weather = {
        temp: weatherData.temp,
        condition: weatherData.condition,
        lastUpdated: new Date()
      };

      updateWeatherUI(weatherData);
    } catch (error) {
      console.error('✗ Weather fetch failed:', error);
      dom.weatherWidget.textContent = 'Weather: Unable to load';
    }
  }

  /**
   * Update weather widget UI
   */
  function updateWeatherUI(data) {
    if (!dom.weatherWidget) return;

    const emoji = data.condition.toLowerCase().includes('sunny') ? '☀️' :
      data.condition.toLowerCase().includes('rain') ? '🌧️' :
        data.condition.toLowerCase().includes('cloud') ? '☁️' : '🌤️';

    dom.weatherWidget.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span>${emoji}</span>
        <div style="text-align: left;">
          <div style="font-size: 0.875rem; color: #666;">Current Conditions</div>
          <strong>${data.temp}°C • ${data.condition}</strong>
          <div style="font-size: 0.75rem; color: #999;">Humidity: ${data.humidity}% | Wind: ${data.windSpeed} km/h</div>
        </div>
      </div>
    `;
  }

  // ============================================================================
  // EVENT MANAGEMENT
  // ============================================================================

  /**
   * Render the events list
   */
  function renderEvents() {
    if (!dom.eventsList) return;

    dom.eventsList.innerHTML = '';

    if (state.events.length === 0) {
      const li = document.createElement('li');
      li.className = 'event';
      li.textContent = '🤔 No events yet — create one!';
      dom.eventsList.appendChild(li);
      return;
    }

    state.events.forEach(event => {
      const li = document.createElement('li');
      li.className = 'event';

      const button = document.createElement('button');
      button.className = 'event-btn';
      button.setAttribute('data-lat', event.lat);
      button.setAttribute('data-lon', event.lon);
      button.setAttribute('aria-label', `${event.title} cleanup event`);
      button.innerHTML = `
        📍 <strong>${event.title}</strong>
        <span class="event-date">${event.date}</span>
      `;

      button.addEventListener('click', () => {
        centerMapOnEvent(event.id);
      }, { passive: true });

      li.appendChild(button);
      dom.eventsList.appendChild(li);
    });
  }

  /**
   * Add a new event
   */
  function addEvent(event) {
    state.events.push(event);
    renderEvents();
    if (state.map) {
      addEventMarker(event);
    }
  }

  // ============================================================================
  // JOIN FUNCTIONALITY
  // ============================================================================

  /**
   * Initialize join button
   */
  function initJoinButton() {
    if (!dom.joinBtn) return;

    dom.joinBtn.addEventListener('click', () => {
      state.joined = !state.joined;
      dom.joinBtn.setAttribute('aria-pressed', String(state.joined));
      dom.joinBtn.textContent = state.joined ? '✓ You Joined!' : 'Join Crew';

      if (state.joined) {
        dom.joinBtn.classList.add('joined');
      } else {
        dom.joinBtn.classList.remove('joined');
      }
    }, { passive: true });
  }

  /**
   * Initialize join form
   */
  function initJoinForm() {
    if (!dom.joinFormBtn || !dom.emailInput) return;

    dom.joinFormBtn.addEventListener('click', async () => {
      const email = dom.emailInput.value.trim();

      if (!email || !email.includes('@')) {
        dom.joinStatus.textContent = '❌ Please enter a valid email';
        dom.joinStatus.style.color = 'var(--coral)';
        return;
      }

      // Simulate form submission
      dom.joinFormBtn.disabled = true;
      dom.joinFormBtn.textContent = 'Joining...';

      try {
        // In production: POST /api/subscribe { email }
        await new Promise(resolve => setTimeout(resolve, 800));

        dom.joinStatus.textContent = '✅ Welcome to ShoreSquad! Check your email.';
        dom.joinStatus.style.color = 'var(--seafoam)';
        dom.emailInput.value = '';

        // Clear success message after 3 seconds
        setTimeout(() => {
          dom.joinStatus.textContent = '';
        }, 3000);
      } catch (error) {
        dom.joinStatus.textContent = '❌ Oops, something went wrong. Try again!';
        dom.joinStatus.style.color = 'var(--coral)';
      } finally {
        dom.joinFormBtn.disabled = false;
        dom.joinFormBtn.textContent = 'Get In';
      }
    });

    // Allow Enter key to submit
    dom.emailInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        dom.joinFormBtn.click();
      }
    });
  }

  /**
   * Initialize create event button
   */
  function initCreateEventButton() {
    if (!dom.createEventBtn) return;

    dom.createEventBtn.addEventListener('click', () => {
      alert('📍 Create Event feature coming soon! For now, check out Pasir Ris on the map.');
    });
  }

  // ============================================================================
  // PERFORMANCE & LAZY LOADING
  // ============================================================================

  /**
   * Initialize performance-critical features in idle time
   */
  function initPerformant() {
    safeIdle(() => {
      console.log('🚀 Running idle-time initializations...');

      // Initialize map after DOM is settled
      initMap();

      // Fetch weather data
      fetchWeather(1.381497, 103.955574);

      // Prefetch any external resources
      console.log('✓ Idle initializations complete');
    });
  }

  // ============================================================================
  // LIFECYCLE & STARTUP
  // ============================================================================

  /**
   * Main initialization function
   */
  function init() {
    // Set current year in footer
    if (dom.yearSpan) {
      dom.yearSpan.textContent = new Date().getFullYear();
    }

    // Initialize interactive components immediately
    initJoinButton();
    initJoinForm();
    initCreateEventButton();

    // Render initial event list
    renderEvents();

    // Initialize heavy components when idle
    initPerformant();

    console.log('✓ ShoreSquad app initialized');
  }

  // Run init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ============================================================================
  // EXPORTS FOR DEBUGGING & TESTING
  // ============================================================================

  window.ShoreSquad = {
    state,
    addEvent,
    centerMapOnEvent,
    fetchWeather,
    initMap,
    debounce,
    throttle
  };

  console.log('🌊 ShoreSquad loaded — window.ShoreSquad available for debugging');
})();

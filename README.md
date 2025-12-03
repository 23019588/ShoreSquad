# 🌊 ShoreSquad

**Rally your crew. Track weather. Hit the next beach cleanup.**

A dope, accessible, youth-friendly web app for organizing community beach cleanups with real-time weather tracking and interactive maps.

---

## 🎯 About

ShoreSquad mobilizes young people to clean beaches by making eco-action fun, social, and connected. We combine interactive maps, real-time weather data, and community features to make beach cleanups easy to plan and irresistible to join.

**One-Line Pitch:** Rally your crew, track weather, and hit the next beach cleanup with our dope map app!

---

## 🚀 Features

- **Interactive Map** — Leaflet-powered map showing cleanup locations in real-time
- **Weather Widget** — Current conditions, temperature, humidity, wind speed
- **Event Management** — View upcoming cleanups and click to center map
- **Community Hub** — Join the crew, subscribe to events
- **Responsive Design** — Gorgeous on mobile, tablet, and desktop
- **Accessible & Performant** — WCAG-compliant, optimized for fast loading
- **No API Key Required** — Uses OpenStreetMap (free) + mock weather data

---

## 🎨 Design System

### Color Palette

Our palette aligns with ocean and beach vibes while resonating with youth culture:

| Name | Hex | Usage | Vibe |
|------|-----|-------|------|
| **Ocean Deep** | `#013A63` | Headers, text, trust | Strong, grounding, professional |
| **Seafoam** | `#2EC4B6` | Primary CTA, accents | Fresh, eco-friendly, energetic |
| **Coral** | `#FF6B6B` | Action highlights, urgency | Fun, youthful, attention-grabbing |
| **Sand** | `#F7E9D7` | Backgrounds | Warm, approachable, beach-inspired |
| **Charcoal** | `#222831` | Body text | High contrast, readable, accessible |

### Typography

- **Font Family:** Inter, system-ui (responsive, accessible)
- **Headings:** Bold, large (1.5–2rem), navy (Ocean Deep)
- **Body:** 1rem, readable line-height (1.6)

### Spacing

- `xs`: 0.25rem | `sm`: 0.5rem | `md`: 1rem | `lg`: 1.5rem | `xl`: 2rem

---

## 💻 JavaScript Features & Performance

### Interactivity

- **Map Interactions** — Click events to center on cleanups, panned/zoomed freely
- **Button States** — "Join Crew" toggles with visual feedback
- **Form Validation** — Email input with real-time feedback
- **Event Listeners** — Debounced scroll, throttled map events

### Performance Optimizations

- **Lazy Loading** — Heavy initialization (map, weather) runs in `requestIdleCallback`
- **Debounce/Throttle** — Prevents excessive re-renders and network calls
- **Passive Event Listeners** — Better scroll performance
- **Fetch with Timeout** — Prevents hanging requests
- **Service Worker Ready** — Scaffold for offline caching (future)

### Code Quality

- **Modular Design** — Utility functions, state management, clear separation of concerns
- **Error Handling** — Try/catch blocks, user-friendly error messages
- **Console Debugging** — `window.ShoreSquad` exposed for debugging
- **Comments & Docs** — Comprehensive inline documentation

---

## 🎯 UX & Accessibility Principles

### Usability

1. **Clear Primary Actions** — "Create Cleanup" and "Join Crew" are visually prominent
2. **Mobile-First Layout** — Stacks vertically on small screens, grid on larger
3. **Scannable Info** — Event list, weather, map are all at a glance
4. **Consistent Feedback** — Buttons show state changes (hover, active, disabled)
5. **Fast Interactions** — No unnecessary animations, smooth scrolling

### Accessibility (WCAG AA+)

- **Semantic HTML** — Proper headings, landmarks, lists, buttons
- **ARIA Attributes** — `aria-live` for weather updates, `aria-pressed` for toggles, `aria-label` for buttons
- **Keyboard Navigation** — All controls reachable and operable via Tab, Enter, Space
- **Color Contrast** — Text meets WCAG AA standards (4.5:1 on primary, 3:1 on secondary)
- **Focus Indicators** — Visible outline on interactive elements (3px coral solid)
- **Reduced Motion** — Respects `prefers-reduced-motion` for animations
- **Screen Reader Support** — Descriptive labels, proper heading hierarchy, live regions

### Trust & Safety

- **No Client-Side API Keys** — All API calls go through backend (when in production)
- **Form Security** — Email validation, no sensitive data stored locally
- **Clear Attribution** — OpenStreetMap credits, proper licensing

---

## 📦 Quick Start

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git (for version control)
- Python 3.x (for local server) — optional, use Live Server extension instead

### Installation

```bash
# Clone the repository
git clone https://github.com/23019588/ShoreSquad.git
cd ShoreSquad

# Option 1: Use Live Server (VS Code)
# Right-click index.html → "Open with Live Server"

# Option 2: Python HTTP server
python -m http.server 5500
# Open http://localhost:5500
```

### Development

- **HTML** — `index.html` (semantic, accessible markup)
- **CSS** — `css/styles.css` (variables, responsive grid, mobile-first)
- **JavaScript** — `js/app.js` (Leaflet map, weather, events, forms)
- **Map Data** — Leaflet + OpenStreetMap (no API key needed)

### Project Structure

```
ShoreSquad/
├── index.html           # Main HTML file
├── css/
│   └── styles.css       # All styles, variables, responsive
├── js/
│   └── app.js           # App logic, map init, interactivity
├── package.json         # Dependencies and scripts
├── README.md            # This file
├── .gitignore           # Git exclusions
└── .vscode/
    └── settings.json    # Live Server config
```

---

## 🌐 Live Deployment

Currently static HTML/CSS/JS — ready to deploy to:

- **GitHub Pages** — Push to `gh-pages` branch
- **Netlify** — Drag & drop or connect GitHub
- **Vercel** — Zero-config deployment
- **Cloudflare Pages** — Fast global CDN

### Future Enhancements

- **Backend** — Node/Express or serverless for weather proxy, event CRUD
- **Database** — Store users, events, impact metrics
- **Authentication** — Sign up, login, crew management
- **Real-Time Updates** — WebSockets for live RSVPs and chat
- **Gamification** — Badges, leaderboards, impact tracking
- **Mobile App** — React Native or Flutter wrapper

---

## 🛠️ Technology Stack

| Layer | Tech |
|-------|------|
| **Markup** | HTML5, Semantic HTML, ARIA |
| **Styling** | CSS3, CSS Variables, Grid, Flexbox, Mobile-First |
| **Scripting** | Vanilla JavaScript (ES6+) |
| **Maps** | Leaflet 1.9.4, OpenStreetMap |
| **Hosting** | GitHub Pages (static), or serverless (future) |

---

## 📋 Contributing

1. **Fork** the repo
2. **Create a branch:** `git checkout -b feature/your-feature`
3. **Commit changes:** `git commit -m "Add your feature"`
4. **Push:** `git push origin feature/your-feature`
5. **Open a Pull Request**

---

## 📄 License

ShoreSquad is released under the **MIT License** — see `LICENSE` file for details.

---

## 🌍 Social & Contact

- **GitHub:** [github.com/23019588/ShoreSquad](https://github.com/23019588/ShoreSquad)
- **Issue Tracker:** Report bugs or suggest features
- **Email:** [contact@shoresquad.app](mailto:contact@shoresquad.app)

---

## 🙏 Acknowledgments

- **OpenStreetMap** — Free map tiles
- **Leaflet.js** — Lightweight map library
- **Design Inspiration** — Beach culture, youth movements, eco-action communities
- **Icons & Emojis** — Unicode standards

---

## 🎉 Join the Movement

**Let's clean up our beaches and have fun doing it.** Rally your crew. Track the weather. Hit the next cleanup.

🌊 **ShoreSquad — Making eco-action social, smart, and accessible.**

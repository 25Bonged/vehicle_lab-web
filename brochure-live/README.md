# VEHICLE-LAB | 26_web

**The Future of Vehicle Diagnostics** — A static marketing and product site for VEHICLE-LAB: advanced vehicle data analysis powered by AI, featuring the DiagAI multi-agent diagnostic platform.

- **Live:** [vehiclelabs.netlify.app](https://vehiclelabs.netlify.app)
- **Custom domain:** [vehiclelab.in](https://vehiclelab.in) (when configured)

---

## Tech stack

- **Frontend:** HTML5, CSS3, vanilla JavaScript
- **Libraries:** [Three.js](https://threejs.org/) (3D), [GSAP](https://greensock.com/gsap/) (animations), [Plotly.js](https://plotly.com/javascript/) (charts where used)
- **Hosting:** [Netlify](https://netlify.com) (static deploy)
- **Backend proxy:** Diagnostics/API routes proxied to a [Render](https://render.com) app via `netlify.toml`

No build step — the repo is deployable as-is.

---

## Project structure

```
.
├── index.html          # Homepage
├── diagai.html         # DiagAI product page
├── helix.html          # Helix
├── cie.html            # CIE
├── mdx.html             # MDX
├── features.html       # Features overview
├── specs.html          # Technical specs / whitepaper
├── casestudy.html      # Case studies
├── contact.html        # Contact
├── 404.html            # Custom 404
├── style.css           # Global styles
├── netlify.toml        # Build config, redirects, headers
├── _redirects           # Fallback redirects (same as in netlify.toml)
├── assets/
│   ├── *.js            # Scene, particles, deployment, newsletter, etc.
│   ├── js/utils/       # Config, logger
│   ├── icons/          # SVG icons
│   └── *.png, *.svg    # Images, favicons
└── web_deploy_res/     # Legacy/archive frontend (redirects to main site)
```

**Clean URLs:** `/diagai`, `/helix`, `/cie`, `/mdx`, `/docs`, `/talk-to-sales` etc. are handled by redirects in `netlify.toml`.

---

## Run locally

No install required. From the repo root:

```bash
# Simple HTTP server (Python 3)
python3 -m http.server 8000

# Or with npx (Node)
npx serve .
```

Then open **http://localhost:8000**.  
For `/diagnostics` or API routes to work, the Render backend must be running and reachable; locally those links will hit the production proxy unless you change config.

---

## Deploy (Netlify)

1. Connect the repo **[25Bonged/26_web](https://github.com/25Bonged/26_web)** to a Netlify site.
2. **Build settings:**
   - **Branch:** `main`
   - **Base directory:** *(leave empty)*
   - **Build command:** *(leave empty)*
   - **Publish directory:** `.`
3. Deploys are automatic on push to `main`. Redirects and headers are read from `netlify.toml` and `_redirects`.

---

## Contact

- **Chayan Das** — Vehicle Diagnostics & AI Engineer  
- [LinkedIn](https://www.linkedin.com/in/chayan-das-807b24158) · [GitHub](https://github.com/25Bonged)  
- **Email:** chayandaschayan@gmail.com  
- **Phone:** +91 7908054878  

---

## License

© 2025 Vehicle-Lab. All rights reserved.

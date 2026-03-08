# Deploy to GitHub and Launch on Netlify

## Render / Deploy Now — Will Work After Deploy

- **Index:** "DEPLOY NOW" button loads `deployment.js` and runs the overlay, then redirects to `your-site.netlify.app/diagnostics` (or vehiclelab.in/diagnostics).
- **DiagAI page:** "LAUNCH DIAGAI" and nav "DEPLOY NOW" do the same.
- **Netlify** proxies `/diagnostics` and `/diagnostics/*` to your Render app, so the redirect will open the live DiagAI app. **So yes, the Render/Deploy Now feature will work fully once the site is deployed.**

---

## 1. Upload to GitHub (run in terminal)

From the **parent of `brochure-live`** (or from `brochure-live` if it is the repo root):

```bash
cd /Users/chayan/Documents/brochure
# If brochure-live is the folder you want as the site:
git add brochure-live/
git status
git commit -m "New frontend: 4 product URLs, redirects, Deploy Now, 404"
git push origin main
```

If your repo is **inside** `brochure-live` (so `brochure-live` is the repo root):

```bash
cd /Users/chayan/Documents/brochure/brochure-live
git add .
git status
git commit -m "New frontend: 4 product URLs, redirects, Deploy Now, 404"
git push origin main
```

Use your actual branch name if it’s not `main` (e.g. `master`).

---

## 2. Launch the page on Netlify

1. Go to **https://app.netlify.com** and log in.
2. **Add new site** → **Import an existing project** → **GitHub**.
3. Choose the repo that contains this frontend (e.g. `brochure` or the repo that has `brochure-live`).
4. **Build settings:**
   - **Build command:** leave empty.
   - **Publish directory:**  
     - If the repo root is this folder: `brochure-live` (or `.` if Netlify shows the root).  
     - Type exactly the folder that contains `index.html`, e.g. `brochure-live`.
5. Click **Deploy site**.
6. When the deploy finishes, open the site URL (e.g. `https://random-name-123.netlify.app`).
7. (Optional) In **Domain settings** → **Add custom domain** → add **vehiclelab.in** and follow DNS instructions (e.g. in GoDaddy).

---

## 3. Quick checks after deploy

- Open **/** → new frontend home.
- Open **/diagai** (or **/diagai.html**) → DiagAI page.
- Click **LAUNCH DIAGAI** or **DEPLOY NOW** → overlay → redirect to **/diagnostics** (Render app).
- Open **/helix**, **/cie**, **/mdx** → product pages.
- Open **/diagnostics** → Render app (proxied).

---

## Migration status

- New frontend as primary (index, features, diagai, specs, contact, casestudy, 404, helix, cie, mdx).
- Clean product URLs: `/diagai`, `/helix`, `/cie`, `/mdx`.
- Old `web_deploy_res` URLs redirect to new pages.
- Deploy Now / Render flow wired on index and diagai.
- All set for you to push to GitHub and deploy on Netlify.

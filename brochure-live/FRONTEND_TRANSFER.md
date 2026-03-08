# Frontend Transfer: New Frontend as Primary (Easy Transfer Guide)

This document describes the **new frontend** (this folder / repo root) as the primary site. The folder **`web_deploy_res/`** can stay in the repo—you do **not** need to archive or remove it. Redirects send any `/web_deploy_res/*` URLs to the new frontend so links keep working after you deploy.

---

## New Frontend (Primary)

**Root directory** = publish root. All paths below are relative to site root.

| Page        | File           | Role                          |
|------------|----------------|-------------------------------|
| Home       | `index.html`   | Single-page with sections     |
| Features   | `features.html`| Capabilities, pipeline, agents|
| Case Studies | `casestudy.html` | Real-world case studies    |
| DiagAI     | `diagai.html`  | DiagAI + Launch/Render CTA    |
| Specs      | `specs.html`   | Technical specifications      |
| Contact    | `contact.html`| Get in touch                  |
| 404        | `404.html`     | Not-found (new frontend style)|
| HELIX      | `helix.html`   | HELIX Suite product page      |
| CIE Pro    | `cie.html`     | CIE Pro product page           |
| MDX        | `mdx.html`     | MDX product page               |

**Clean product URLs (no .html):**  
`https://vehiclelab.in/diagai`, `https://vehiclelab.in/helix`, `https://vehiclelab.in/cie`, `https://vehiclelab.in/mdx` — rewrites serve the corresponding .html while keeping the clean URL.

**Assets:** `style.css`, `assets/*` (particles, deployment, mobile-nav, icons, etc.)

**Behaviour:** Nav labels are **Overview**, **Features**, **Case Studies**, **DiagAI**, **Specs**, **Contact**. DEPLOY NOW triggers Render deployment (on index and diagai). DiagAI page has **LAUNCH DIAGAI** CTA that runs the same deployment flow.

---

## Old Frontend → New (Redirect Map)

These redirects are configured in **`_redirects`** and **`netlify.toml`** (301 permanent).

| Old path (`web_deploy_res/`) | New path        |
|------------------------------|-----------------|
| `/web_deploy_res`            | `/`             |
| `/web_deploy_res/index.html` | `/`             |
| `/web_deploy_res/diagai.html`| `/diagai.html`  |
| `/web_deploy_res/contact_us.html` | `/contact.html` |
| `/web_deploy_res/case_studies.html` | `/casestudy.html` |
| `/web_deploy_res/pricing.html`     | `/specs.html`   |
| `/web_deploy_res/more_info.html`   | `/features.html`|
| `/web_deploy_res/security.html`    | `/contact.html` |
| `/web_deploy_res/docs.html`        | `/specs.html`  |
| `/web_deploy_res/helix.html`       | `/features.html`|
| `/web_deploy_res/mdx.html`         | `/features.html`|
| `/web_deploy_res/cie_pro.html`     | `/features.html`|
| `/web_deploy_res/solutions.html`   | `/features.html`|
| `/web_deploy_res/*` (any other)    | `/`             |

Product-only pages (HELIX, MDX, CIE Pro, Solutions) have no 1:1 new page; they redirect to **Features**.

---

## What’s Implemented for Easy Transfer

1. **Redirects**  
   - `_redirects`: old URLs → new URLs (301).  
   - `netlify.toml`: same rules under `[[redirects]]`.  
   - Diagnostics/API proxy rules unchanged (Render).

2. **404 handling**  
   - `404.html` uses new frontend nav and style, with links to Overview, Features, DiagAI, Case Studies, Specs, Contact.

3. **New frontend as default**  
   - Netlify `publish = "."` so root `index.html` is the homepage.  
   - No need to open `/web_deploy_res/`; old links are redirected.

4. **Render/Launch on DiagAI**  
   - `diagai.html` includes `assets/deployment.js` and **LAUNCH DIAGAI** + nav **DEPLOY NOW** both run the deployment overlay and redirect to the diagnostics app.

---

## Pre-Launch Checklist

- [ ] **Netlify:** Publish directory = `brochure-live` (or repo root if this folder is the repo root).
- [ ] **Deploy:** Trigger a deploy and confirm `index.html`, `style.css`, `assets/*`, and `404.html` are served from root.
- [ ] **Homepage:** Open `/` → new frontend home.
- [ ] **Subpages:** Open `/features.html`, `/diagai.html`, `/casestudy.html`, `/specs.html`, `/contact.html` → correct new pages.
- [ ] **Old URLs:** Open `/web_deploy_res/`, `/web_deploy_res/diagai.html`, `/web_deploy_res/contact_us.html` → 301 to new paths.
- [ ] **404:** Open a non-existent path → `404.html` with new nav and links.
- [ ] **Diagnostics:** `/diagnostics` → proxied to Render app.
- [ ] **Launch DiagAI:** On `/diagai.html`, click LAUNCH DIAGAI or DEPLOY NOW → overlay then redirect to diagnostics.

---

## GitHub → Netlify: Deploy Steps

1. **Push to GitHub**  
   Push this folder (including `web_deploy_res/` if you want to keep it in the repo). The **new frontend** is everything at the **root**: `index.html`, `features.html`, `diagai.html`, `casestudy.html`, `specs.html`, `contact.html`, `404.html`, `style.css`, `assets/`, `_redirects`, `netlify.toml`.

2. **Connect to Netlify**  
   - Netlify → Add new site → Import from Git → choose your repo.  
   - **Build command:** leave empty.  
   - **Publish directory:**  
     - If the repo root **is** this folder (only brochure-live files): set to `.` or leave default.  
     - If the repo contains a parent folder and this is `brochure-live`: set to `brochure-live`.  
   - Deploy.

3. **After deploy**  
   - Your site URL will be `https://<site-name>.netlify.app`.  
   - Root `/` will show the new frontend (`index.html`).  
   - Add your custom domain (e.g. vehiclelab.in) in Netlify when ready.

**Keeping `web_deploy_res/`:** You can leave `web_deploy_res/` in the repo. Netlify will still serve the **root** as the site; any request to `/web_deploy_res/*` will be redirected to the new frontend by the rules in `_redirects` and `netlify.toml`.

---

## Migration Complete in New Frontend

The new frontend (this folder) is ready for GitHub and Netlify:

- All main pages use the same nav, style, and favicon.
- DiagAI has the Render launch flow (LAUNCH DIAGAI + DEPLOY NOW).
- Redirects send `/web_deploy_res/*` to the new pages.
- Custom 404 page matches the new frontend.
- You can **upload (push) everything to GitHub**, including `web_deploy_res/`, then connect the repo to Netlify. Set the publish directory to this folder (or `.` if this is the repo root) and deploy.

---

## File Summary

| Purpose              | Files / locations |
|----------------------|-------------------|
| New frontend pages   | `index.html`, `features.html`, `diagai.html`, `casestudy.html`, `specs.html`, `contact.html`, `404.html`, `helix.html`, `cie.html`, `mdx.html` |
| Clean product URLs   | `/diagai`, `/helix`, `/cie`, `/mdx` → rewrites in `_redirects` and `netlify.toml` |
| Styles & assets      | `style.css`, `assets/` |
| Old→new redirects    | `_redirects`, `netlify.toml` |
| Diagnostics proxy    | `_redirects`, `netlify.toml` |
| Deployment/Launch    | `assets/deployment.js` (used on index and diagai) |

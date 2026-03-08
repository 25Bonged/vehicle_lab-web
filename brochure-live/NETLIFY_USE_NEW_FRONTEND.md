# Fix: Netlify showing OLD frontend instead of new

The **new** frontend is at the **repo root** (`index.html`, `diagai.html`, etc.).  
The **old** frontend is in `web_deploy_res/`. If you see the old page, Netlify is publishing the wrong folder.

## Do this in Netlify

1. Go to **Netlify** → your site **vehiclelabs** → **Site configuration** → **Build & deploy** → **Build settings** → **Edit settings**.

2. Set:
   - **Base directory:** leave **empty** (or `.`).
   - **Publish directory:** `.` (dot = repo root).
   - **Build command:** leave empty.

3. Click **Save**.

4. **Trigger a new deploy:** **Deploys** → **Trigger deploy** → **Clear cache and deploy site**.

5. Wait for the deploy to finish, then open **https://vehiclelabs.netlify.app** in an **incognito/private** window (or hard refresh) so you don’t get cached old content.

You should now see the **new** frontend (VEHICLE-LAB | Future of Diagnostics, dark hero, Three.js style).

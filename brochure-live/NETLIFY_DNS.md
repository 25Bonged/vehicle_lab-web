# Netlify DNS Configuration Guide

## Default Netlify Domain

After deploying, your site will automatically get a Netlify subdomain:
- Format: `your-site-name.netlify.app`
- Example: `brochure-live.netlify.app`
- This works immediately after deployment - no DNS configuration needed!

---

## Custom Domain Setup

If you want to use your own domain (e.g., `yourdomain.com`), you have two options:

### Option 1: Use Netlify DNS (Recommended)

1. **In Netlify Dashboard:**
   - Go to your site → **Domain settings**
   - Click **Add custom domain**
   - Enter your domain (e.g., `yourdomain.com`)

2. **Netlify will provide nameservers:**
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
   (These may vary - check your Netlify dashboard for exact nameservers)

3. **Update at your domain registrar:**
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Update nameservers to the ones provided by Netlify
   - Wait 24-48 hours for DNS propagation

---

### Option 2: Use Your Existing DNS Provider

If you want to keep your current DNS provider, add these DNS records:

#### For Root Domain (yourdomain.com):
```
Type: A
Name: @
Value: 75.2.60.5
```

#### For WWW Subdomain (www.yourdomain.com):
```
Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

#### Alternative A Records (for root domain):
```
Type: A
Name: @
Value: 75.2.60.5

Type: A
Name: @
Value: 99.83.190.102

Type: A
Name: @
Value: 13.107.42.14
```

---

## Netlify DNS Records Reference

### Common DNS Records:

**A Record (IPv4):**
- `@` → `75.2.60.5` (primary)
- `@` → `99.83.190.102` (secondary)
- `@` → `13.107.42.14` (tertiary)

**CNAME Record:**
- `www` → `your-site-name.netlify.app`

**For Subdomains:**
- `subdomain` → `your-site-name.netlify.app` (CNAME)

---

## Quick Setup Steps

1. **Deploy your site** (drag & drop or Git)
2. **Get your Netlify URL:** `your-site-name.netlify.app`
3. **Add custom domain** in Netlify dashboard (if needed)
4. **Configure DNS** using one of the options above
5. **Wait for SSL:** Netlify automatically provisions SSL certificates (can take a few minutes to hours)

---

## Verify DNS Configuration

After setting up DNS, verify it's working:
- Check DNS propagation: https://dnschecker.org
- Netlify will show "DNS configuration detected" when ready
- SSL certificate will be issued automatically

---

## Important Notes

- **SSL/HTTPS:** Automatically enabled by Netlify (free)
- **DNS Propagation:** Can take 24-48 hours globally
- **Netlify DNS:** Free and includes DDoS protection
- **Custom Domain:** Free on all Netlify plans

---

## Need Help?

- Netlify DNS Docs: https://docs.netlify.com/domains-https/netlify-dns/
- Netlify Support: https://www.netlify.com/support/






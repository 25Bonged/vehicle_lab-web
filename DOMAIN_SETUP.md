# Domain Setup Guide: vehiclelab.in → Netlify

## Your Domain: vehiclelab.in
## Your Netlify Site: vehiclelab (https://app.netlify.com/projects/vehiclelab/overview)

---

## Step 1: Add Domain in Netlify

1. Go to: https://app.netlify.com/projects/vehiclelab/overview
2. Click **"Domain settings"** (in the left sidebar or top menu)
3. Click **"Add custom domain"**
4. Enter: `vehiclelab.in`
5. Click **"Verify"**
6. Netlify will show you DNS records - **copy these values**

---

## Step 2: Configure DNS in GoDaddy

1. Go to: https://dashboard.godaddy.com
2. Click **"My Products"** → **"Domains"**
3. Find `vehiclelab.in` and click **"DNS"** (or **"Manage DNS"**)

### Add/Update These Records:

#### For Root Domain (vehiclelab.in):
- **Type:** `A`
- **Name:** `@` (or leave blank)
- **Value:** `75.2.60.5`
- **TTL:** `600` (or default)

#### For WWW Subdomain (www.vehiclelab.in):
- **Type:** `CNAME`
- **Name:** `www`
- **Value:** `vehiclelab.netlify.app` (or the value Netlify shows you)
- **TTL:** `600` (or default)

**Note:** If Netlify gives you different values, use those instead!

---

## Step 3: Wait for DNS Propagation

- DNS changes can take **5 minutes to 48 hours** (usually 10-30 minutes)
- Netlify will automatically detect when DNS is configured
- Check status at: https://dnschecker.org (search for `vehiclelab.in`)

---

## Step 4: Enable HTTPS (Automatic)

- Once DNS is configured, Netlify will automatically provision an SSL certificate
- Your site will be available at: `https://vehiclelab.in`
- This usually takes 5-10 minutes after DNS is detected

---

## Troubleshooting

- **If domain doesn't work after 1 hour:** Check DNS records match exactly what Netlify shows
- **If HTTPS doesn't activate:** Wait a bit longer, or check Netlify's SSL/TLS settings
- **To check DNS propagation:** Visit https://dnschecker.org/#A/vehiclelab.in

---

## Quick Reference

- **Netlify Dashboard:** https://app.netlify.com/projects/vehiclelab/overview
- **GoDaddy Dashboard:** https://dashboard.godaddy.com
- **Your Domain:** vehiclelab.in
- **Netlify Load Balancer IP:** 75.2.60.5

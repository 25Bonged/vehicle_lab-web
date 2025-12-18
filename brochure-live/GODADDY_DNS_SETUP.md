# GoDaddy DNS Setup for Netlify (Without Netlify DNS)

Since `vehiclelab.in` is already managed by Netlify DNS on another team, we'll use GoDaddy DNS with A records instead.

## Current DNS Records to Update

Based on your current GoDaddy DNS:

### 1. Update the A Record for Root Domain

**Current:**
- Type: A
- Name: @
- Value: 216.24.57.1

**Change to Netlify A Records:**
You need to **replace** the existing A record with these three A records:

**Record 1:**
- Type: A
- Name: @
- Value: **75.2.60.5**
- TTL: 1 Hour

**Record 2:**
- Type: A
- Name: @
- Value: **99.83.190.102**
- TTL: 1 Hour

**Record 3:**
- Type: A
- Name: @
- Value: **13.107.42.14**
- TTL: 1 Hour

### 2. Update the CNAME for www

**Current:**
- Type: CNAME
- Name: www
- Value: vehicle-lab-web-deploy.onrender.com

**Change to:**
- Type: CNAME
- Name: www
- Value: **your-netlify-site-name.netlify.app**
  *(Replace with your actual Netlify site name from your new account)*
- TTL: 1 Hour

## Steps in GoDaddy

1. **Edit the existing A record:**
   - Click the edit icon (pencil) on the A record with value `216.24.57.1`
   - Change value to: `75.2.60.5`
   - Save

2. **Add two more A records:**
   - Click "Add" or "+" button
   - Add A record with Name: `@`, Value: `99.83.190.102`
   - Add another A record with Name: `@`, Value: `13.107.42.14`
   - Both with TTL: 1 Hour

3. **Update the www CNAME:**
   - Click edit on the `www` CNAME record
   - Change value from `vehicle-lab-web-deploy.onrender.com` to your Netlify site URL
   - Example: `brochure-live-xyz123.netlify.app`
   - Save

4. **Keep all other records:**
   - Don't delete NS, MX, TXT, SOA, or SRV records
   - These are needed for email and domain management

## After DNS Update

1. **In Netlify (your new account):**
   - Go to Domain settings
   - Click "Add custom domain"
   - Enter: `vehiclelab.in`
   - Select: **"Verify DNS configuration"** (not "Use Netlify DNS")
   - Netlify will verify the A records you added

2. **Wait for propagation:**
   - DNS changes can take 1-24 hours
   - Check status: https://dnschecker.org
   - Netlify will show "DNS configuration detected" when ready

3. **SSL Certificate:**
   - Netlify will automatically issue SSL certificate
   - Usually takes a few hours after DNS is verified

## Important Notes

- **Don't change nameservers** - Keep using GoDaddy's nameservers (ns27.domaincontrol.com, ns28.domaincontrol.com)
- **Multiple A records are OK** - You can have multiple A records with the same name (@)
- **Keep email records** - Don't delete MX, TXT records for email
- **The other Netlify account** - The domain being in another Netlify account won't affect you if you use GoDaddy DNS

## Verify DNS

After updating, verify your DNS records:
- Go to: https://dnschecker.org
- Enter: `vehiclelab.in`
- Check that A records show the three Netlify IPs





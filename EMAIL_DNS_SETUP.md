# Email DNS Setup for vehiclelab.in

## Problem
Your emails aren't working because the email-related DNS records are missing. Since you're using Netlify DNS, you need to add these records in Netlify.

## Solution: Add Email DNS Records in Netlify

Go to: https://app.netlify.com/projects/vehiclelab/overview → Domain settings → vehiclelab.in → DNS panel

---

## Records to Add:

### 1. CNAME Records (3 records)

| Name | Value |
|------|-------|
| `email` | `email.secureserver.net` |
| `secureserver1._domainkey` | `s1.dkim.vehiclelab_in.6a3.onsecureserver.net.` |
| `secureserver2._domainkey` | `s2.dkim.vehiclelab_in.6a3.onsecureserver.net.` |

### 2. MX Records (2 records)

| Host | Priority | Value |
|------|----------|-------|
| `@` | `0` | `smtp.secureserver.net` |
| `@` | `10` | `mailstore1.secureserver.net` |

### 3. SRV Record (1 record)

| Service | Protocol | Name | Priority | Weight | Port | Target |
|---------|----------|------|----------|--------|------|--------|
| `_autodiscover` | `_tcp` | `@` | `100` | `1` | `443` | `autodiscover.secureserver.net` |

### 4. TXT Records (3 records)

| Name | Value |
|------|-------|
| `@` | `T5374778` |
| `@` | `v=spf1 include:secureserver.net -all` |
| `_dmarc` | `v=DMARC1; p=reject; rua=mailto:dmarc_rua@onsecureserver.net; adkim=r; aspf=r;` |

---

## Step-by-Step Instructions:

1. **Go to Netlify DNS Panel:**
   - Visit: https://app.netlify.com/projects/vehiclelab/overview
   - Click "Domain settings" → Select `vehiclelab.in`
   - Click "Go to DNS panel" (or find the DNS section)

2. **Add Each Record:**
   - Click "Add new record"
   - Select the record type (CNAME, MX, SRV, or TXT)
   - Enter the Name/Host and Value as shown above
   - For MX records, also enter the Priority
   - For SRV records, enter all fields
   - Click "Save" or "Add"

3. **Wait for Propagation:**
   - DNS changes take 10-30 minutes to propagate
   - Email should start working once propagation completes

---

## Important Notes:

- **Don't delete existing records** - Only add the email records above
- **Keep the existing A and NETLIFY records** for your website
- **The DKIM records** (secureserver1._domainkey and secureserver2._domainkey) are critical for email authentication
- **SPF and DMARC records** prevent email spoofing and improve deliverability

---

## Verification:

After adding records, wait 30 minutes, then:
- Try sending an email from your domain
- Check if you can receive emails
- The DKIM warning in Netlify should disappear once records propagate




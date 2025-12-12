# Fixed Email DNS Records for vehiclelab.in

## ⚠️ CRITICAL FIX: MX Record Priorities

Your CSV shows MX records but **doesn't include priority values**. MX records MUST have priorities, and they need to be in the correct order.

---

## Corrected DNS Records for Netlify

### 1. CNAME Records (Already correct - keep these)

| Name | Value | TTL |
|------|-------|-----|
| `email` | `email.secureserver.net` | 3600 |
| `secureserver1._domainkey` | `s1.dkim.vehiclelab_in.6a3.onsecureserver.net.` | 3600 |
| `secureserver2._domainkey` | `s2.dkim.vehiclelab_in.6a3.onsecureserver.net.` | 3600 |

---

### 2. MX Records (⚠️ FIX THESE - Priority is critical!)

**DELETE the existing MX records and add these with correct priorities:**

| Host | Priority | Value | TTL |
|------|----------|-------|-----|
| `@` | **0** | `mailstore1.secureserver.net` | 3600 |
| `@` | **10** | `smtp.secureserver.net` | 3600 |

**Why this matters:**
- Priority 0 = Primary mail server (receives incoming emails)
- Priority 10 = Backup mail server
- `mailstore1.secureserver.net` is for **receiving** emails (should be priority 0)
- `smtp.secureserver.net` is for **sending** emails (should be priority 10)

---

### 3. SRV Record (Already correct - keep this)

| Service | Protocol | Name | Priority | Weight | Port | Target | TTL |
|---------|----------|------|----------|--------|------|--------|-----|
| `_autodiscover` | `_tcp` | `@` | 100 | 1 | 443 | `autodiscover.secureserver.net` | 3600 |

**Note:** In Netlify, you may need to enter this as:
- Service: `_autodiscover`
- Protocol: `_tcp`
- Name: `@`
- Priority: `100`
- Weight: `1`
- Port: `443`
- Target: `autodiscover.secureserver.net`

---

### 4. TXT Records (DMARC is now correct!)

| Name | Value | TTL |
|------|-------|-----|
| `@` | `T5374778` | 3600 |
| `@` | `v=spf1 include:secureserver.net -all` | 3600 |
| `_dmarc` | `v=DMARC1; p=reject; rua=mailto:dmarc_rua@onsecureserver.net; adkim=r; aspf=r;` | 3600 |

✅ **DMARC record is now correct** with `v=` prefix!

---

## Step-by-Step Fix in Netlify:

1. **Go to Netlify DNS Panel:**
   - https://app.netlify.com/projects/vehiclelab/overview
   - Domain settings → vehiclelab.in → DNS panel

2. **Fix MX Records:**
   - **Delete** both existing MX records
   - **Add new MX record:**
     - Host: `@`
     - Priority: `0`
     - Value: `mailstore1.secureserver.net`
     - TTL: 3600
   - **Add new MX record:**
     - Host: `@`
     - Priority: `10`
     - Value: `smtp.secureserver.net`
     - TTL: 3600

3. **Verify DMARC Record:**
   - Check that `_dmarc` TXT record has: `v=DMARC1; p=reject; rua=mailto:dmarc_rua@onsecureserver.net; adkim=r; aspf=r;`
   - If it's missing `v=` at the start, delete and recreate it

4. **Wait 10-30 minutes** for DNS propagation

---

## Why This Will Fix Your Email:

- **Before:** Incoming emails were going to `smtp.secureserver.net` (outgoing server) → **FAILED**
- **After:** Incoming emails will go to `mailstore1.secureserver.net` (incoming server) → **SUCCESS**

---

## Verification:

After making changes, wait 30 minutes, then:
- Try sending an email TO your domain
- Check if you can receive emails
- The DKIM warning in Netlify should disappear




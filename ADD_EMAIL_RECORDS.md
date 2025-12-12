# Add Email DNS Records to Netlify - Exact Values

## Go to Netlify DNS Panel:
https://app.netlify.com/projects/vehiclelab/overview → Domain settings → vehiclelab.in → DNS panel

---

## Records to Add (in order):

### 1. CNAME Records (Click "Add new record" → Select "CNAME")

| Name | Value | TTL |
|------|-------|-----|
| `email` | `email.secureserver.net` | 3600 |
| `secureserver1._domainkey` | `s1.dkim.vehiclelab_in.6a3.onsecureserver.net.` | 3600 |
| `secureserver2._domainkey` | `s2.dkim.vehiclelab_in.6a3.onsecureserver.net.` | 3600 |

**Note:** In Netlify, enter just the name part (e.g., `email`, not `email.vehiclelab.in`)

---

### 2. MX Records (Click "Add new record" → Select "MX")

| Host | Priority | Value | TTL |
|------|----------|-------|-----|
| `@` | `0` | `smtp.secureserver.net` | 3600 |
| `@` | `10` | `mailstore1.secureserver.net` | 3600 |

**Important:** Priority 0 is the primary mail server, Priority 10 is backup

---

### 3. SRV Record (Click "Add new record" → Select "SRV")

| Service | Protocol | Name | Priority | Weight | Port | Target | TTL |
|---------|----------|------|----------|--------|------|--------|-----|
| `_autodiscover` | `_tcp` | `@` | `100` | `1` | `443` | `autodiscover.secureserver.net` | 3600 |

**Note:** Netlify might format this differently - enter all fields as shown

---

### 4. TXT Records (Click "Add new record" → Select "TXT")

| Name | Value | TTL |
|------|-------|-----|
| `@` | `T5374778` | 3600 |
| `@` | `v=spf1 include:secureserver.net -all` | 3600 |
| `_dmarc` | `v=DMARC1; p=reject; rua=mailto:dmarc_rua@onsecureserver.net; adkim=r; aspf=r;` | 3600 |

**Note:** The DMARC record in your CSV is missing `v=` at the start - use the corrected version above

---

## Quick Checklist:

- [ ] Added 3 CNAME records (email, secureserver1._domainkey, secureserver2._domainkey)
- [ ] Added 2 MX records (priority 0 and 10)
- [ ] Added 1 SRV record (_autodiscover)
- [ ] Added 3 TXT records (verification, SPF, DMARC)
- [ ] Waited 10-30 minutes for DNS propagation

---

## After Adding Records:

1. **Wait 10-30 minutes** for DNS propagation
2. **Test email** - try sending/receiving emails
3. **Check Netlify** - the DKIM warning should disappear
4. **Verify DNS** - check at https://dnschecker.org

---

## Troubleshooting:

- **If MX records don't work:** Make sure priority values are correct (0 and 10)
- **If DKIM still shows warning:** Wait longer for propagation (can take up to 24 hours)
- **If email still not working:** Verify all records match exactly as shown above




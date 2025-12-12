# Verify MX Record Priorities in Netlify

## Current Status from CSV (3)

Your CSV shows MX records but **doesn't display priority values**. This is critical because the order matters.

## ⚠️ What You Need to Check:

1. **Go to Netlify DNS Panel:**
   - https://app.netlify.com/projects/vehiclelab/overview
   - Click on your domain → DNS settings

2. **Find the MX Records Section:**
   - Look for two MX records for `vehiclelab.in`

3. **Verify the Priorities:**
   
   ✅ **CORRECT Configuration:**
   - `mailstore1.secureserver.net` → **Priority: 0** (or lowest number)
   - `smtp.secureserver.net` → **Priority: 10** (or higher number)
   
   ❌ **WRONG Configuration:**
   - `smtp.secureserver.net` → Priority: 0 (or lower than mailstore1)
   - `mailstore1.secureserver.net` → Priority: 10 (or higher than smtp)

## If Priorities Are Wrong:

1. **Delete both MX records**
2. **Add them back in this order:**
   - First: `mailstore1.secureserver.net` with Priority **0**
   - Second: `smtp.secureserver.net` with Priority **10**

## Why This Matters:

- **Priority 0** = Primary mail server (receives emails)
- **Priority 10** = Backup/secondary server
- `mailstore1.secureserver.net` = **Incoming mail server** (must be priority 0)
- `smtp.secureserver.net` = **Outgoing mail server** (should be priority 10)

If `smtp.secureserver.net` has priority 0, incoming emails will fail because they're being sent to the outgoing server instead of the incoming server.

---

## Quick Test After Fix:

Wait 30 minutes after making changes, then:
- Send a test email TO your domain (e.g., test@vehiclelab.in)
- Check if you receive it
- If yes → ✅ Fixed!
- If no → Check DNS propagation status




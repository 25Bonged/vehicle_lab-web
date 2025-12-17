#!/bin/bash
echo "=== Checking vehiclelab.in DNS ==="
dig vehiclelab.in +short
echo ""
echo "=== Checking www.vehiclelab.in DNS ==="
dig www.vehiclelab.in +short
echo ""
echo "=== Testing SSL Certificate ==="
timeout 5 openssl s_client -connect vehiclelab.in:443 -servername vehiclelab.in < /dev/null 2>/dev/null | openssl x509 -noout -subject -dates 2>/dev/null || echo "SSL connection failed or certificate not available"

# Newsletter API

This directory contains the backend API for the newsletter subscription functionality.

## Files

- `newsletter.php` - Handles newsletter subscription requests

## Setup

### PHP Server Required

The newsletter functionality requires a PHP server. You can:

1. **Local Development**: Use PHP's built-in server:
   ```bash
   php -S localhost:8000
   ```

2. **Production**: Deploy to a server with PHP support (Apache, Nginx with PHP-FPM, etc.)

### Data Storage

Subscriptions are stored in `../data/newsletter_subscriptions.json`. The directory will be created automatically if it doesn't exist.

### Permissions

Ensure the `data/` directory is writable by the web server:
```bash
chmod 755 data/
```

## API Endpoint

**POST** `/api/newsletter.php`

### Request Body
```json
{
  "email": "user@example.com"
}
```

### Response (Success)
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

### Response (Error)
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Alternative: Client-Side Storage

If PHP is not available, you can modify `assets/newsletter.js` to use localStorage or integrate with a third-party service like:
- Mailchimp API
- SendGrid API
- Formspree
- Netlify Forms


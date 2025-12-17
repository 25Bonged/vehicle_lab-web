/**
 * Application Configuration
 * Centralized configuration management for the application
 */
const CONFIG = {
    ENV: {
        IS_LOCAL: window.location.hostname === 'localhost' || 
                  window.location.hostname === '127.0.0.1',
        IS_DEV: window.location.hostname.includes('localhost') ||
                window.location.hostname.includes('127.0.0.1') ||
                window.location.hostname.includes('.netlify.app'),
        IS_PROD: !window.location.hostname.includes('localhost') &&
                 !window.location.hostname.includes('127.0.0.1') &&
                 !window.location.hostname.includes('.netlify.app')
    },
    API: {
        BASE_URL: window.location.origin,
        NEWSLETTER_ENDPOINT: '/api/newsletter',
        INGEST_ENDPOINT: '/ingest',
        DEBUG_ENDPOINT: 'http://127.0.0.1:7244/ingest/ef78c447-0c3f-4b0e-8b1c-7bb88ff78e42'
    },
    PARTICLES: {
        COUNT: 60,
        CONNECTION_DISTANCE: 150,
        SPEED: 0.5,
        MIN_SIZE: 1,
        MAX_SIZE: 3
    },
    ANIMATION: {
        SCROLL_DELAY: 1000,
        LOADING_TIMEOUT: 5000,
        TRANSITION_DURATION: 300,
        FRAME_LOG_INTERVAL: 60 // Log every N frames
    },
    DEBUG: {
        ENABLED: window.location.hostname === 'localhost' || 
                 window.location.hostname === '127.0.0.1',
        LOG_LEVEL: 'info' // 'debug', 'info', 'warn', 'error'
    }
};

// Export for module or global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
window.CONFIG = CONFIG;


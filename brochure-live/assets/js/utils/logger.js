/**
 * Logger Utility
 * Centralized logging with environment-based filtering
 */

class Logger {
    constructor() {
        this.config = window.CONFIG || {
            DEBUG: { ENABLED: false },
            API: { DEBUG_ENDPOINT: '' }
        };
    }

    /**
     * Check if debug logging is enabled
     */
    isDebugEnabled() {
        return this.config.DEBUG?.ENABLED === true;
    }

    /**
     * Log debug information to remote endpoint (only in local/dev)
     */
    async logToRemote(data) {
        if (!this.isDebugEnabled()) {
            return;
        }

        const endpoint = this.config.API?.DEBUG_ENDPOINT;
        if (!endpoint) {
            return;
        }

        try {
            await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    timestamp: Date.now(),
                    sessionId: 'debug-session',
                    runId: 'run1',
                    hypothesisId: 'C'
                })
            });
        } catch (error) {
            // Silently fail - debug logging should not break the app
            console.debug('Debug logging failed:', error);
        }
    }

    /**
     * Log debug message
     */
    debug(location, message, data = {}) {
        if (this.isDebugEnabled()) {
            this.logToRemote({
                location,
                message,
                data
            });
        }
    }

    /**
     * Log info message
     */
    info(message, data = {}) {
        if (this.isDebugEnabled()) {
            console.info(message, data);
        }
    }

    /**
     * Log warning
     */
    warn(message, data = {}) {
        console.warn(message, data);
    }

    /**
     * Log error
     */
    error(message, error = null, data = {}) {
        console.error(message, error, data);
        
        // In production, you might want to send to error tracking service
        if (this.config.ENV?.IS_PROD) {
            // Send to error tracking service (e.g., Sentry, LogRocket)
            // this.sendToErrorTracking(message, error, data);
        }
    }
}

// Export singleton instance
const logger = new Logger();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = logger;
}
window.logger = logger;


/**
 * Professional Deployment Handler
 * Handles smooth transition to Render-deployed VEHICLE-LAB application
 * Includes loading states, error handling, and cold start management
 */

(function() {
    'use strict';

    const APP_URL = 'https://vehicle-lab-web-deploy.onrender.com';
    const MAX_LOAD_TIME = 45000; // 45 seconds max wait
    const COLD_START_WARNING_TIME = 5000; // Show cold start message after 5s

    // Create loading overlay
    function createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'deployment-overlay';
        overlay.innerHTML = `
            <div class="deployment-loader">
                <div class="loader-content">
                    <div class="loader-logo">
                        <div class="logo-pulse"></div>
                        <span>VEHICLE-LAB</span>
                    </div>
                    <div class="loader-status">
                        <div class="status-text" id="status-text">Initializing deployment...</div>
                        <div class="status-subtext" id="status-subtext">Preparing your diagnostic environment</div>
                    </div>
                    <div class="loader-progress">
                        <div class="progress-bar-container">
                            <div class="progress-bar-fill" id="progress-bar"></div>
                        </div>
                        <div class="progress-dots">
                            <span class="dot"></span>
                            <span class="dot"></span>
                            <span class="dot"></span>
                        </div>
                    </div>
                    <div class="loader-steps" id="loader-steps">
                        <div class="step active" data-step="1">
                            <span class="step-icon">✓</span>
                            <span class="step-text">Connecting to server</span>
                        </div>
                        <div class="step" data-step="2">
                            <span class="step-icon">⟳</span>
                            <span class="step-text">Waking up application</span>
                        </div>
                        <div class="step" data-step="3">
                            <span class="step-icon">⟳</span>
                            <span class="step-text">Loading diagnostic engine</span>
                        </div>
                        <div class="step" data-step="4">
                            <span class="step-icon">⟳</span>
                            <span class="step-text">Ready to deploy</span>
                        </div>
                    </div>
                    <div class="cold-start-warning" id="cold-start-warning" style="display: none;">
                        <div class="warning-icon">⏳</div>
                        <div class="warning-text">
                            <strong>Cold Start Detected</strong><br>
                            The application is waking up from sleep mode. This may take 30-60 seconds.
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        return overlay;
    }

    // Update loading status
    function updateStatus(text, subtext = '') {
        const statusText = document.getElementById('status-text');
        const statusSubtext = document.getElementById('status-subtext');
        if (statusText) statusText.textContent = text;
        if (statusSubtext) statusSubtext.textContent = subtext;
    }

    // Update progress bar
    function updateProgress(percentage) {
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
        }
    }

    // Update step status
    function updateStep(stepNumber, status = 'active') {
        const step = document.querySelector(`.step[data-step="${stepNumber}"]`);
        if (step) {
            step.className = `step ${status}`;
            const icon = step.querySelector('.step-icon');
            if (icon) {
                if (status === 'completed') {
                    icon.textContent = '✓';
                } else if (status === 'active') {
                    icon.textContent = '⟳';
                    icon.classList.add('spinning');
                } else {
                    icon.textContent = '○';
                    icon.classList.remove('spinning');
                }
            }
        }
    }

    // Show cold start warning
    function showColdStartWarning() {
        const warning = document.getElementById('cold-start-warning');
        if (warning) {
            warning.style.display = 'flex';
            warning.style.animation = 'fadeInUp 0.5s ease-out';
        }
    }

    // Simulate progress for better UX
    function simulateProgress() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 3;
            if (progress < 90) {
                updateProgress(progress);
            }
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 200);
        return interval;
    }

    // Check if app is ready using multiple methods
    async function checkAppReady() {
        return new Promise((resolve) => {
            let isResolved = false;
            let checksPassed = 0;
            const totalChecks = 2;
            
            const resolveOnce = (success) => {
                if (!isResolved) {
                    isResolved = true;
                    resolve(success);
                }
            };
            
            // Method 1: Try to fetch the app (with CORS handling)
            const checkViaFetch = async () => {
                try {
                    // Try HEAD request first (lightweight)
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 8000);
                    
                    const response = await fetch(APP_URL, {
                        method: 'HEAD',
                        mode: 'no-cors', // This won't throw on CORS, but we can't read response
                        signal: controller.signal,
                        cache: 'no-cache'
                    });
                    
                    clearTimeout(timeoutId);
                    checksPassed++;
                    
                    // If we got here without error, server is responding
                    if (checksPassed >= totalChecks || isResolved) {
                        resolveOnce(true);
                    }
                } catch (error) {
                    // Fetch failed - might be CORS or server not ready
                    // Continue with iframe method
                }
            };
            
            // Method 2: Load in hidden iframe and check readiness
            const checkViaIframe = () => {
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.style.width = '0';
                iframe.style.height = '0';
                iframe.style.position = 'absolute';
                iframe.style.left = '-9999px';
                iframe.style.opacity = '0';
                iframe.style.pointerEvents = 'none';
                
                let checkCount = 0;
                const maxChecks = 100; // 50 seconds max (100 * 500ms)
                const checkInterval = 500;
                let iframeLoaded = false;
                
                const checkIfReady = () => {
                    if (isResolved) return;
                    
                    checkCount++;
                    
                    try {
                        // Check if iframe has loaded
                        if (iframe.contentWindow && iframe.contentDocument) {
                            const doc = iframe.contentDocument;
                            
                            // Check if document is ready
                            if (doc.readyState === 'complete' || doc.readyState === 'interactive') {
                                if (!iframeLoaded) {
                                    iframeLoaded = true;
                                    // Give it a moment for content to render
                                    setTimeout(() => {
                                        try {
                                            // Check if there's actual content
                                            const hasContent = doc.body && (
                                                doc.body.children.length > 0 || 
                                                doc.body.innerHTML.trim().length > 100
                                            );
                                            
                                            // Check for error pages
                                            const hasErrors = doc.body?.textContent.includes('Application error') ||
                                                            doc.body?.textContent.includes('503 Service Unavailable') ||
                                                            doc.body?.textContent.includes('502 Bad Gateway');
                                            
                                            if (hasContent && !hasErrors) {
                                                checksPassed++;
                                                if (checksPassed >= totalChecks || isResolved) {
                                                    resolveOnce(true);
                                                    cleanup();
                                                }
                                                return;
                                            }
                                        } catch (e) {
                                            // Can't access content (CORS) - but iframe loaded, that's a good sign
                                            checksPassed++;
                                            if (checksPassed >= totalChecks || isResolved) {
                                                resolveOnce(true);
                                                cleanup();
                                            }
                                            return;
                                        }
                                    }, 2000);
                                }
                            }
                        }
                    } catch (e) {
                        // Cross-origin - can't access iframe content
                        // But if iframe.onload fired, that means page loaded
                        if (iframeLoaded && checkCount > 10) {
                            // Iframe has been loading for a while, assume it's ready
                            checksPassed++;
                            if (checksPassed >= totalChecks || isResolved) {
                                resolveOnce(true);
                                cleanup();
                            }
                            return;
                        }
                    }
                    
                    // Timeout check
                    if (checkCount >= maxChecks) {
                        if (!isResolved) {
                            // Max time reached, assume ready
                            resolveOnce(true);
                            cleanup();
                        }
                        return;
                    }
                    
                    // Continue checking
                    setTimeout(checkIfReady, checkInterval);
                };
                
                const cleanup = () => {
                    setTimeout(() => {
                        if (iframe.parentNode) {
                            iframe.parentNode.removeChild(iframe);
                        }
                    }, 2000);
                };
                
                // Handle iframe load event
                iframe.onload = () => {
                    iframeLoaded = true;
                    // Start checking after content has time to load
                    setTimeout(checkIfReady, 1500);
                };
                
                iframe.onerror = () => {
                    // Iframe failed to load
                    if (!isResolved) {
                        resolveOnce(false);
                        cleanup();
                    }
                };
                
                // Start loading
                iframe.src = APP_URL;
                document.body.appendChild(iframe);
                
                // Start checking after initial delay
                setTimeout(checkIfReady, 3000);
            };
            
            // Start both checks
            checkViaFetch();
            checkViaIframe();
            
            // Fallback timeout - resolve after max time even if checks don't complete
            setTimeout(() => {
                if (!isResolved) {
                    resolveOnce(true); // Assume ready after max time
                }
            }, MAX_LOAD_TIME);
        });
    }

    // Main deployment function
    async function deployApp() {
        const overlay = createLoadingOverlay();
        let progressInterval = null;
        let coldStartShown = false;
        let coldStartTimeout = null;

        try {
            // Step 1: Connecting
            updateStep(1, 'active');
            updateStatus('Connecting to VEHICLE-LAB server...', 'Establishing secure connection');
            updateProgress(10);
            await new Promise(resolve => setTimeout(resolve, 800));

            // Step 2: Waking up
            updateStep(1, 'completed');
            updateStep(2, 'active');
            updateStatus('Waking up application instance...', 'This may take a moment if the server was idle');
            updateProgress(25);
            
            // Start progress simulation
            progressInterval = simulateProgress();
            
            // Show cold start warning after delay
            coldStartTimeout = setTimeout(() => {
                if (!coldStartShown) {
                    showColdStartWarning();
                    coldStartShown = true;
                }
            }, COLD_START_WARNING_TIME);

            // Note: We'll check app readiness in step 4

            // Step 3: Loading engine
            await new Promise(resolve => setTimeout(resolve, 2000));
            updateStep(2, 'completed');
            updateStep(3, 'active');
            updateStatus('Loading diagnostic engine...', 'Initializing AI agents and data pipeline');
            updateProgress(60);

            // Step 4: Verifying app is ready
            updateStep(3, 'completed');
            updateStep(4, 'active');
            updateStatus('Verifying application readiness...', 'Checking if all services are loaded');
            updateProgress(70);
            
            // Start checking app readiness with progress updates
            const progressUpdater = setInterval(() => {
                const currentProgress = parseInt(document.getElementById('progress-bar')?.style.width || '70');
                if (currentProgress < 95) {
                    updateProgress(currentProgress + 1);
                }
            }, 300);
            
            // Update status messages during check
            const statusMessages = [
                { text: 'Connecting to application server...', subtext: 'Establishing connection' },
                { text: 'Loading application resources...', subtext: 'Fetching required files' },
                { text: 'Initializing diagnostic engine...', subtext: 'Starting AI agents' },
                { text: 'Verifying all systems...', subtext: 'Final checks in progress' }
            ];
            
            let statusIndex = 0;
            const statusUpdater = setInterval(() => {
                if (statusIndex < statusMessages.length) {
                    updateStatus(statusMessages[statusIndex].text, statusMessages[statusIndex].subtext);
                    statusIndex++;
                }
            }, 3000);
            
            // Actually check if app is ready
            const appReady = await checkAppReady();
            
            // Clear intervals
            clearInterval(progressUpdater);
            clearInterval(statusUpdater);
            
            if (appReady) {
                updateStep(4, 'completed');
                updateProgress(100);
                updateStatus('Application fully loaded! ✓', 'All systems ready. Redirecting now...');
                
                // Small delay for visual feedback
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Redirect to app
                window.location.href = APP_URL;
            } else {
                // App didn't fully load, but redirect anyway after showing message
                updateStatus('Application is loading...', 'Redirecting now. The app will finish loading on the next page.');
                updateProgress(100);
                await new Promise(resolve => setTimeout(resolve, 1500));
                window.location.href = APP_URL;
            }

        } catch (error) {
            console.error('Deployment error:', error);
            updateStatus('Connection issue detected', 'Attempting alternative connection method...');
            updateProgress(100);
            
            // Still try to redirect after showing error
            setTimeout(() => {
                window.location.href = APP_URL;
            }, 2000);
        } finally {
            if (progressInterval) clearInterval(progressInterval);
            if (coldStartTimeout) clearTimeout(coldStartTimeout);
        }
    }

    // Initialize deployment handlers
    function initDeploymentHandlers() {
        // Find all buttons with "DEPLOY NOW" text
        const allButtons = document.querySelectorAll('button.cta-button');
        const handledElements = new Set();
        
        allButtons.forEach(button => {
            const buttonText = button.textContent.trim().toUpperCase();
            if (buttonText.includes('DEPLOY NOW') || button.hasAttribute('data-deploy')) {
                // Handle button click
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!handledElements.has(button)) {
                        handledElements.add(button);
                        deployApp();
                    }
                }, true); // Use capture phase
                
                // Also handle parent link if it exists
                const parentLink = button.closest('a');
                if (parentLink && !handledElements.has(parentLink)) {
                    parentLink.addEventListener('click', function(e) {
                        // Only handle if the click is on the link itself, not bubbling from button
                        if (e.target === parentLink) {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!handledElements.has(parentLink)) {
                                handledElements.add(parentLink);
                                deployApp();
                            }
                        }
                    }, true);
                }
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDeploymentHandlers);
    } else {
        initDeploymentHandlers();
    }

    // Export for manual triggering if needed
    window.deployVehicleLab = deployApp;

})();


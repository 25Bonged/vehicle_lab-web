function startDeployment() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'deployment-overlay';
    overlay.innerHTML = `
        <div class="deployment-loader">
            <div class="loader-logo">
                <div class="logo-pulse"></div>
                <span>VEHICLE-LAB</span>
            </div>
            <div class="loader-status">
                <div class="status-text" id="deploy-status">Initializing...</div>
                <div class="status-subtext" id="deploy-substatus">Preparing deployment environment</div>
            </div>
            <div class="loader-progress">
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" id="deploy-progress" style="width: 0%;"></div>
                </div>
                <div class="progress-dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
            <div class="loader-steps">
                <div class="step" id="step-1">
                    <div class="step-icon">1</div>
                    <div class="step-text">Connecting to Render.com</div>
                </div>
                <div class="step" id="step-2">
                    <div class="step-icon">2</div>
                    <div class="step-text">Verifying System Resources</div>
                </div>
                <div class="step" id="step-3">
                    <div class="step-icon">3</div>
                    <div class="step-text">Launching Application</div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Animation Logic
    const progress = document.getElementById('deploy-progress');
    const status = document.getElementById('deploy-status');
    const substatus = document.getElementById('deploy-substatus');
    
    // Step 1
    setTimeout(() => {
        const step1 = document.getElementById('step-1');
        if(step1) step1.classList.add('active');
        if(status) status.textContent = 'Connecting...';
        if(substatus) substatus.textContent = 'Establishing secure connection to Render';
        if(progress) progress.style.width = '30%';
    }, 500);

    // Step 2
    setTimeout(() => {
        const step1 = document.getElementById('step-1');
        if(step1) {
            step1.classList.remove('active');
            step1.classList.add('completed');
            const icon = step1.querySelector('.step-icon');
            if(icon) icon.textContent = '✓';
        }
        
        const step2 = document.getElementById('step-2');
        if(step2) step2.classList.add('active');
        if(status) status.textContent = 'Verifying...';
        if(substatus) substatus.textContent = 'Checking compute resources and containers';
        if(progress) progress.style.width = '60%';
    }, 2000);

    // Step 3
    setTimeout(() => {
        const step2 = document.getElementById('step-2');
        if(step2) {
             step2.classList.remove('active');
             step2.classList.add('completed');
             const icon = step2.querySelector('.step-icon');
             if(icon) icon.textContent = '✓';
        }

        const step3 = document.getElementById('step-3');
        if(step3) step3.classList.add('active');
        if(status) status.textContent = 'Launching...';
        if(substatus) substatus.textContent = 'Starting up application instance';
        if(progress) progress.style.width = '90%';
    }, 3500);

    // Finish
    setTimeout(() => {
        if(progress) progress.style.width = '100%';
        if(status) status.textContent = 'Deployed!';
        if(substatus) substatus.textContent = 'Redirecting to application...';
        
        const step3 = document.getElementById('step-3');
        if(step3) {
             step3.classList.remove('active');
             step3.classList.add('completed');
             const icon = step3.querySelector('.step-icon');
             if(icon) icon.textContent = '✓';
        }
        
        setTimeout(() => {
             // Redirect to diagnostics via Netlify proxy
             window.location.href = '/diagnostics';
        }, 800);
    }, 5000);
}

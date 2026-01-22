// Glassmorphism effect with mouse tracking and amplification (Apple-style)
(function() {
    const soonGlass = document.getElementById('soonGlass');
    const soonText = soonGlass.querySelector('.soon-text');
    
    if (!soonGlass || !soonText) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let isHovering = false;
    
    // Smooth animation using requestAnimationFrame
    function animate() {
        // Ease towards target position (smooth interpolation)
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;
        
        // Calculate distance from center for amplification effect
        const rect = soonGlass.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = currentX - centerX;
        const deltaY = currentY - centerY;
        
        // Calculate amplification factor (magnifying glass effect)
        // Stronger amplification when mouse is closer to the element
        const maxDistance = Math.max(rect.width, rect.height) * 0.6;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        
        // Amplification curve: stronger at center, weaker at edges
        const amplification = isHovering 
            ? 1 + (1 - normalizedDistance) * 0.2 
            : 1;
        
        // Subtle 3D tilt effect (like looking through glass)
        const maxTilt = 8;
        const rotateX = (deltaY / maxDistance) * maxTilt;
        const rotateY = (deltaX / maxDistance) * -maxTilt;
        
        // Subtle translation for depth
        const translateX = deltaX * 0.08;
        const translateY = deltaY * 0.08;
        
        // Apply transforms
        soonGlass.style.transform = `
            translate3d(${translateX}px, ${translateY}px, 0)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;
        
        // Amplify the text content (magnifying effect)
        soonText.style.transform = `scale(${amplification}) translateZ(0)`;
        
        // Update glass highlight position (follows mouse)
        const highlightX = ((currentX - rect.left) / rect.width) * 100;
        const highlightY = ((currentY - rect.top) / rect.height) * 100;
        
        soonGlass.style.setProperty('--highlight-x', `${Math.max(0, Math.min(100, highlightX))}%`);
        soonGlass.style.setProperty('--highlight-y', `${Math.max(0, Math.min(100, highlightY))}%`);
        
        requestAnimationFrame(animate);
    }
    
    // Track mouse movement
    function handleMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        targetX = mouseX;
        targetY = mouseY;
    }
    
    // Enhanced hover detection
    function handleMouseEnter() {
        isHovering = true;
    }
    
    function handleMouseLeave() {
        isHovering = false;
        const rect = soonGlass.getBoundingClientRect();
        targetX = rect.left + rect.width / 2;
        targetY = rect.top + rect.height / 2;
    }
    
    // Initialize
    function init() {
        const rect = soonGlass.getBoundingClientRect();
        currentX = rect.left + rect.width / 2;
        currentY = rect.top + rect.height / 2;
        targetX = currentX;
        targetY = currentY;
    }
    
    init();
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    soonGlass.addEventListener('mouseenter', handleMouseEnter);
    soonGlass.addEventListener('mouseleave', handleMouseLeave);
    
    // Start animation loop
    animate();
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            init();
        }, 100);
    });
    
    // Handle scroll (update positions)
    window.addEventListener('scroll', () => {
        init();
    }, { passive: true });
})();

// Contact form handler
(function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Log for now (backend will be implemented later)
            console.log('Form submitted:', data);
            
            // Show success message (temporary)
            alert('Thank you for your message! We will get back to you soon.\n\n(Backend integration pending)');
            
            // Reset form
            contactForm.reset();
        });
    }
})();

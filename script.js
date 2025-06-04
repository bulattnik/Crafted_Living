// Animate the Stats Numbers (From previous versions)
const statNumbers = document.querySelectorAll('.stat-number');

function animateNumbers() {
    statNumbers.forEach(number => {
        const target = parseInt(number.dataset.target, 10);  // Get target value
        let count = 0;
        const duration = 2000; // milliseconds (2 seconds)
        const stepTime = Math.abs(Math.floor(duration / target)); // Calc speed
        const increment = 1;

        const updateCount = () => {
            count += increment;
            number.innerText = count;
            if (count < target) {
                setTimeout(updateCount, stepTime);
            } else {
                number.innerText = target; // Ensure it reaches the target
            }
        };

        updateCount();
    });
}

// Run animation when the page loads
document.addEventListener('DOMContentLoaded', animateNumbers);

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top-button');

// Show/hide button based on scroll position
function toggleBackToTopButton() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
}

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' //  Smooth scrolling
    });
}

// Add Event Listeners
window.addEventListener('scroll', toggleBackToTopButton);
backToTopButton.addEventListener('click', scrollToTop);

// Visitor Counter functionality with unique visitors and session management
document.addEventListener('DOMContentLoaded', function() {
    // Generate a unique visitor ID (simple browser fingerprint)
    function generateVisitorId() {
        const userAgent = navigator.userAgent;
        const screenRes = `${window.screen.width}x${window.screen.height}`;
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return btoa(`${userAgent}-${screenRes}-${timeZone}`);
    }

    // Session management
    const SESSION_TIMEOUT = 3 * 60 * 1000; // 3 minutes in milliseconds
    const CHECK_INTERVAL = 30 * 1000; // 30 seconds in milliseconds
    
    // Get or initialize sessions from localStorage
    let sessions = JSON.parse(localStorage.getItem('visitorSessions')) || {};
    let visitorCount = parseInt(localStorage.getItem('visitorCount')) || 0;
    const visitorId = generateVisitorId();

    // Clean up inactive sessions
    function cleanupSessions() {
        const currentTime = Date.now();
        let hasChanges = false;
        
        Object.keys(sessions).forEach(id => {
            if (currentTime - sessions[id].lastActive > SESSION_TIMEOUT) {
                delete sessions[id];
                hasChanges = true;
            }
        });

        if (hasChanges) {
            localStorage.setItem('visitorSessions', JSON.stringify(sessions));
            updateVisitorCount();
        }
    }

    // Update visitor count based on active sessions
    function updateVisitorCount() {
        const activeSessionsCount = Object.keys(sessions).length;
        visitorCount = activeSessionsCount;
        localStorage.setItem('visitorCount', visitorCount);
        
        // Update the display
        const visitorCountElement = document.getElementById('visitor-count');
        if (visitorCountElement) {
            visitorCountElement.textContent = visitorCount;
        }
    }

    // Update or create session for current visitor
    function updateSession() {
        if (!sessions[visitorId]) {
            // New visitor
            sessions[visitorId] = {
                lastActive: Date.now(),
                firstSeen: Date.now()
            };
        } else {
            // Existing visitor - update last active time
            sessions[visitorId].lastActive = Date.now();
        }
        
        localStorage.setItem('visitorSessions', JSON.stringify(sessions));
        updateVisitorCount();
    }

    // Initial session update
    updateSession();

    // Set up periodic checks
    setInterval(() => {
        cleanupSessions();
        updateSession();
    }, CHECK_INTERVAL);

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        cleanupSessions();
    });

    // Optional: Send count to server
    // You can add server-side tracking here using fetch API
    /*
    fetch('/api/track-visit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            visitorId: visitorId,
            timestamp: new Date().toISOString(),
            visitorCount: visitorCount
        })
    });
    */
});

// Clock functionality
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    // Add leading zeros
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    
    // Update clock display
    const clockElement = document.getElementById("clock");
    if (clockElement) {
        clockElement.textContent = `${hours}:${minutes}`;
    }
}

// Update clock every second
setInterval(updateClock, 1000);
// Initial call to display time immediately
updateClock(); 
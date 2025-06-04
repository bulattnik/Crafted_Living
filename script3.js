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
const backToTopButton = document.getElementById("back-to-top-button");

function toggleBackToTopButton() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // For smooth scrolling
  });
}

// Adding action listeners.
window.addEventListener("scroll", toggleBackToTopButton);
backToTopButton.addEventListener("click", scrollToTop);

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
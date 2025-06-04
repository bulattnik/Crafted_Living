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
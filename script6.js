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

//Adding action listeners.
window.addEventListener("scroll", toggleBackToTopButton);
backToTopButton.addEventListener("click", scrollToTop);

// *** New: Calculator Functionality ***
function calculateCost() {
    // Get form values
    const area = document.getElementById('area').value;
    const foundation = document.getElementById('foundation').value;
    const wallMaterial = document.getElementById('wallMaterial').value;
    const roofType = document.getElementById('roofType').value;
    const finishClass = document.getElementById('finishClass').value;
    const region = document.getElementById('region').value;

    // Basic Cost Calculation (Replace with more accurate formulas)
    let baseCost = area * 50000; // Example base cost
    let foundationModifier = 1;
    let wallModifier = 1;
    let roofModifier = 1;
    let finishModifier = 1;

    switch (foundation) {
        case 'strip': foundationModifier = 1.1; break;
        case 'pile': foundationModifier = 0.9; break;
    }

    switch (wallMaterial) {
        case 'brick': wallModifier = 1.2; break;
        case 'block': wallModifier = 1.0; break;
    }

    switch (roofType) {
        case 'tile': roofModifier = 1.3; break;
        case 'slate': roofModifier = 1.5; break;
    }

    switch (finishClass) {
        case 'comfort': finishModifier = 1.2; break;
        case 'premium': finishModifier = 1.5; break;
    }

    let totalCost = baseCost * foundationModifier * wallModifier * roofModifier * finishModifier;
    totalCost = totalCost.toLocaleString('ru-RU'); // Format to Russian locale

    // Display the result
    const costResult = document.getElementById('costResult');
    costResult.innerText = `Примерная стоимость: ${totalCost} ₽`;

    // Add animation (Optional)
    costResult.classList.add('animate-result');
    setTimeout(() => costResult.classList.remove('animate-result'), 1000);
}
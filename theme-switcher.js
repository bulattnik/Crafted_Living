// Function to toggle between normal and colorblind modes
function initializeThemeSwitcher() {
    // Check if theme preference exists in localStorage
    const currentTheme = localStorage.getItem('theme') || 'normal';
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Create the theme switcher button if it doesn't exist
    if (!document.querySelector('.theme-switcher')) {
        const switcher = document.createElement('button');
        switcher.className = 'theme-switcher';
        switcher.innerHTML = `
            <span class="theme-icon">👁️</span>
            <span class="theme-text">${currentTheme === 'colorblind' ? 'Обычный режим' : 'Режим для дальтоников'}</span>
        `;
        document.body.appendChild(switcher);

        // Add click event listener
        switcher.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'colorblind' ? 'normal' : 'colorblind';
            
            // Update theme
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update button text
            this.querySelector('.theme-text').textContent = 
                newTheme === 'colorblind' ? 'Обычный режим' : 'Режим для дальтоников';
        });
    }
}

// Initialize theme switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeThemeSwitcher); 
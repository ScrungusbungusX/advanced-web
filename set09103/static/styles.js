// =======================
// Menu dropdowns
// =======================
function initMenus() {
    document.querySelectorAll(".menu-display").forEach(menu => {
        const button = menu.querySelector("button");
        const dropdown = menu.querySelector(".dropdown");

        if (button && dropdown) {
            button.addEventListener("click", () => {
                dropdown.classList.toggle("hidden");
            });
        }
    });
}

// =======================
// Search + tags filter
// =======================
function initSearchFilter() {
    const input = document.getElementById("searchInput");
    const games = document.querySelectorAll(".game-card");

    if (!games.length) return;

    let activeTag = "";

    const params = new URLSearchParams(window.location.search);
    const urlQuery = (params.get("q") || "").toLowerCase();
    const urlTag = (params.get("tag") || "").toLowerCase();

    if (urlTag) activeTag = urlTag;
    if (input && urlQuery) input.value = urlQuery;

    function applyFilters() {
        const text = (input?.value || "").toLowerCase();

        games.forEach(game => {
            const title = game.dataset.title.toLowerCase();
            const tags = game.dataset.tags.toLowerCase();

            let visible = true;

            if (text && !title.includes(text)) {
                visible = false;
            }

            if (activeTag && !tags.includes(activeTag)) {
                visible = false;
            }

            game.style.display = visible ? "block" : "none";
        });
    }

    // Initial filter from URL
    applyFilters();

    // Live typing filter
    if (input) {
        input.addEventListener("input", applyFilters);
    }
}

// =======================
// Dark Mode
// =======================
function toggleDarkMode() {
	const themeRadios = document.querySelectorAll('input[name="theme"]');

    themeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'dark') {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    });

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const darkRadio = document.querySelector('input[name="theme"][value="dark"]');
        if (darkRadio) darkRadio.checked = true;
    }
}

// =======================
// Slideshow
// =======================
function initSlideshows() {
    document.querySelectorAll(".slideshow-container").forEach(container => {

        const slides = container.querySelectorAll(".slide");
        const prevBtn = container.querySelector(".slide-btn.prev");
        const nextBtn = container.querySelector(".slide-btn.next");

        if (!slides.length || !prevBtn || !nextBtn) return;

        let index = 0;

        function showSlide(i) {
            if (i >= slides.length) index = 0;
            if (i < 0) index = slides.length - 1;

            slides.forEach(slide => slide.style.display = "none");
            slides[index].style.display = "block";
        }

        prevBtn.addEventListener("click", () => {
            index--;
            showSlide(index);
        });

        nextBtn.addEventListener("click", () => {
            index++;
            showSlide(index);
        });

        // Show first slide initially
        showSlide(index);
    });
}

// =======================
// DOM ready
// =======================
document.addEventListener("DOMContentLoaded", () => {
    initMenus();
    initSearchFilter();
    initSlideshows();
    toggleDarkMode();
});
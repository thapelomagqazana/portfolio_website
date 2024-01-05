// Function to animate progress bars on scroll
function animateProgressBars() {
    var progressBarElements = document.querySelectorAll('.progress-bar');

    progressBarElements.forEach(function (progressBarElement) {
        var targetPercent = progressBarElement.getAttribute('data-percent');
        var progressBar = progressBarElement.querySelector('.progress');

        window.addEventListener('scroll', function () {
            var scrollPosition = window.scrollY + window.innerHeight;
            var elementPosition = progressBarElement.offsetTop;

            if (scrollPosition > elementPosition) {
                progressBar.style.width = targetPercent;
            }
        });
    });
}

// Initialize progress bar animations
animateProgressBars();
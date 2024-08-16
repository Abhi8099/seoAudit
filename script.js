
document.addEventListener("DOMContentLoaded", () => {
    const sidebarLinks = document.querySelectorAll('#sidebar a');
    const sections = document.querySelectorAll('.main section');

    // Options for Intersection Observer
    const options = {
        root: null, // Use the viewport as the root
        rootMargin: '0px 0px -50% 0px', // Trigger when the section is half visible
        threshold: 0.5 // 50% of the section should be visible to trigger
    };

    // Callback function to handle intersection changes
    const callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                activateLink(id);
            }
        });
    };

    // Create an observer instance
    const observer = new IntersectionObserver(callback, options);

    // Observe each section
    sections.forEach(section => observer.observe(section));

    function activateLink(id) {
        sidebarLinks.forEach(link => {
            // Remove active classes from all links
            link.classList.remove('bg-blue-500', 'text-white');
            // Add active class to the link with matching href
            if (link.getAttribute('href').substring(1) === id) {
                link.classList.add('bg-blue-500', 'text-white');
            }
        });
    }
});


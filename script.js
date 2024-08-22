
const apiUrl = 'http://172.16.16.11:8012/api/seo-check/';
const requestBody = {
    url: 'http://www.w3era.com'
};
const loader = document.getElementById('loader');
const mainContent = document.getElementById('main-content');

fetch(apiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
})
    .then(response => response.json())
    .then(seoData => {
        loader.style.display = 'none';
        mainContent.classList.remove('hidden');
        console.log(seoData)
        // Content Section
        document.getElementById('title').innerHTML = `<strong>Title:</strong> ${seoData.Title.Content} (${seoData.Title['Optimal Length'] ? 'Optimal' : 'Not Optimal'})`;
        document.getElementById('meta-description').innerHTML = `<strong>Meta Description:</strong> ${seoData['Meta Description'].Content} (${seoData['Meta Description']['Optimal Length'] ? 'Optimal' : 'Not Optimal'})`;
        document.getElementById('word-count').innerHTML = `<strong>Word Count:</strong> ${seoData['Word Count']}`;

        // Indexing Section
        document.getElementById('canonical-tag').innerHTML = `<strong>Canonical Tag:</strong> ${seoData['Canonical Tag Message']}`;
        document.getElementById('noindex-tag').innerHTML = `<strong>Noindex Tag:</strong> ${seoData['Noindex Tag'] ? 'Present' : 'Not Present'} - ${seoData['Noindex Tag Message']}`;
        document.getElementById('robots-txt').innerHTML = `<strong>Robots.txt:</strong> ${seoData['Robots.txt Message']}`;
        document.getElementById('xml-sitemap').innerHTML = `<strong>XML Sitemap:</strong> ${seoData['XML Sitemap Message']}`;

        // Structured Data Section
        document.getElementById('schema-message').innerHTML = `<strong>Schema Message:</strong> ${seoData['Schema Message']}`;

        // Security Section
        document.getElementById('ssl-enabled').innerHTML = `<strong>SSL Enabled:</strong> ${seoData['SSL Message']}`;
        document.getElementById('https-redirect').innerHTML = `<strong>HTTPS Redirect:</strong> ${seoData['HTTPS Redirect Message']}`;

        // Performance Section
        document.getElementById('header-tags-frequency').innerHTML = `<strong>Header Tags Frequency:</strong> H2: ${seoData['Header Tags frequency'].h2}, H3: ${seoData['Header Tags frequency'].h3}, H4: ${seoData['Header Tags frequency'].h4}, H5: ${seoData['Header Tags frequency'].h5}, H6: ${seoData['Header Tags frequency'].h6}`;
        document.getElementById('images-without-alt').innerHTML = `<strong>Images Without Alt:</strong> ${seoData['Images Alt Attribute Message']}`;

    })
    .catch(error => {
        console.error('Error:', error);
    });
const speedApi = "http://172.16.16.11:8012/page-speed/";
const requestspeedApiBody = {
    url: 'http://www.w3era.com'
};


fetch(speedApi, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestspeedApiBody)
})
    .then(response => response.json())
    .then(response => {
        console.log("speedApi", response);
        // Populate speed analytics data in the relevant section
        document.getElementById('speedAnalytics').innerHTML = `
                <div><strong>Performance Score:</strong> ${response.performance_score}</div>
                <div><strong>Accessibility Score:</strong> ${response.accessibility_score}</div>
                <div><strong>Best Practices Score:</strong> ${response.best_practices_score}</div>
                <div><strong>SEO Score:</strong> ${response.seo_score}</div>
                <div><strong>First Contentful Paint:</strong> ${response.performance_metrics.first_contentful_paint}</div>
                <div><strong>Speed Index:</strong> ${response.performance_metrics.speed_index}</div>
                <div><strong>Largest Contentful Paint:</strong> ${response.performance_metrics.largest_contentful_paint}</div>
                <div><strong>Total Blocking Time:</strong> ${response.performance_metrics.total_blocking_time}</div>
                <div><strong>Cumulative Layout Shift:</strong> ${response.performance_metrics.cumulative_layout_shift}</div>
            `;
    })
    .catch(error => console.error('Error:', error));



document.addEventListener("DOMContentLoaded", () => {
    const sidebarLinks = document.querySelectorAll('#sidebar a');
    const sections = document.querySelectorAll('.main section');
    const options = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.5
    };
    const callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                activateLink(id);
            }
        });
    };
    const observer = new IntersectionObserver(callback, options);
    sections.forEach(section => observer.observe(section));
    function activateLink(id) {
        sidebarLinks.forEach(link => {
            link.classList.remove('bg-blue-500', 'text-white');
            if (link.getAttribute('href').substring(1) === id) {
                link.classList.add('bg-blue-500', 'text-white');
            }
        });
    }
});

const sliderContent = document.querySelector('.slider__content');
const leftBtn = document.querySelector('.left__btn');
const rightBtn = document.querySelector('.right__btn');
const mainDivs = document.querySelectorAll('.main_div');

let currentIndex = 0;

rightBtn.addEventListener('click', () => {
    if (currentIndex < mainDivs.length - 1) {
        currentIndex++;
        sliderContent.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
});

leftBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        sliderContent.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
});

var tl = gsap.timeline()
tl.from('.header', {
    y: -200,
    opacity: 0,
    delay: .1,
    duration: .3
})
tl.from('.menu li', {
    y: -50,
    delay: 0,
    stagger: .1
})

tl.from(".hero", {
    opacity: 0,
    duration: .5
})
tl.from('.seo-report', {
    opacity: 0,
    duration: .5,
    y: -200
})
tl.to("#companies_image", {
    y: -40,
    y: 0,
    y: 40,
    delay: 2,
    duration: 3,
    repeat: -1,
})


tl.to("#embadable-img", {
    y: -40,
    y: 0,
    y: 40,
    delay: 2,
    duration: 3,
    repeat: -1,
})


tl.from(".last-img", {
    scrollTrigger:
    {
        trigger: ".last-img ",
        scroller: "body",
        start: "top 80%",
        end: "top 50%",
        scrub: .5

    },

    opacity: 0,
    scale: 0,
    duration: 2,
    delay: 1,
    scrub: 1,

})
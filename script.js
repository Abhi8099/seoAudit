let websiteURL = '';

function validateURL() {
    const input = document.getElementById('websiteInput').value;
    const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    if (urlPattern.test(input)) {
        websiteURL = input;
        document.getElementById('nextButton').disabled = false;
    } else {
        document.getElementById('nextButton').disabled = true;
    }

    console.log("Website URL:", websiteURL);
}


function handleSubmit(event) {
    event.preventDefault();

    const urlParams = new URLSearchParams({ url: websiteURL });
    window.location = `/innerpage.html?${urlParams.toString()}`;
}

window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const websiteURL = params.get('url');

    document.getElementById("top_title").innerHTML = websiteURL
    const today = new Date();
    const date = today.toLocaleDateString(); // Format the date
    const time = today.toLocaleTimeString(); // Format the time
    document.getElementById('today_date_time').textContent = `${date} ${time}`;



    if (websiteURL) {
        const loader = document.getElementById('loader');
        const mainContent = document.getElementById('main-content');

        loader.style.display = 'FLEX';  // Show loader

        const apiUrl = 'http://172.16.16.11:8012/api/seo-check/';
        const requestBody = { url: websiteURL };

        // First fetch for SEO Check
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(seoData => {
                loader.style.display = 'none';
                mainContent.classList.remove('hidden');
                console.log(seoData);

                // Content Section

                document.getElementById('title').innerHTML =
                    `<div class="flex-[1] flex w-full h-[20vh] items-center justify-center">
    ${seoData.Title.Optimal_Length ? '<i class="fa-regular fa-circle-check text-3xl text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-3xl text-red-500"></i>'}
        </div>
        <div class="flex-[5] flex flex-col gap-2 w-full h-[20vh] justify-center">
<h3 class="text-md font-[700]">
  Title Tag:
  <span class="font-[400]">${" " + seoData.Title.Content}</span>
</h3>
<h3 class="text-md font-[700]">
  Length:
  <span class="font-[400]">${" " + seoData.Title.Length} Character(s)</span>
</h3>
<h3 class="text-md font-[700]">
  Word Count On Page:
  <span class="font-[400]">${" " + seoData.Word_Count} Word(s)</span>
</h3>
        </div>`;
                document.getElementById('meta-description').innerHTML = `
        <div class="flex-[1] flex w-full h-[20vh] items-center justify-center">
    ${seoData.Meta_Description.Optimal_Length ? '<i class="fa-regular fa-circle-check text-3xl text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-3xl text-red-500"></i>'}
        </div>
        <div class="flex-[5] flex flex-col gap-2 w-full h-[20vh] justify-center">
        <h3 class="text-md font-[700]">
  Meta Description:
  <span class="font-[400]">${" " + seoData.Meta_Description.Content}</span>
</h3>
<h3 class="text-md font-[700]">
  Length:
  <span class="font-[400]">${" " + seoData.Meta_Description.Length} character(s)</span>
</h3>
        </div>`;
                document.getElementById('header-tags-frequency').innerHTML = `
<div class="overflow-x-auto w-full">
  <table class="w-full bg-white border border-gray-300 rounded-lg shadow-md">
    <thead>
      <tr class="bg-gray-100 border-b">
        <th class="px-4 py-2 text-left text-gray-600">Tag</th>
        <th class="px-4 py-2 text-left text-gray-600">Frequency</th>
        <th class="px-4 py-2 text-center text-gray-600">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b">
        <td class="px-4 py-2 text-gray-700">H1</td>
        <td class="px-4 py-2 text-gray-700">${seoData.Performance.Header_Tags_frequency.h1}</td>
        <td class="px-4 py-2 text-center">
          ${seoData.Performance.Header_Tags_frequency.h1 ? '<i class="fa-regular fa-circle-check text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-red-500"></i>'}
        </td>
      </tr>
      <tr class="border-b">
        <td class="px-4 py-2 text-gray-700">H2</td>
        <td class="px-4 py-2 text-gray-700">${seoData.Performance.Header_Tags_frequency.h2}</td>
        <td class="px-4 py-2 text-center">
          ${seoData.Performance.Header_Tags_frequency.h2 ? '<i class="fa-regular fa-circle-check text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-red-500"></i>'}
        </td>
      </tr>
      <tr class="border-b">
        <td class="px-4 py-2 text-gray-700">H3</td>
        <td class="px-4 py-2 text-gray-700">${seoData.Performance.Header_Tags_frequency.h3}</td>
        <td class="px-4 py-2 text-center">
          ${seoData.Performance.Header_Tags_frequency.h3 ? '<i class="fa-regular fa-circle-check text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-red-500"></i>'}
        </td>
      </tr>
      <tr class="border-b">
        <td class="px-4 py-2 text-gray-700">H4</td>
        <td class="px-4 py-2 text-gray-700">${seoData.Performance.Header_Tags_frequency.h4}</td>
        <td class="px-4 py-2 text-center">
          ${seoData.Performance.Header_Tags_frequency.h4 ? '<i class="fa-regular fa-circle-check text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-red-500"></i>'}
        </td>
      </tr>
      <tr class="border-b">
        <td class="px-4 py-2 text-gray-700">H5</td>
        <td class="px-4 py-2 text-gray-700">${seoData.Performance.Header_Tags_frequency.h5}</td>
        <td class="px-4 py-2 text-center">
          ${seoData.Performance.Header_Tags_frequency.h5 ? '<i class="fa-regular fa-circle-check text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-red-500"></i>'}
        </td>
      </tr>
      <tr class="border-b">
        <td class="px-4 py-2 text-gray-700">H6</td>
        <td class="px-4 py-2 text-gray-700">${seoData.Performance.Header_Tags_frequency.h6}</td>
        <td class="px-4 py-2 text-center">
          ${seoData.Performance.Header_Tags_frequency.h6 ? '<i class="fa-regular fa-circle-check text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-red-500"></i>'}
        </td>
      </tr>
    </tbody>
  </table>
</div>
`;

                document.getElementById('images-without-alt').innerHTML = `
                        <div class="flex-[1] flex w-full h-[20vh] items-center justify-center">
    ${seoData.Performance.Images_Without_Alt == "0" ? '<i class="fa-regular fa-circle-check text-3xl text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-3xl text-red-500"></i>'}
        </div>
        <div class="flex-[5] flex flex-col gap-2 w-full h-[20vh] justify-center">
        <h3 class="text-md font-[700]">
Images Without Alt Tags:
  <span class="font-[400]">${" " + seoData.Performance.Images_Without_Alt}</span>
</h3>
<h3 class="text-md font-[700]">
  Images Alt Attribute Message:
  <span class="font-[400]">${" " + seoData.Performance.Images_Alt_Attribute_Message} character(s)</span>
</h3>
        </div>`;


                //keywords
                const keywordConsistency = seoData.Keyword_Consistency;
                let tableRows = '';

                for (const keyword in keywordConsistency) {
                    if (keywordConsistency.hasOwnProperty(keyword)) {
                        const data = keywordConsistency[keyword];
                        tableRows += `
                      <tr class="border-b">
                        <td class="px-4 py-2 text-gray-700">${keyword}</td>
                        <td class="px-4 py-2 text-center">
                          ${data.Title ? '<i class="fa-regular fa-circle-check text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-red-500"></i>'}
                        </td>
                        <td class="px-4 py-2 text-center">
                          ${data.Meta_description_tag ? '<i class="fa-regular fa-circle-check text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-red-500"></i>'}
                        </td>
                        <td class="px-4 py-2 text-center">
                          ${data.Headings_tags ? '<i class="fa-regular fa-circle-check text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-red-500"></i>'}
                        </td>
                        <td class="px-4 py-2 text-gray-700">${data.Page_frequency}</td>
                      </tr>`;
                    }
                }

                document.getElementById('keyword-consistency-table').innerHTML = `
                  <div class="overflow-x-auto">
                    <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                      <thead>
                        <tr class="bg-gray-100 border-b">
                          <th class="px-4 py-2 text-left text-gray-600">Keyword</th>
                          <th class="px-4 py-2 text-left text-gray-600">Title</th>
                          <th class="px-4 py-2 text-left text-gray-600">Meta Description</th>
                          <th class="px-4 py-2 text-left text-gray-600">Headings</th>
                          <th class="px-4 py-2 text-left text-gray-600">Page Frequency</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${tableRows}
                      </tbody>
                    </table>
                  </div>`;


                // Indexing Section
                document.getElementById('canonical-tag').innerHTML = `
<div class="flex-[1] flex w-full h-[20vh] items-center justify-center">
    ${seoData.Indexing.Canonical_Tag ? '<i class="fa-regular fa-circle-check text-3xl text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-3xl text-red-500"></i>'}
        </div>
        <div class="flex-[5] flex flex-col gap-2 w-full h-[20vh] justify-center">
        <h3 class="text-md font-[700]">
Canonical Tag:
  <span class="font-[400]">${" " + seoData.Indexing.Canonical_Tag}</span>
</h3>
<h3 class="text-md font-[700]">
Canonical Tag Message:
  <span class="font-[400]">${" " + seoData.Indexing.Canonical_Tag_Message} character(s)</span>
</h3>
        </div>`;


                document.getElementById('noindex-tag').innerHTML = `
<div class="flex-[1] flex w-full h-[20vh] items-center justify-center">
    ${seoData.Indexing.Noindex_Tag ? '<i class="fa-regular fa-circle-check text-3xl text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-3xl text-red-500"></i>'}
        </div>
        <div class="flex-[5] flex flex-col gap-2 w-full h-[20vh] justify-center">
        <h3 class="text-md font-[700]">
Noindex Tag:
  <span class="font-[400]">${" " + seoData.Indexing.Noindex_Tag}</span>
</h3>
<h3 class="text-md font-[700]">
Noindex Tag Message:
  <span class="font-[400]">${" " + seoData.Indexing.Noindex_Tag_Message} character(s)</span>
</h3>
        </div>`;

                document.getElementById('robots-txt').innerHTML = `
<div class="flex-[1] flex w-full h-[20vh] items-center justify-center">
    ${seoData.Indexing.Robots_txt ? '<i class="fa-regular fa-circle-check text-3xl text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-3xl text-red-500"></i>'}
        </div>
        <div class="flex-[5] flex flex-col gap-2 w-full h-[20vh] justify-center">
        <h3 class="text-md font-[700]">
Robots.txt:
  <span class="font-[400]">${" " + seoData.Indexing.Robots_txt}</span>
</h3>
<h3 class="text-md font-[700]">
Robots.txt Message:
  <span class="font-[400]">${" " + seoData.Indexing.Robots_txt_Message} character(s)</span>
</h3>
        </div>
                `;
                document.getElementById('xml-sitemap').innerHTML = `
                <div class="flex-[1] flex w-full h-[20vh] items-center justify-center">
    ${seoData.Indexing.XML_Sitemap ? '<i class="fa-regular fa-circle-check text-3xl text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-3xl text-red-500"></i>'}
        </div>
        <div class="flex-[5] flex flex-col gap-2 w-full h-[20vh] justify-center">
        <h3 class="text-md font-[700]">
XML Sitemap:
  <span class="font-[400]">${" " + seoData.Indexing.XML_Sitemap}</span>
</h3>
<h3 class="text-md font-[700]">
XML Sitemap Message:
  <span class="font-[400]">${" " + seoData.Indexing.XML_Sitemap_Message} character(s)</span>
</h3>
        </div>
                `;

                // Structured Data Section
                document.getElementById('schema-message').innerHTML = `
<div class="flex-[1] flex w-full h-[20vh] items-center justify-center">
    ${seoData.Schema_Message ? '<i class="fa-regular fa-circle-check text-3xl text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-3xl text-red-500"></i>'}
        </div>
        <div class="flex-[5] flex flex-col gap-2 w-full h-[20vh] justify-center">
        <h3 class="text-md font-[700]">
Schema Message:
  <span class="font-[400]">${" " + seoData.Schema_Message}</span>
</h3>
        </div>`;

                // Security Section
                document.getElementById('ssl-enabled').innerHTML = `
                
                <div class="flex-[1] flex w-full h-[20vh] items-center justify-center">
    ${seoData.Security.SSL_Enabled ? '<i class="fa-regular fa-circle-check text-3xl text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-3xl text-red-500"></i>'}
        </div>
        <div class="flex-[5] flex flex-col gap-2 w-full h-[20vh] justify-center">
        <h3 class="text-md font-[700]">
SSL Enabled:
  <span class="font-[400]">${" " + seoData.Security.SSL_Enabled}</span>
</h3>
        <h3 class="text-md font-[700]">
SSL Message:
  <span class="font-[400]">${" " + seoData.Security.SSL_Message}</span>
</h3>
        </div>`;
                document.getElementById('https-redirect').innerHTML = `
                                <div class="flex-[1] flex w-full h-[20vh] items-center justify-center">
    ${seoData.Security.HTTPS_Redirect ? '<i class="fa-regular fa-circle-check text-3xl text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-3xl text-red-500"></i>'}
        </div>
        <div class="flex-[5] flex flex-col gap-2 w-full h-[20vh] justify-center">
        <h3 class="text-md font-[700]">
HTTPS Redirect:
  <span class="font-[400]">${" " + seoData.Security.HTTPS_Redirect}</span>
</h3>
        <h3 class="text-md font-[700]">
HTTPS Redirect Message:
  <span class="font-[400]">${" " + seoData.Security.HTTPS_Redirect_Message}</span>
</h3>
        </div>`;

                // Performance Section


                // Second fetch for Page Speed
                const speedApi = "http://172.16.16.11:8012/page-speed/";
                return fetch(speedApi, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody)
                });
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);
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
    } else {
        console.error('No URL provided');
    }
}

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


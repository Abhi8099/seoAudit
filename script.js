let websiteURL = '';

function validateURL() {
  event.preventDefault();
  event.stopPropagation();
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
  event.stopPropagation();

  const urlParams = new URLSearchParams({ url: websiteURL });
  window.location = `/innerpage.html?${urlParams.toString()}`;
}

window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const websiteURL = params.get('url');

  document.getElementById("top_title").innerHTML = websiteURL;
  const today = new Date();
  const date = today.toLocaleDateString(); // Format the date
  const time = today.toLocaleTimeString(); // Format the time
  document.getElementById('today_date_time').textContent = `${date} ${time}`;
  document.getElementById("proposal_input").value = websiteURL;

  const tabs = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.id.replace('-tab', '-content');
      document.getElementById(targetId).classList.add('active');
    });
  });



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
        <td class="px-4 py-2 text-gray-700">${seoData.Performance.H1_Tag ? "Present" : "Not Present"}</td>
        <td class="px-4 py-2 text-center">
          ${seoData.Performance.H1_Tag ? '<i class="fa-regular fa-circle-check text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-red-500"></i>'}
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
  <span class="font-[400]">${" " + seoData.Performance.Images_Alt_Attribute_Message}</span>
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
                          <th class="px-4 py-2 text-center text-gray-600">Title</th>
                          <th class="px-4 py-2 text-center text-gray-600">Meta Description</th>
                          <th class="px-4 py-2 text-center text-gray-600">Headings</th>
                          <th class="px-4 py-2 text-left text-gray-600">Page Frequency</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${tableRows}
                      </tbody>
                    </table>
                  </div>`;


        const bigramConsistency = seoData.Bigram_Consistency;
        let bigramTableRows = '';

        bigramConsistency.forEach(bigram => {
          bigramTableRows += `
    <tr class="border-b">
        <td class="px-4 py-2 text-gray-700">${bigram.keyword}</td>
        <td class="px-4 py-2 text-center">
            ${bigram.title ? '<i class="fa-regular fa-circle-check text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-red-500"></i>'}
        </td>
        <td class="px-4 py-2 text-center">
            ${bigram.Meta_Description_Tag ? '<i class="fa-regular fa-circle-check text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-red-500"></i>'}
        </td>
        <td class="px-4 py-2 text-center">
            ${bigram.Headings_Tags ? '<i class="fa-regular fa-circle-check text-green-500"></i>' : '<i class="fa-regular fa-circle-xmark text-red-500"></i>'}
        </td>
        <td class="px-4 py-2 text-gray-700">${bigram.Page_Frequency}</td>
    </tr>`;
        });

        document.getElementById('phrases-table').innerHTML = `
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
      <thead>
        <tr class="bg-gray-100 border-b">
          <th class="px-4 py-2 text-left text-gray-600">Phrases</th>
          <th class="px-4 py-2 text-center text-gray-600">Title</th>
          <th class="px-4 py-2 text-center text-gray-600">Meta Description</th>
          <th class="px-4 py-2 text-center text-gray-600">Headings</th>
          <th class="px-4 py-2 text-left text-gray-600">Page Frequency</th>
        </tr>
      </thead>
      <tbody>
        ${bigramTableRows}
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
  <span class="font-[400]">${" " + seoData.Indexing.Canonical_Tag_Message}</span>
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
  <span class="font-[400]">${" " + seoData.Indexing.Noindex_Tag_Message}</span>
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
  <span class="font-[400]">${" " + seoData.Indexing.Robots_txt_Message}</span>
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
  <span class="font-[400]">${" " + seoData.Indexing.XML_Sitemap_Message}</span>
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
        const getQualityLabel = (value, thresholds) => {
          if (value <= thresholds.good) return 'Good';
          if (value <= thresholds.needsImprovement) return 'Needs Improvement';
          return 'Poor';
        };

        const metrics = {
          fcp: {
            label: 'First Contentful Paint (FCP)',
            value: parseFloat(response.core_web_vitals.fcp),
            thresholds: { good: 1.8, needsImprovement: 3.0 },
            unit: 's',
            Good: "(≤ 1.8 s)",
            Needs_Improvement: "(1.8 s - 3 s)",
            Poor: "(> 3 s)"
          },
          lcp: {
            label: 'Largest Contentful Paint (LCP)',
            value: parseFloat(response.core_web_vitals.lcp),
            thresholds: { good: 2.5, needsImprovement: 4.0 },
            unit: 's',
            Good: "(≤ 2.5 s)",
            Needs_Improvement: "(2.5 s - 4 s)",
            Poor: "(> 4 s)"
          },
          cls: {
            label: 'Cumulative Layout Shift (CLS)',
            value: parseFloat(response.core_web_vitals.cls),
            thresholds: { good: 0.1, needsImprovement: 0.25 },
            Good: "(≤ 0.1 s)",
            Needs_Improvement: "(0.1 s - 0.25)",
            Poor: "(> 0.25)"
          },
          inp: {
            label: 'First Input Delay (FID)',
            value: parseFloat(response.core_web_vitals.fid),
            thresholds: { good: 0.1, needsImprovement: 0.3 },
            unit: 's',
            Good: "(≤ 100 ms)",
            Needs_Improvement: "(100 ms - 300 ms)",
            Poor: "(> 300 ms)"
          },
        };

        let output = '';
        Object.keys(metrics).forEach(key => {
          const metric = metrics[key];
          const quality = getQualityLabel(metric.value, metric.thresholds);
          const color = quality === 'Good' ? 'text-green-500' : (quality === 'Needs Improvement' ? 'text-yellow-500' : 'text-red-500');
          output += `
        <div class='flex bg-white p-4 rounded shadow-md'>
          <div class="flex-1">
            <h4 class="text-lg font-semibold mb-2 text-blue-600">${metric.label}</h4>
            <p class="text-2xl ${color}">${metric.value}${metric.unit || ''}</p>
            <p class="${color}">${quality}</p>
          </div>
          <div class="flex-1">
            <h4 class="text-sm mb-2 text-green-500">Good ${metric.Good}</h4>
            <h4 class="text-sm mb-2 text-yellow-500">Needs Improvement ${metric.Needs_Improvement}</h4>
            <h4 class="text-sm mb-2 text-red-500">Poor ${metric.Poor}</h4>
          </div>
        </div>
          `;
        });


        document.getElementById('coreWebVitals').innerHTML = output;

        const ctxPerformance = document.createElement('canvas');
        const ctxAccessibility = document.createElement('canvas');
        const ctxBestPractices = document.createElement('canvas');
        const ctxSEO = document.createElement('canvas');

        const performanceScoreDiv = document.createElement('div');
        const accessibilityScoreDiv = document.createElement('div');
        const bestPracticesScoreDiv = document.createElement('div');
        const seoScoreDiv = document.createElement('div');

        // Style score divs (optional, for better visual presentation)
        const scoreStyle = 'text-align: center; font-size: 16px; font-weight: bold; margin-top: 10px;';

        performanceScoreDiv.style = scoreStyle;
        accessibilityScoreDiv.style = scoreStyle;
        bestPracticesScoreDiv.style = scoreStyle;
        seoScoreDiv.style = scoreStyle;

        document.getElementById('Scores').appendChild(ctxPerformance);
        document.getElementById('ScoresDiv').appendChild(performanceScoreDiv); // Append score div

        document.getElementById('Scores').appendChild(ctxAccessibility);
        document.getElementById('ScoresDiv').appendChild(accessibilityScoreDiv); // Append score div

        document.getElementById('Scores').appendChild(ctxBestPractices);
        document.getElementById('ScoresDiv').appendChild(bestPracticesScoreDiv); // Append score div

        document.getElementById('Scores').appendChild(ctxSEO);
        document.getElementById('ScoresDiv').appendChild(seoScoreDiv);

        const createDonutChart = (ctx, label, value, color, scoreDiv) => {
          new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: [label],
              datasets: [{
                data: [value, 100 - value],
                backgroundColor: [color, '#e0e0e0'],
                borderWidth: 0
              }]
            },
            options: {
              responsive: true,
              cutout: '70%',
              plugins: {
                legend: {
                  display: true,
                  position: 'bottom',
                  labels: {
                    font: {
                      size: 14
                    }
                  }
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    }
                  }
                }
              },
              elements: {
                arc: { borderWidth: 0 }
              }
            }
          });
          scoreDiv.textContent = `${value}`;
        };

        createDonutChart(ctxPerformance, 'Performance Score', response.performance_score, '#4CAF50', performanceScoreDiv);
        createDonutChart(ctxAccessibility, 'Accessibility Score', response.accessibility_score, '#2196F3', accessibilityScoreDiv);
        createDonutChart(ctxBestPractices, 'Best Practices Score', response.best_practices_score, '#FFC107', bestPracticesScoreDiv);
        createDonutChart(ctxSEO, 'SEO Score', response.seo_score, '#F44336', seoScoreDiv);

        // Performance Metrics
        const met_rics = response.performance_metrics;
        document.getElementById('performanceMetrics').innerHTML = `
        <div class='flex bg-white p-4 rounded shadow-md '>
                    <div class="flex-1">
                <h4 class="text-lg font-semibold mb-2 text-blue-600">First Contentful Paint</h4>
                <p>${met_rics.first_contentful_paint}</p>
            </div>
                    <div class="flex-1 items-center text-sm  flex">
                <p>First Contentful Paint marks the time at which the first text or image is painted. <a class='text-blue-500' target=_blank href='https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/?utm_source=lighthouse&utm_medium=lr'>Learn more about the First Contentful Paint metric.</a></p>
            </div>
        </div>
                <div class='flex bg-white p-4 rounded shadow-md '>
                    <div class="flex-1">
                <h4 class="text-lg font-semibold mb-2 text-blue-600">Largest Contentful Paint</h4>
                <p>${met_rics.largest_contentful_paint}</p>
            </div>
                    <div class="flex-1 items-center text-sm  flex">
                <p>Largest Contentful Paint marks the time at which the largest text or image is painted. <a class='text-blue-500' target=_blank href='https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/?utm_source=lighthouse&utm_medium=lr'>Learn more about the Largest Contentful Paint metric.</a></p>
            </div>
        </div>
        <div class='flex bg-white p-4 rounded shadow-md '>
                    <div class="flex-1">
                <h4 class="text-lg font-semibold mb-2 text-blue-600">Cumulative Layout Shift</h4>
                <p>${met_rics.cumulative_layout_shift}</p>
            </div>
                    <div class="flex-1 items-center text-sm  flex">
                <p>Cumulative Layout Shift measures the movement of visible elements within the viewport. <a class='text-blue-500' target=_blank href='https://web.dev/articles/cls?utm_source=lighthouse&utm_medium=lr'>Learn more about the Cumulative Layout Shift metric.</a></p>
            </div>
        </div>
        <div class='flex bg-white p-4 rounded shadow-md '>
                    <div class="flex-1">
                <h4 class="text-lg font-semibold mb-2 text-blue-600">Speed Index</h4>
                <p>${met_rics.speed_index}</p>
            </div>
                    <div class="flex-1 items-center text-sm  flex">
                <p>Speed Index shows how quickly the contents of a page are visibly populated. <a class='text-blue-500' target=_blank href='https://developer.chrome.com/docs/lighthouse/performance/speed-index/?utm_source=lighthouse&utm_medium=lr'>Learn more about the Speed Index metric.</a></p>
            </div>
        </div>

        <div class='flex bg-white p-4 rounded shadow-md '>
                    <div class="flex-1">
                <h4 class="text-lg font-semibold mb-2 text-blue-600">Total Blocking Time</h4>
                <p>${met_rics.total_blocking_time}</p>
            </div>
                    <div class="flex-1 items-center text-sm  flex">
                <p>Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds. <a class='text-blue-500' target=_blank href='https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/?utm_source=lighthouse&utm_medium=lr'>Learn more about the Total Blocking Time metric.</a></p>
            </div>
        </div>


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
    threshold: 0.1
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

sliderContent.style.width = `${mainDivs.length * 100}%`;

mainDivs.forEach((div) => {
  div.style.width = `${100 / mainDivs.length}%`;
});

let currentIndex = 0;



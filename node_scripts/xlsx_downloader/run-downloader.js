// imports
import { chromium } from 'playwright';
import downloadXLSXFiles from './downloadXLSXFiles.js';

// Configuration object for headers and user agent
const config = {
    headers: {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
        'cookie': '_ga_DZ3PBM94KG=GS2.1.s1754057683$o2$g0$t1754057683$j60$l0$h0; _ga=GA1.3.355711465.1754038222; _gid=GA1.3.1851109181.1757103838; _ga_T0LC02LFHL=GS2.3.s1757104223$o2$g1$t1757104252$j31$l0$h0; PHPSESSID=o40i5cuf5vb9klh52tn99sacm9; blinded_zoom=1; _gat_UA-179654107-1=1; _ga_09YQ8JQEFR=GS2.3.s1757109068$o3$g1$t1757111492$j60$l0$h0',
        'priority': 'u=0, i',
        'referer': 'https://vl.tax.gov.ua/rahunki-dlya-splati-platejiv',
        'sec-ch-ua': '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-site',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
    },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
    viewport: { width: 1920, height: 1080 }
};

/**
 * Executes a Playwright session to download files from a given URL.
 * @param {string} url The URL to navigate to and download from.
 * @returns {Promise<string[]>} An array of paths to the downloaded files.
 */
async function downloadFilesFromUrl(url) {
    let browser;
    try {
        browser = await chromium.launch();
        const context = await browser.newContext({
            userAgent: config.userAgent,
            viewport: config.viewport,
        });
        const page = await context.newPage();

        await page.setExtraHTTPHeaders(config.headers);

        console.log(`Navigating to ${url} and downloading files...`);
        const downloadedFiles = await downloadXLSXFiles(page, url);

        console.log('Successfully downloaded files.');
        return downloadedFiles;
    } finally {
        if (browser) {
            await browser.close();
            console.log('Browser closed.');
        }
    }
}

// Self-executing main logic
(async () => {
    const urlToDownloadFrom = process.argv[2];

    if (!urlToDownloadFrom) {
        console.error('Error: Please provide a URL to download from.');
        console.error('Usage: node run-downloader.js <url>');
        process.exit(1);
    }

    try {
        const files = await downloadFilesFromUrl(urlToDownloadFrom);
        console.log(JSON.stringify(files)); // This output later parsed by Laravel Job
    } catch (error) {
        console.error('An unhandled error occurred:', error);
        process.exit(1);
    }
})();

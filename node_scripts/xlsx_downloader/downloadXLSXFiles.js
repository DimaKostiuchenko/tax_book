import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

/**
 * @typedef {object} DownloadedFile
 * @property {string} link_title - The text content of the download link.
 * @property {string} file_url - The URL of the file link.
 * @property {string} file_path - The full file path of the downloaded file.
 */

/**
 * Downloads all files with a .xlsx extension from a given URL and returns their details.
 * @param {import('playwright').Page} page - The Playwright Page object.
 * @param {string} pageUrl - The URL of the webpage containing the download links.
 * @returns {Promise<DownloadedFile[]>} A promise that resolves to an array of objects
 * with link titles, file URLs, and file paths.
 */
async function downloadXLSXFiles(page, pageUrl) {
    // Navigate to the specified page.
    await page.goto(pageUrl);
    console.log('moving to ' + pageUrl);
    console.log('waiting for 3 sec');
    await page.waitForTimeout(3000);

    // --- Start Debugging Steps ---
    const pageContent = await page.content();
    const screenshotPath = path.join(process.cwd(), 'debug-page.png');
    const htmlPath = path.join(process.cwd(), 'debug-page-content.html');

    console.log('Page navigated to:', pageUrl);
    console.log('Dumping page content for debugging...');
    await page.screenshot({path: screenshotPath, fullPage: true});
    fs.writeFileSync(htmlPath, pageContent);
    console.log(`Page screenshot saved to: ${screenshotPath}`);
    console.log(`Page HTML content saved to: ${htmlPath}`);
    // --- End Debugging Steps ---

    // Find all links that end with ".xlsx".
    await page.waitForSelector('a[href$=".xlsx"]', {state: 'attached'});
    const downloadLocators = await page.locator('a[href$=".xlsx"]').all();

    console.log(`Found ${downloadLocators.length} .xlsx files to download...`);

    if (downloadLocators.length === 0) {
        console.log(`No .xlsx files found on ${pageUrl}`);
        return [];
    }

    const downloadedFilesData = [];

    // Ensure the temp directory exists.
    const tempDir = path.join(process.cwd(), 'temp');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }

    // Iterate through each locator found and trigger the download.
    for (const locator of downloadLocators) {
        // Get the link's text content and its URL for the report.
        const linkTitle = await locator.textContent();
        const fileUrl = await locator.getAttribute('href');
        await page.waitForTimeout(1000);

        // Start waiting for the download event before clicking the link.
        const downloadPromise = page.waitForEvent('download');

        // Simulate a user click on the link to trigger the download.
        await locator.click();

        // Wait for the download to complete.
        const download = await downloadPromise;

        // Get the suggested filename and define the save path.
        const suggestedFilename = download.suggestedFilename();
        const filePath = path.join(tempDir, suggestedFilename);

        // Save the downloaded file.
        await download.saveAs(filePath);

        // Add the file's data to our array.
        downloadedFilesData.push({
            link_title: linkTitle,
            file_url: fileUrl, // Now includes the file's URL
            file_path: filePath
        });

        console.log(`Downloaded: ${suggestedFilename} (Title: "${linkTitle}", URL: "${fileUrl}")`);
    }

    return downloadedFilesData;
}

export default downloadXLSXFiles;

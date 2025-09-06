const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

/**
 * Downloads all files with a .xlsx extension from a given URL.
 * This function encapsulates the core logic, making it reusable and testable.
 * @param {import('playwright').Page} page - The Playwright Page object.
 * @param {string} pageUrl - The URL of the webpage containing the download links.
 * @returns {Promise<string[]>} A promise that resolves to an array of file paths of the downloaded files.
 */
async function downloadXLSXFiles(page, pageUrl) {
    // Navigate to the specified page.
    await page.goto(pageUrl);

    // Use a CSS selector to find all anchor (<a>) tags with href attributes
    // that end with ".xlsx". This is a robust way to locate the download links.
    const downloadLinks = await page.locator('a[href$=".xlsx"]').all();

    if (downloadLinks.length === 0) {
        console.log(`No .xlsx files found on ${pageUrl}`);
        return [];
    }

    const downloadedFilePaths = [];

    console.log(`Found ${downloadLinks.length} .xlsx files to download...`);

    // Iterate through each locator found and trigger the download.
    for (const link of downloadLinks) {
        const fileUrl = await link.getAttribute('href');
        if (!fileUrl) {
            continue;
        }

        // Use a new page to download each file to avoid race conditions.
        const newPage = await page.context().newPage();

        // Start waiting for the download event *before* navigating.
        const downloadPromise = newPage.waitForEvent('download');

        // Navigate directly to the file URL to trigger the download.
        await newPage.goto(fileUrl);

        // Wait for the download to complete.
        const download = await downloadPromise;

        // Get the suggested filename and define the save path.
        const suggestedFilename = download.suggestedFilename();
        const filePath = path.join(process.cwd(), 'temp', suggestedFilename);

        // Ensure the temp directory exists.
        const tempDir = path.join(process.cwd(), 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        // Save the downloaded file.
        await download.saveAs(filePath);
        downloadedFilePaths.push(filePath);

        console.log(`Downloaded: ${suggestedFilename}`);
        await newPage.close();
    }

    return downloadedFilePaths;
}

// Export the function so it can be used in other scripts (like our test file).
module.exports = { downloadXLSXFiles };

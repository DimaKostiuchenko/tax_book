const { chromium } = require('playwright');
const { downloadXLSXFiles } = require('./downloadXLSXFiles.js');

/**
 * Main function to set up Playwright and execute the file download.
 */
async function main() {
    // Get the URL from the command-line arguments.
    // process.argv[2] is the first argument after 'node' and the script name.
    const urlToDownloadFrom = process.argv[2];

    // Check if a URL was provided.
    if (!urlToDownloadFrom) {
        console.error('Error: Please provide a URL to download from.');
        console.error('Usage: node run-downloader.js <url>');
        process.exit(1);
    }

    let browser;
    try {
        console.log('Launching browser...');
        browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        console.log(`Navigating to ${urlToDownloadFrom} and downloading files...`);
        const downloadedFiles = await downloadXLSXFiles(page, urlToDownloadFrom);

        if (downloadedFiles.length > 0) {
            console.log('Successfully downloaded the following files:');
            downloadedFiles.forEach(file => console.log(`- ${file}`));
        } else {
            console.log('No files were downloaded.');
        }

    } catch (error) {
        console.error('An error occurred during the download process:', error);
    } finally {
        if (browser) {
            await browser.close();
            console.log('Browser closed.');
        }
    }
}

// Execute the main function.
main();

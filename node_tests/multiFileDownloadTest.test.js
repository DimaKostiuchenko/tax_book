import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import { downloadXLSXFiles } from '../node_scripts/xlsx_downloader/downloadXLSXFiles.js';

test.describe('Multiple File Download', () => {

  // This test uses a mock server or a public page with multiple links.
  test('should successfully download all xlsx files from a webpage', async ({ page }) => {
    // The URL of a page that contains multiple download links.
    // NOTE: This URL is a placeholder. For a real test, you would use a stable public URL
    // or a mock server to serve the test page.
    const pageUrl = 'https://tax.gov.ua/data/files/506328.xlsx';

    // The logic is encapsulated in a separate function, making the test clean and focused.
    const downloadedFiles = await downloadXLSXFiles(page, pageUrl);

    // Assert that at least one file was downloaded.
    expect(downloadedFiles.length).toBeGreaterThan(0);

    // Optional: Verify that the downloaded files exist.
    downloadedFiles.forEach(filePath => {
      expect(fs.existsSync(filePath)).toBeTruthy();
      console.log(`Verified file exists: ${filePath}`);
    });

    // Clean up the downloaded files after the test is complete.
    downloadedFiles.forEach(filePath => {
      fs.unlinkSync(filePath);
      console.log(`Cleaned up file: ${filePath}`);
    });

    // Optional: Clean up the temporary directory if it's empty.
    const tempDir = path.join(process.cwd(), 'temp');
    if (fs.existsSync(tempDir) && fs.readdirSync(tempDir).length === 0) {
        fs.rmdirSync(tempDir);
    }
  });
});

const puppeteer = require("puppeteer");

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // So we can see the browser window
    defaultViewport: null, // Open it in the Default Desktop mode
  });

  // We take new Page which will be acting as our Windows Browser Page
  const page = await browser.newPage();

  // Go to swap.defillama.com
  await page.goto("https://swap.defillama.com");

  // Fill the "Chain" field with "Arbitrum One" Value
  await page.type("#react-select-2-input", "Arbitrum One");

  // Simulate pressing the Enter key to select the Value
  await page.keyboard.press("Enter");

  await delay(2000);

  // Clear the default value in the "You Sell" field
  await page.click(".css-79elbk input", { clickCount: 3 }); // Select all text in the input
  await page.keyboard.press("Backspace"); // Simulate pressing the Backspace key to delete the selected text

  // Fill the "You Sell" field
  await page.type(".css-79elbk input", "12");

  await delay(2000);

  // Click on the button to open the popup window
  await page.click(".css-1urcov8 .css-q4vstg:first-child button");

  await delay(2000);

  // Type 'WBTC' in the search input within the popup window
  await page.type(".css-bls73e .css-s1d1f4", "WBTC");

  await delay(2000);

  // Wait for the WBTC option to appear in the list
  await page.waitForSelector(".css-72rvq0");

  // Click on the 1st item with below class to select WBTC option
  await page.click(".css-72rvq0");

  await delay(2000);

  // Click on the button to open the popup window of You Sell Section
  await page.click(".css-1urcov8 .css-q4vstg:last-child button");

  // Type 'WBTC' in the search input within the popup window
  await page.type(".css-bls73e .css-s1d1f4", "USDC");

  await delay(2000);

  // Find all the list items
  const listItems = await page.$$(".sc-b49748d5-3.cjxQGj");
  // Click on the second item (USDC)
  await listItems[1].click();


  // Wait for the Right Side panel to appear and load
  await page.waitForSelector(".sc-18d0abec-0.knYyMy.RouteWrapper");

  await delay(10000);

  // Get the List of Items in right side panel
  const listItem = await page.$$(".sc-18d0abec-0.knYyMy.RouteWrapper");

  // Click on the second item (USDC)
  await listItem[1].click();

  // Leaving the browser window open
})();

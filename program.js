const puppeteer = require("puppeteer");

async function takeScreenshot(url, outputFile = "screenshot.png") {
	// Launch a new browser instance
	const browser = await puppeteer.launch({
		executablePath:
			"/Applications/Google Chrome.app/Contents/MacOS/GoogleChrome",
		headless: false, // Set headless to false so that Chrome opens visibility
		slowMo: 0, // Set slowMo to 0 to improve performance
	});

	const page = await browser.newPage();

	try {
		// Set screen size.
		await page.setViewport({width: 3840, height: 2160});

		await page.goto(url.startsWith("http") ? url : `https://${url}`);
		await await page.screenshot({path: outputFile});
		console.log(`Screenshot saved as ${outputFile}`);
	} catch (error) {
		console.error("Error taking screenshot:", error);
	} finally {
		await browser.close();
	}
}

// Readline interface MVP
const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});

readline.question("Enter the URL to screenshot: ", (url) => {
	readline.question(
		"Enter the output file name (default: screenshot.png): ",
		(outputFile) => {
			takeScreenshot(url, outputFile || "screenshot.png");
			readline.close();
		},
	);
});

// Helper function to scroll to the bottom of the page
async function scroll(page) {
	return await page.evaluate(async () => {
		return await new Promise((resolve, reject) => {
			var i = setInterval(() => {
				window.scrollBy(0, window.innerHeight);
				if (
					document.scrollingElement.scrollTop + window.innerHeight >=
					document.scrollingElement.scrollHeight
				) {
					window.scrollTo(0, 0);
					clearInterval(i);
					resolve();
				}
			}, 100);
		});
	});
}

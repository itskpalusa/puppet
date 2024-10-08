const puppeteer = require("puppeteer");

async function takeScreenshot(url, outputFile = "screenshot.png") {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	try {
		// Set screen size.
		await page.setViewport({width: 3840, height: 2160});
		await page.goto(url.startsWith("http") ? url : `https://${url}`);
		await page.screenshot({path: outputFile});
		console.log(`Screenshot saved as ${outputFile}`);
	} catch (error) {
		console.error("Error taking screenshot:", error);
	} finally {
		await browser.close();
	}
}

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

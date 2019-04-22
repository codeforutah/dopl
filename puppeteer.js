// --------------
// Scrapes licensed business from Utah website.
// 4/16/19 There were 14,023 pages with 50 businesses per page
// --------------
const puppeteer = require('puppeteer');
var fs = require('fs');
var file = fs.createWriteStream('businesses.json');

(async () => {
	const browser = await puppeteer.launch({ headless: true, slowMo: 0, devtools: false });
	const page = await browser.newPage();
	let nextPage = null;

	await page.goto('https://secure.utah.gov/llv/search/search.html');
	await page.click('input[type=submit]');
	await page.waitForNavigation();

	// Carry on at certain location
	// await page.goto('https://secure.utah.gov/llv/search/search.html?currentPage=8776&orderBy=full_name');

	// Start file
	file.write('[');

	// Iterate Pages
	do {
		// Get row count
		let rowCount = await page.evaluate((s)=>{
			return document.getElementsByClassName(s)[0].rows.length;
		}, 'resultsTable');
		
		// Iterate rows
		for (var i = 1; i < rowCount; i++) {
			let row = await page.evaluate((s, i)=> {
				let table = document.getElementsByClassName(s)[0];

				let name = table.rows[i].cells[0].textContent;
				let id = table.rows[i].cells[0].childNodes[0].getAttribute('href').split("=")[1];
				let city = table.rows[i].cells[1].textContent;
				let typeArray = table.rows[i].cells[2].textContent.split("\n");
				let profession = String(typeArray[1]).trim();
				let type = String(typeArray[2]).trim();
				let license = table.rows[i].cells[3].textContent;
				let status = table.rows[i].cells[4].textContent;
				return { id: id, name: name, city: city, profession: profession, type: type, license: license, status: status};
			}, 'resultsTable', i);
			console.log(row);
			file.write(JSON.stringify(row) + ',\n');
		}

		// Delay to prevent server load
		await page.waitFor(10000);

		// Detect Next Page button
		nextPage = await page.$('#pagination-next');
		if (nextPage) {
			await page.click('#pagination-next');
			await page.waitForSelector('.resultsTable');
		}
	} while (nextPage);
	file.write(']');
	file.end();

	// Close browser
	await browser.close();
})();
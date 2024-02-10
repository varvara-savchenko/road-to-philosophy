const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const randomPage = "https://en.m.wikipedia.org/wiki/Special:Random";
const philosophyPage = "https://en.m.wikipedia.org/wiki/Philosophy";

async function checkCurrentPage(driver) {
    let currentPage = await driver.getCurrentUrl();
    let redirectsCount = 0;
    const visitedPages = [];

    if (currentPage === philosophyPage) {
        console.log(`${philosophyPage} has been reached in ${redirectsCount} redirects.`)
        return
    }
    do {
        console.log(`Starting at ${currentPage}.`);
        visitedPages.push(currentPage);
        const firstLink = await driver.findElement(By.xpath('//*[@id="mw-content-text"]//p/a[1]'));
        await firstLink.click();
        currentPage = await driver.getCurrentUrl();
        console.log(`Loop continues until ${currentPage} equals ${philosophyPage}.`);
        await driver.sleep(1000);
        redirectsCount++;
        if (visitedPages.includes(currentPage)) {
            console.log(`Test ended. Impossible to reach ${philosophyPage} because of loop in already visited articles: ${visitedPages}`);
            return;
        }
    } while (currentPage !== philosophyPage);
    console.log(`${philosophyPage} has been reached in ${redirectsCount} redirects.`);
}


async function runTest() {
    const options = new chrome.Options();
    options.addArguments('--headless');

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        await driver.get(randomPage);
        await checkCurrentPage(driver);
    } finally {
        await driver.quit();
    }
}

runTest();
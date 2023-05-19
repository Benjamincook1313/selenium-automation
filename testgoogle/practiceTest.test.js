const { By, Builder, Browser, until, Key } = require("selenium-webdriver");

let driver;

// Build a new driver for each test
beforeAll(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

// Quit a driver after each test
afterAll(async () => {
  await driver.quit();
});

describe("Test the Google homepage", () => {
  test("can search Google for 'Selenium'", async () => {
    // Navigate to google.com
    await driver.get("https://www.google.com/");

    // Locate the search bar and send the search term to it
    await driver.findElement(By.name("q")).sendKeys("selenium", Key.RETURN);
    // Wait until the title of the page changes to include the search term
    const title = await driver.getTitle();

    expect(title).toContain("selenium - Google Search");
  });
  test("search for puppies", async () => {
    await driver.findElement(By.name("q")).clear();
    await driver.findElement(By.name("q")).sendKeys("Puppies", Key.RETURN);
    await driver.wait(until.titleIs("Puppies - Google Search"), 1000);
    await driver.findElement(By.className("zItAnd")).click();
    const image = await driver.findElement(By.xpath("//span[contains(text(), 'Puppies')]"));
    expect(image).toBeTruthy();
  });
});


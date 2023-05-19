const { Builder, Browser, By, until, Key } = require("selenium-webdriver");

let driver;

beforeAll(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

afterAll(async () => {
  await driver.quit();
});

const movie = "Guardians of The Galaxy";

describe("Basic functionality of Movie List App", () => {
  it("Add Movie to list", async () => {
    await driver.get("http://localhost:3000/");
    await driver.findElement(By.name("movieTitle")).sendKeys(movie, Key.RETURN);
    const displayed = await driver.findElement(By.xpath(`//li/label[text()="${movie}"]`)).getText();
    expect(displayed).toBe(movie);
    await driver.sleep(3000);
  });

  it("Marks movie as watched", async () => {
    const checkBox = await driver.findElement(By.xpath(`//label[text()="${movie}"]/preceding-sibling::input`)).click();
    const checked = await driver.findElement(By.id("message")).getText();
    expect(checked).toBe(`Watched ${movie}`);
  });

  it("Removes movie", async () => {
    await driver.findElement(By.xpath(`//label[text()="${movie}"]/following-sibling::button`)).click();
    const removed = await driver.findElement(By.id("message")).getText();
    expect(removed).toBe(`${movie} deleted!`);
  });
  
});
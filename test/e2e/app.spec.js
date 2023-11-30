import { ClassicRunner, Configuration, Eyes, RectangleSize } from "@applitools/eyes-selenium";
import express from "express";
import { after, before, describe, it } from "mocha";
import path from "path";
import webdriver from "selenium-webdriver";

const PORT = 9090;

const {By, until} = webdriver;

async function multiply42By2(driver) {
  const digit4Element = await driver.findElement(By.css(".digit-4"));
  const digit2Element = await driver.findElement(By.css(".digit-2"));
  const operatorMultiply = await driver.findElement(By.css(".operator-multiply"));
  const operatorEquals = await driver.findElement(By.css(".operator-equals"));

  await digit4Element.click();
  await digit2Element.click();
  await operatorMultiply.click();
  await digit2Element.click();
  await operatorEquals.click();
}

describe("Calculator app", function () {
  let driver;
  let server;

  this.timeout(60000);

  before((done) => {
    const app = express();

    app.use("/", express.static(path.resolve(__dirname, "../../dist")));

    server = app.listen(PORT, done);
  });

  after(() => {
    server.close();
  });

  beforeEach(async () => {
    driver = new webdriver.Builder()
      .forBrowser("chrome")
      .build();

    await driver.manage().setTimeouts({implicit: 10000});

    await driver.get(`http://localhost:${PORT}`);
  });

  afterEach(async () => await driver.quit());

  it("should work (when tested with Selenium Webdriver)", async function () {
    await driver.wait(until.titleIs("Calculator"));

    const DisplayElement = await driver.findElement(By.css(".Display"));

    await driver.wait(until.elementTextIs(DisplayElement, "0"));

    await multiply42By2(driver);

    await driver.wait(until.elementTextIs(DisplayElement, "84"));
  });

  describe("visual testing", () => {
    // ...
  });
});

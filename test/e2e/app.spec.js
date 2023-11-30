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
    let eyes;
    let runner;
    let config;

    before(async () => {
      const applitoolsApiKey = process.env.APPLITOOLS_API_KEY;

      runner = new ClassicRunner();
      config = new Configuration();

      config.setApiKey(applitoolsApiKey);
    });

    beforeEach(async function () {
      eyes = new Eyes(runner);

      eyes.setConfiguration(config);

      await eyes.open(driver, "Calculator App", "Tests", new RectangleSize(1200, 600));
    });

    afterEach(async function () {
      /*
       * Close Eyes to tell the server it should display the results.
       * Warning: `eyes.closeAsync()` will NOT wait for visual checkpoints to complete.
       * You will need to check the Eyes Test Manager for visual results per checkpoint.
       * Note that "unresolved" and "failed" visual checkpoints will not cause the Mocha test to fail.
       *
       * If you want the test to wait synchronously for all checkpoints to complete, then use `eyes.close()`.
       * If any checkpoints are unresolved or failed, then `eyes.close()` will make the test fail.
       * TODO: `eyes.close()` does not work. Why?
       */
      await eyes.closeAsync();
      // eyes.close();
    });

    after(async () => {
      const allTestResults = await runner.getAllTestResults();

      console.log(allTestResults._summary);
    });

    it("should look good (when tested with Applitools)", async function () {
      await eyes.checkWindow("Landing page");

      await multiply42By2(driver);

      await eyes.checkWindow("After calculating 42 * 2 =");
    });
  });
});

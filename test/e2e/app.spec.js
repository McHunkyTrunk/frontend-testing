import { ClassicRunner, Configuration, Eyes, RectangleSize } from "@applitools/eyes-selenium";
import express from "express";
import { after, before, describe, it } from "mocha";
import path from "path";
import webdriver from "selenium-webdriver";

const PORT = 9090;

const {By, until} = webdriver;

async function multiply42By2(driver) {
  // TODO (Hint: Find buttons by their css or class name and click them.)
  // const digit4Element = await ...
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
    // TODO (Hint: Use `driver.wait(...)` and `until.titleIs(...)` / `until.elementTextIs(...)` wait conditions.)
  });

  describe("visual testing", () => {
    // ...
  });
});

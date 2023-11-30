import chai, { expect } from "chai";
import chaiJestSnapshot from "chai-jest-snapshot";
import { JSDOM } from "jsdom";
import { after, before, describe, it } from "mocha";
import React from "react";
import ReactDOM from "react-dom";
import TestRenderer from "react-test-renderer";

import Calculator from "../../src/js/components/Calculator";
import Display from "../../src/js/components/Display";
import Keypad from "../../src/js/components/Keypad";

chai.use(chaiJestSnapshot);

before(function () {
  chaiJestSnapshot.resetSnapshotRegistry();
});

beforeEach(function () {
  chaiJestSnapshot.configureUsingMochaContext(this);
});

describe("Calculator component", function () {
  before(function () {
    global.window = new JSDOM(`
      <!doctype html>
      <html>
        <body>
          <div id="container"/></div>
        </body>
      </html>
    `).window;

    global.document = window.document;
  });

  after(function () {
    delete global.window;
    delete global.document;
  });

  it("should work (when tested with React DOM)", function () {
    ReactDOM.render(<Calculator />, document.getElementById("container"));

    const displayElement = document.querySelector(".Display");

    expect(displayElement.textContent).to.equal("0");

    // TODO (Hint: Find and click buttons and check the display again.)
    // const buttons = [...]
    // ...
    // expect ...
  });

  it("should work and match snapshots (when tested with React Test Reanderer)", function () {
    const component = TestRenderer.create(<Calculator />);

    expect(component.toJSON()).to.matchSnapshot();

    const root = component.root;

    // TODO (Hints: a) Find buttons, click/act on them, check snapshots; b) text elements have a string as the only
    // child.) const KeypadElement = ... const buttons = [...] TestRenderer.act(...) expect ...
  });
});

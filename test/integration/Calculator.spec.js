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

    const digit4Element = document.querySelector(".digit-4");
    const digit2Element = document.querySelector(".digit-2");
    const operatorMultiply = document.querySelector(".operator-multiply");
    const operatorEquals = document.querySelector(".operator-equals");

    digit4Element.click();
    digit2Element.click();
    operatorMultiply.click();
    digit2Element.click();
    operatorEquals.click();

    expect(displayElement.textContent).to.equal("84");
  });

  it("should work and match snapshots (when tested with React Test Reanderer)", function () {
    const component = TestRenderer.create(<Calculator />);

    expect(component.toJSON()).to.matchSnapshot();

    const KeypadElement = component.root.findByType(Keypad);

    // manually trigger some clicks on digits
    TestRenderer.act(() => KeypadElement.findByProps({"data-digit": "1"}).props.onClick());
    TestRenderer.act(() => KeypadElement.findByProps({"data-digit": "3"}).props.onClick());
    TestRenderer.act(() => KeypadElement.findByProps({"data-digit": "3"}).props.onClick());
    TestRenderer.act(() => KeypadElement.findByProps({"data-digit": "7"}).props.onClick());

    // re-rendering
    expect(component.toJSON()).to.matchSnapshot();

    // manually trigger a calculation
    TestRenderer.act(() => KeypadElement.findByProps({"data-operator": "/"}).props.onClick());
    TestRenderer.act(() => KeypadElement.findByProps({"data-digit": "7"}).props.onClick());
    TestRenderer.act(() => KeypadElement.findByProps({"data-operator": "="}).props.onClick());

    // re-rendering
    expect(component.toJSON()).to.matchSnapshot();

    const DisplayElement = component.root.findByType(Display);
    const valueElement = DisplayElement.findByProps({"data-testid": "Display__value"});

    expect(valueElement.children[0]).to.equal("191");
  });
});

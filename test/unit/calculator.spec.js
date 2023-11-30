import { expect } from "chai";
import { describe, it } from "mocha";

import { INITIAL_STATE } from "../../src/js/config";
import { calculateNextState } from "../../src/js/helpers/calculator";

/*
const INITIAL_STATE = {
  currentValue: "0",
  initial: true,
  previousValue: undefined,
  operator: undefined,
};
 */

describe("calculator", function () {
  const stream = (characters, calculatorState = INITIAL_STATE) =>
    characters
      ? stream(characters.slice(1), calculateNextState(calculatorState, characters[0]))
      : calculatorState;

  it("should show initial value '0'", () => {
    expect(INITIAL_STATE.currentValue).to.equal("0");
  });

  it("should replace 0 in initial state", () => {
    expect(stream("4").currentValue).to.equal("4");
  });

  it("should add a digit if not in initial state", () => {
    expect(stream("34").currentValue).to.equal("34");
  });

  it("should not change value if operator appears", () => {
    expect(stream("3+").currentValue).to.equal("3");
  });

  it("should change value to digit when digit appears after operator", () => {
    expect(stream("37+4").currentValue).to.equal("4");
  });

  it("should compute 37+42= to be 79", () => {
    expect(stream("37+42=").currentValue).to.equal("79");
  });

  it("should compute another expression after \"=\"", () => {
    expect(stream("1+2=4*5=").currentValue).to.equal("20");
  });

  it("should enabling using computation result in next computation", () => {
    expect(stream("1+2=*5=").currentValue).to.equal("15");
  });

  it("second operator is also an equal", () => {
    expect(stream("1+2*").currentValue).to.equal("3");
  });

  it("second operator is also an equal but it can continue after that", () => {
    expect(stream("1+2*11=").currentValue).to.equal("33");
  });

  it("+42= should compute to 42", () => {
    expect(stream("+42=").currentValue).to.equal("42");
  });

  it("*42= should compute to 0", () => {
    expect(stream("*42=").currentValue).to.equal("0");
  });

  it("47-48= should compute to -1", () => {
    expect(stream("47-48=").currentValue).to.equal("-1");
  });

  it("8/2= should compute to 4", () => {
    expect(stream("8/2=").currentValue).to.equal("4");
  });

  it("...", () => {
    // TODO test 9
  });

  it("...", () => {
    // TODO test 10
  });

  it("...", () => {
    // TODO test 11
  });

  it("...", () => {
    // TODO test 12
  });
});

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

  it("...", () => {
    // TODO test 2
  });

  it("...", () => {
    // TODO test 3
  });

  it("...", () => {
    // TODO test 4
  });

  it("...", () => {
    // TODO test 5
  });

  it("...", () => {
    // TODO test 6
  });

  it("...", () => {
    // TODO test 7
  });

  it("...", () => {
    // TODO test 8
  });

  it("...", () => {
    // TODO test 9
  });
});

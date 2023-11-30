/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { cleanup, fireEvent, render } from "@testing-library/react";
import Calculator from "../../../src/js/components/Calculator";

afterEach(cleanup);

describe("Calculator component", () => {
  it("should display reset button", () => {
    // TODO (Hint: Find element and use a matcher.)
    // const element = ...
    // expect ...
  });

  it("should display '42'", () => {
    // TODO (Hint: Find and click buttons and use a matcher.)
    // const buttons = [...]
    // ...
    // expect ...
  });
});

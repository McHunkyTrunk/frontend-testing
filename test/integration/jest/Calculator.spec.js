/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { cleanup, fireEvent, render } from "@testing-library/react";
import Calculator from "../../../src/js/components/Calculator";

afterEach(cleanup);

describe("Calculator component", () => {
  it("should display reset button", () => {
    const {getByTestId} = render(<Calculator />);

    expect(getByTestId("Keypad__operator-reset")).toBeVisible();
  });

  it("should display values", () => {
    const {getByTestId} = render(<Calculator />);

    fireEvent.click(getByTestId("Keypad__digit-4"));
    fireEvent.click(getByTestId("Keypad__digit-2"));

    expect(getByTestId("Display__value")).toHaveTextContent("42");
  });
} );

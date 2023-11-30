import React from "react";

const Keypad = ({onKey}) => {
  const renderNumber = digit => (
    <td
      onClick={() => onKey(digit)}
      className={`digit digit-${digit}`}
      data-digit={digit}
      data-testid={`Keypad__digit-${digit}`}
    >
      {digit}
    </td>
  );

  const renderOperator = (operator, name) => (
    <td
      onClick={() => onKey(operator)}
      className={`operator operator-${name}`}
      data-operator={operator}
      data-testid={`Keypad__operator-${name}`}
    >
      {operator}
    </td>
  );

  return (
    <table className="Keypad" data-testid="Keypad">
      <tbody>
        <tr>
          {renderNumber("7")}
          {renderNumber("8")}
          {renderNumber("9")}
          {renderOperator("+", "plus")}
        </tr>

        <tr>
          {renderNumber("4")}
          {renderNumber("5")}
          {renderNumber("6")}
          {renderOperator("-", "subtract")}
        </tr>

        <tr>
          {renderNumber("1")}
          {renderNumber("2")}
          {renderNumber("3")}
          {renderOperator("*", "multiply")}
        </tr>

        <tr>
          {renderOperator("C", "reset")}
          {renderNumber("0")}
          {renderOperator("=", "equals")}
          {renderOperator("/", "divide")}
        </tr>
      </tbody>
    </table>
  );
};

export default Keypad;

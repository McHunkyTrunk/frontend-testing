import React, { useState } from "react";

import { INITIAL_STATE } from "../config";
import { calculateNextState } from "../helpers/calculator";

import Display from "./Display";
import Keypad from "./Keypad";

const Calculator = () => {
  const [state, setState] = useState(INITIAL_STATE);

  return (
    <div className="Calculator">
      <Display mainValue={state.currentValue} secondaryValue={state.previousValue} />
      <Keypad onKey={key => setState(calculateNextState(state, key))} />
    </div>
  );
};

export default Calculator;

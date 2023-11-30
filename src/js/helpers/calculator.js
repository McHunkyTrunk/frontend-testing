import { INITIAL_STATE } from "../config";

const SIGN = {
  EQUAL: "=",
  RESET: "C",
};

const OPERATOR = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

const isDigit = character => character >= "0" && character <= "9";
const isOperator = character => !!OPERATOR[character];
const isEqualSign = character => character === SIGN.EQUAL;
const isResetSign = character => character === SIGN.RESET;

export const calculateNextState = (currentState, character) => {
  if (isDigit(character)) {
    return processDigit(currentState, character);
  }

  if (isOperator(character)) {
    return processOperator(currentState, character);
  }

  if (isEqualSign(character)) {
    return computeResult(currentState);
  }

  if (isResetSign(character)) {
    return reset();
  }

  return currentState;
};

const processDigit = (state, character) => {
  if (state.initial) {
    return Object.assign({}, state, {
      currentValue: character,
      initial: false,
      previousValue: parseInt(state.currentValue),
    });
  }

  return Object.assign({}, state, {
    currentValue: state.currentValue + character,
  });
};

const processOperator = (state, character) => {
  if (!state.operator || state.initial) {
    return Object.assign({}, state, {
      operator: character,
      initial: true,
    });
  }

  return Object.assign({}, computeResult(state), {
    operator: character,
  });
};

const computeResult = state => {
  if (state.operator) {
    return {
      currentValue: OPERATOR[state.operator](state.previousValue, parseInt(state.currentValue)).toString(),
      initial: true,
    };
  }

  return Object.assign({}, state, {initial: true});
};

const reset = () => INITIAL_STATE;

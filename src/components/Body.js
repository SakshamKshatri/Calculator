/* eslint-disable default-case */
import React, { useReducer } from "react";
import "../styles/body.css";

import DigitButton from "./DigitButton.js";
import OperationButton from "./OperationButton.js";
import ClearButton from "./ClearButton.js";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  DELETE: "delete",
  CHOOSE_OPERATION: "choose-operation",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  // eslint-disable-next-line default-case
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (state.currentOperand === "0" && payload.digit === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand === null) {
        return null;
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };

    case ACTIONS.CLEAR:
      return {};
  }
}

// doing the actual math
const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(previous) || isNaN(current)) return "";

  let calculation = "";

  switch (operation) {
    case "+":
      calculation = previous + current;
      break;
    case "-":
      calculation = previous - current;
      break;
    case "x":
      calculation = previous * current;
      break;
    case "/":
      calculation = previous / current;
      break;
  }

  return calculation.toString();
};

const Body = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calculator">
      <div class="display">
        <div className="previous-value">
          {previousOperand} {operation}{" "}
        </div>
        <div className="current-value">{currentOperand}</div>
      </div>
      <div className="keypad">
        <DigitButton className="button" dispatch={dispatch} digit={7} />
        <DigitButton className="button" dispatch={dispatch} digit={8} />
        <DigitButton className="button" dispatch={dispatch} digit={9} />
        <ClearButton className="button clear" dispatch={dispatch} />
        <DigitButton className="button" dispatch={dispatch} digit={4} />
        <DigitButton className="button" dispatch={dispatch} digit={5} />
        <DigitButton className="button" dispatch={dispatch} digit={6} />
        <OperationButton className="button" operation="+" dispatch={dispatch} />
        <DigitButton className="button" dispatch={dispatch} digit={1} />
        <DigitButton className="button" dispatch={dispatch} digit={2} />
        <DigitButton className="button" dispatch={dispatch} digit={3} />
        <OperationButton className="button" operation="-" dispatch={dispatch} />

        <DigitButton className="button" dispatch={dispatch} digit={0} />

        <DigitButton className="button" dispatch={dispatch} digit={"."} />

        <button
          className="button equals"
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </button>
        <OperationButton className="button" operation="/" dispatch={dispatch} />
        <OperationButton className="button" operation="x" dispatch={dispatch} />
      </div>
    </div>
  );
};

export default Body;

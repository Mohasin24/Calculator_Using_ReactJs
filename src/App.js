import { useReducer } from 'react';
import DigitButton from './component/DigitButton';
import OperationButton from './component/OperationButton';
import './app.css'

export const ACTIONS = {
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "operation",
  EVALUATE: "evaluate"
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:

      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }

      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === '.' && state.currentOperand.includes('.')) {
        return state
      }

      return {

        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }

    case ACTIONS.CHOOSE_OPERATION:

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.perform
        }
      }

      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          operation: payload.perform,
          currentOperand: null
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.perform,
        currentOperand: null
      }
    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.DELETE_DIGIT:

      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: ""
        }
      }

      if (state.currentOperand == null) {
        return state
      }

      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null
        }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }

    case ACTIONS.EVALUATE:
      if (state.operation == null || state.previousOperand == null || state.currentOperand == null) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        currentOperand: evaluate(state),
        previousOperand: null,
        operation: null
      }
  }
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

const formateOperand = (operand) => {
  if (operand == null) {
    return
  }

  const [integer, decimal] = operand.split(".")

  if (decimal == null) {
    return INTEGER_FORMATTER.format(integer)
  }

  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

const evaluate = (state) => {
  const prev = parseFloat(state.previousOperand)
  const curr = parseFloat(state.currentOperand)
  let computation = ""

  if (isNaN(prev) || isNaN(curr)) {
    return ""
  }

  switch (state.operation) {
    case "+":
      computation = curr + prev
      break;

    case "-":
      computation = curr - prev
      break;

    case "/":
      computation = curr / prev
      break;

    case "*":
      computation = curr * prev
      break;
  }

  return computation.toString()
}

function App() {

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

  return (
    <div className="calculator-grid">

      <div className="output">
        <div className="prev-operand">{formateOperand(previousOperand)} {operation}</div>
        <div className="curr-operand">{formateOperand(currentOperand)}</div>
      </div>

      <button className="span-two" onClick={
        () => dispatch(
          {
            type: ACTIONS.CLEAR
          })
      }
      >
        AC
      </button>
      <button onClick={
        () => {
          dispatch({ type: ACTIONS.DELETE_DIGIT })
        }
      } >DEL</button>
      <OperationButton dispatch={dispatch} perform="/" />

      {/* <button onClick={()=> dispatch({type : ACTIONS.ADD_DIGIT, payload:"1"})}>1</button> */}
      <DigitButton dispatch={dispatch} digit="1" />
      <DigitButton dispatch={dispatch} digit="2" />
      <DigitButton dispatch={dispatch} digit="3" />
      <OperationButton dispatch={dispatch} perform="*" />


      <DigitButton dispatch={dispatch} digit="4" />
      <DigitButton dispatch={dispatch} digit="5" />
      <DigitButton dispatch={dispatch} digit="6" />
      <OperationButton dispatch={dispatch} perform="+" />

      <DigitButton dispatch={dispatch} digit="7" />
      <DigitButton dispatch={dispatch} digit="8" />
      <DigitButton dispatch={dispatch} digit="9" />
      <OperationButton dispatch={dispatch} perform="-" />

      <DigitButton dispatch={dispatch} digit="." />
      <DigitButton dispatch={dispatch} digit="0" />
      <button className="span-two"
        onClick={() => {
          dispatch({ type: ACTIONS.EVALUATE })
        }}
      >=</button>

    </div>
  );
}

export default App;
import { useReducer } from "react";
import "./app.css";
import DigitButton from "./component/DigitButton";
import OperationButton from "./component/OperationButton";

export const ACTIONS = {
  ADD_DIGIT : "add-digit",
  CHOOSER_OPERATION : "choose-operation",
  CLEAR : "clear",
  DELETE_DIGIT : "delete-digit",
  EVALUATE : "evaluate"
}

function reducer(state, {type, payload}) 
{
  switch(type)
  {
    case ACTIONS.ADD_DIGIT : 
      return {
        ...state,
        currentOperand : `${state.currentOperand || ""}${payload}`
      };
    case ACTIONS.CHOOSER_OPERATION : 
      return {
        ...state,
        currentOperand : `${state.currentOperand || ""}${payload}`
      };
  }
}

function App() 
{
  const [{currentOperand,previousOperand,operation}, dispatch] = useReducer(reducer, {});
  
  return (
    
    <div className="calculator-grid">

      {/* display output */}
      <div className="output">
        <div className="prev-operand">{previousOperand} {operation}</div>
        <div className="curr-operand">{currentOperand}</div>
      </div>

      {/* buttons */}
      <button className="span-two" >AC</button>
      <button>DEL</button>
      <OperationButton operation="/" dispatch={dispatch}/>

      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>

      <OperationButton operation="+" dispatch={dispatch}/>

      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>

      <OperationButton operation="*" dispatch={dispatch}/>

      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>

      <OperationButton operation="-" dispatch={dispatch}/>

      <DigitButton digit="." dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>

      <button className="span-two">=</button>

    </div>
  );
}

export default App;

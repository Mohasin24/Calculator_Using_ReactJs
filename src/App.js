import { useReducer } from "react";
import "./app.css";

const ACTIONS = {
  ADD_DIGIT : "add-digit",
  CHOOSER_OPERATION : "choose-operation",
  CLEAR : "clear",
  DELETE_DIGIT : "delete-digit",
  EVALUATE : "evaluate"
}

function reducer(state, {type, payload}) 
{
  
}

function App() 
{
  const [{currentOperand,previousOperand,operation}, dispatch] = useReducer(reducer, {})

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
      <button>/</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>+</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className="span-two">=</button>

    </div>
  );
}

export default App;

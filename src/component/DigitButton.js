import { ACTIONS } from "../App"

export default function DigitButton(props)
{
    // {dispatch,digit}
    return (
        <button
            onClick={()=>
                {   
                    props.dispatch({type : ACTIONS.ADD_DIGIT, payload : props.digit})  
                }
            }
        >
        {props.digit}
        </button>
    )
}
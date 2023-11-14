import { ACTIONS } from "../App"

export default function OperationButton({dispatch,perform})
{
    return(
        <button
            onClick={()=>
                {   
                    dispatch({type : ACTIONS.CHOOSE_OPERATION, payload : {perform}})  
                }
            }
        >
        {perform} 
        </button>
    )
}
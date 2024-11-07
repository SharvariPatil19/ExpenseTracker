import React from "react";
import { useEffect } from "react";
import {useSelector,useDispatch} from 'react-redux'
import { fetchExpenses,deleteExpense } from "../features/expenseSlice";
function ExpenseList(){
  const dispatch=useDispatch();
  const expenses=useSelector((state)=>state.expenses.expenses);
  const status=useSelector((state)=>state.expenses.status);
  const error=useSelector((state)=>state.expenses.error);

  useEffect(() => {
    if(status==='idle')
    {
      dispatch(fetchExpenses());
    }
  },[status,dispatch]);

  const handleDelete=(id)=>{
    dispatch(deleteExpense(id));
  }

  if(status==='loading') return <p>Loading...</p>;
  if(error) return <p>Error...{error}</p>;

    return(
        <div>
             <p className="text-center">List of expenses:</p>
             <ul>
            {expenses.map((expense)=>(
                <li key={expense._id}>
                    <span>{expense.description}-${expense.amount} ({expense.type})</span>
                    <button id='del' onClick={()=>handleDelete(expense._id)}>Delete</button>

                </li>
            ))}
        </ul>
        </div>
        
    );
}

export default ExpenseList;
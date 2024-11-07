import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {fetchExpenses,calculateSummary } from "../features/expenseSlice";

function ExpenseSummary()
{
    const dispatch=useDispatch();
    const {totalincome,totalexpense}=useSelector((state)=>state.expenses.summary);
  
    const status=useSelector((state)=>state.expenses.status);

    useEffect(()=>{
        if(status==='idle')
            dispatch(fetchExpenses());
        else
            dispatch(calculateSummary());
    },[dispatch,status]);
    return(
        <div>
        <h3>Balance: {totalincome-totalexpense}</h3>
        <h3>Income: {totalincome}</h3>
        <h3>Expenses: {totalexpense}</h3>
        </div>
    );
}

export default ExpenseSummary;
import React,{ useState,useEffect } from 'react'
import Expense from './components/Expense'
import ExpenseList from './components/ExpenseList'
import ExpenseSummary from './components/ExpenseSummary'
import axios from 'axios'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([]);

  

  useEffect(()=>{
    fetchexpenses();
  },[]);

  const fetchexpenses=async()=>{
    try{
      const response=await axios.get('/api/expenses')
      setExpenses(Array.isArray(response.data) ? response.data : []);

    }catch(error)
    {
      console.log(error);
      setExpenses([]);
    }
  };

  return (
    <>
      <div>
        <h1>Expense Tracker</h1>
        <ExpenseSummary/>
        <Expense /> 
        <ExpenseList/>
     </div>
    </>
  );
}

export default App;

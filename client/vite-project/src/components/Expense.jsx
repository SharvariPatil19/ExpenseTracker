import React,{useState} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addExpense } from '../features/expenseSlice';

function Expense()
{
    const dispatch=useDispatch();
    const [formdata,setFormdata]=useState(
        {
            amount:'',
            type:'expense',
            description:'',
            data:''
        }
    );

    const handleChange=(e)=>{
        const { name, value } = e.target;
        setFormdata((prevData)=>({...prevData,[name]:value}));
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(addExpense(formdata));
    };

    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type='number' name='amount' value={formdata.amount} placeholder='Enter Amount' onChange={handleChange} required/>
            <label>Select the expense type:<select name='type' value={formdata.type} onChange={handleChange}>
            <option value='expense'>Expense</option>
            <option value='income'>Income</option>
            </select>
            </label>
            <input type='text' value={formdata.description} name='description' placeholder='Description' onChange={handleChange}/>
            <button type="submit">Add</button>
        </form>
        </>
    );
}

export default Expense;


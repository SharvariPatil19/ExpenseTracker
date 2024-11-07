import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchExpenses=createAsyncThunk('expenses/fetchExpenses',async()=>{
    const response=await axios.get('/api/expenses');
    return response.data;
});

export const addExpense=createAsyncThunk('expenses/addExpense',async(expenseData)=>{
    const response=await axios.post('/api/expenses',expenseData);
    return response.data;
});

export const deleteExpense=createAsyncThunk('expenses/deleteExpense',async(id)=>{
    await axios.delete(`/api/expenses/${id}`);
    return id;
})

const expenseSlice=createSlice({
    name:"expenses",
    initialState:{
        expenses:[],
        status:'idle',
        error:null,
        summary:{
            totalincome:0,
            totalexpense:0
        }
    },
    reducers:{
        calculateSummary(state){
            const {totalexpense,totalincome}=state.expenses.reduce(
                (acc,expense)=>{
                    if(expense.type==='income')
                        acc.totalincome+=expense.amount;
                    else
                        acc.totalexpense+=expense.amount;
                    return acc;
                },
                {totalexpense:0,totalincome:0}
            );
            state.summary={totalincome,totalexpense};
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchExpenses.pending,(state)=>{
            state.status='loading';
        })
        .addCase(fetchExpenses.fulfilled,(state,action)=>{
            state.status='fulfilled';
            state.expenses=action.payload;
            expenseSlice.caseReducers.calculateSummary(state);
        })
        .addCase(fetchExpenses.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(addExpense.pending, (state) => {
            state.status = 'loading';
          })
        .addCase(addExpense.fulfilled, (state, action) => {
            state.expenses.push(action.payload);
            state.status = 'fulfilled';
            expenseSlice.caseReducers.calculateSummary(state);
        })
        .addCase(addExpense.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
        .addCase(deleteExpense.fulfilled,(state,action)=>{
            state.expenses=state.expenses.filter(expense=>expense._id!==action.payload);
            expenseSlice.caseReducers.calculateSummary(state);
        });
    }

})

export const{calculateSummary}=expenseSlice.actions;
export default expenseSlice.reducer;

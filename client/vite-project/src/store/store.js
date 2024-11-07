import {configureStore} from '@reduxjs/toolkit';
import expenseReducer  from '../features/expenseSlice';

const store=configureStore({
    reducer:{
        expenses:expenseReducer,
    }
})
export default store;
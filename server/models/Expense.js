import { Schema, model } from 'mongoose';

const ExpenseSchema = new Schema({
    amount: { type: Number, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    description: {type:String,default:''},
    date: { type: Date, default: Date.now },
});

export default model('Expense', ExpenseSchema);

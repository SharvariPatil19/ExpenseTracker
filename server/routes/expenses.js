import { Router } from 'express';
import Expense from '../models/Expense.js';
const router = Router();

// Add new expense/income
router.post('/', async (req, res) => {
    try {
        const expense = new Expense(req.body);
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const expense=await Expense.findByIdAndDelete(req.params.id);
        if(!expense) return res.status(404).json({message:'Expense not found'});
        res.json({message:'Expense deleted successfully'});
    }
    catch(error)
    {
        res.status(500).json({message:error.message});
    }
})


export default router;

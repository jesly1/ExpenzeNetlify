import { prisma } from './database.server';
interface ExpenseData {
  title: string;
  amount: number | string;
  date: string | Date;
}
export async function addExpense(expenseData: ExpenseData,userId:string): Promise<void> {
  try {
    await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount, 
        date: new Date(expenseData.date),
        User:{connect:{id:userId}}
      },
    });
  } catch (e) {
    console.error('Error adding expense:', e);
    throw e; 
  }
}
export async function getExpenses(userId:string): Promise<ExpenseData[]> {
  if(!userId) throw new Response ('failed to get expenses')
  try {
    const expenses = await prisma.expense.findMany({
      where:{userId:userId},
      orderBy: { date: 'desc' },
    });
    return expenses;
  } catch (err) {
    console.log(err);
    throw err; 
  }
}
export async function getExpensebyId(id: string): Promise<ExpenseData | null> {
  try {
    const expense = await prisma.expense.findFirst({
      where: { id: id },
    });
    console.log("expense",expense);
    
    return expense;
  } catch (err) {
    console.log(err);
    throw err; 
  }
}
export async function Updateexpenses(id: string, data: ExpenseData): Promise<ExpenseData> {
  try {
    const expense = await prisma.expense.update({
      where: { id: id },
      data: {
        title: data.title,
        amount: +data.amount, 
        date: new Date(data.date),
      },
    });
    return expense;
  } catch (err) {
    console.log(err);
    throw err; 
  }
}
export async function Deleteexpenses(id: string): Promise<void> {
  try {
    await prisma.expense.delete({
      where: { id: id },
    });
  } catch (err) {
    console.error('Error deleting expense:', err);
    throw err;
  }
}

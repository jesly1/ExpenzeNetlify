import React from 'react';
import ExpenseForm from '../components/expenses/ExpenseForm';
import Modal from '../components/util/Modal';
import { redirect, useNavigate } from '@remix-run/react';
import { addExpense } from '../data/expenses.server';
import { ActionFunction } from '@remix-run/node';
import { validateExpenseInput } from '../data/validation.server';
import { requireUserSession } from '../data/auth.server';
const AddExpenses:React.FC=()=> {
  const navigate=useNavigate()
  function closehandler(){
    navigate('..')
    // navigate('/expenses')
  }
  return (
    <div>
      <Modal onClose={closehandler}>
      <ExpenseForm/>
      </Modal>
    </div>
  )
}
export const action: ActionFunction = async ({ request }) => {
const userid=await requireUserSession(request)
  console.log("inside action")
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData) as {
    title: string;
    amount: string;
    date: string;
  };
  console.log("Expense Data:", expenseData);
  try {
    console.log("inside try");
    try{
      validateExpenseInput(expenseData)
    }catch(e){
      return e
    }
    await addExpense(expenseData,userid);
  } catch (error) {
    console.error("Error adding expense:", error);
    return { message: "There was an error adding the expense." };
  }
  return redirect("/expenses");
};
// export async function action({request}){
// const formdata=await  request.formData()
// const expenseData=Object.fromEntries(formdata)
// console.log(expenseData,formdata);
//   addExpense(expenseData)
// }
export default AddExpenses

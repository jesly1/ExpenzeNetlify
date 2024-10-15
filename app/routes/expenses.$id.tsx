import React from "react";
import ExpenseForm from "../components/expenses/ExpenseForm";
import Modal from "../components/util/Modal";
import { redirect, useLoaderData, useNavigate,  } from "@remix-run/react";
import { Deleteexpenses, getExpensebyId, Updateexpenses } from "../data/expenses.server";
import { validateExpenseInput } from "../data/validation.server";

// Type for expense data (you can refine this based on your actual data)

interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
}
const ViewExpenses: React.FC = () => {
  const navigate = useNavigate();
  const expense = useLoaderData<Expense>();
  console.log("expense inside child route is",expense);
  function closehandler() {
    navigate("..");
  }
  return (
    <div>
      <Modal onClose={closehandler}>
        <ExpenseForm/>
      </Modal>
    </div>
  );
};

// Loader to fetch expense data by id
export async function loader({ params }: { params: { id: string } }) {
  console.log("insideeee loaderrrrr");
  
  const id = params.id;
  const data = await getExpensebyId(id);
  if (!data) {
    throw new Response("Expense not found", { status: 404 });
  }
  return data;
}
export async function action({ params, request }: { params: { id: string }; request: Request }) {
  const expenseId = params.id;
  
  // Get the form data
  const formData = await request.formData();
  
  // Get the method (POST is the actual method, so we need to check for _method)
  const method = formData.get('_method')?.toString() || request.method.toUpperCase();
  console.log(method, "method");
  if (method === 'patch') {
    const expenseData = Object.fromEntries(formData) as {
      title: string;
      amount: string;
      date: string;
    };
    try {
      validateExpenseInput(expenseData); // Validation logic
    } catch (error) {
      if (error instanceof Error) {
        return new Response(JSON.stringify({ message: error.message }), {
          status: 400,
        });
      }
      return new Response(JSON.stringify({ message: "An unknown error occurred" }), {
        status: 400,
      });
    }
    // Update expense in the database
    await Updateexpenses(expenseId, expenseData);
    return redirect("/expenses");

  } else if (formData.get('intent') === 'delete') {
    if (expenseId) { await Deleteexpenses(expenseId) }
    return redirect('/expenses')
  }else if (method=== 'DELETE') {
    if (expenseId) { await Deleteexpenses(expenseId) }
    return redirect('/expenses')
  }
 else{
  return true
}
}
export default ViewExpenses;

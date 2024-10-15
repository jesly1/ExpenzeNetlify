import React from 'react';
import ExpenseStatistics from '../components/expenses/ExpenseStatistics';
import Chart from '../components/expenses/Chart';
import { getExpenses } from '../data/expenses.server';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { requireUserSession } from '../data/auth.server';
interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
}
const ExpenseAnalysis: React.FC = () => {
  const data = useLoaderData() as Expense[];  
  return (
    <div>
      <Chart expenses={data} /> 
      <ExpenseStatistics expenses={data} />
    </div>
  );
};

//can use usematches also
export async function loader({ request }: LoaderFunctionArgs) {
  const userid = await requireUserSession(request);
  console.log("insideeee loaderrrrr");
  const data = await getExpenses(userid);
  if (!data) {
    throw new Response("Expense not found", { status: 404 });
  }
  return data;
}
export default ExpenseAnalysis;

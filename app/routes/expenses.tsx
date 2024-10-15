import { LinksFunction, LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import React from "react";
import ExpensesList from "../components/expenses/ExpensesList";
import styles from "../styles/expenses.css";
import ExpensesHeader from "../components/navigation/ExpensesHeader";
import { FaDownload, FaPlus } from "react-icons/fa";
import { getExpenses } from "../data/expenses.server";
import { requireUserSession } from "../data/auth.server";
interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
}
const ExpensesLayout: React.FC = () => {
  const expensesData = useLoaderData<Expense[]>();
  const hasExpenses = expensesData && expensesData.length > 0;
  // console.log("any code here will run on frontend also as inside react component");
  return (
    <>
      <main>
        <ExpensesHeader />
        <Outlet />
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expenses</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        {hasExpenses && <ExpensesList expenses={expensesData} />}
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No Expenses Found</h1>
            <h1>
              <Link to="/add">Add Expenses</Link>
            </h1>
          </section>
        )}
      </main>
    </>
  );
};
export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];
export const loader: LoaderFunction = async ({ request }) => {
  const userid = await requireUserSession(request);
  const expenses = await getExpenses(userid);
  return expenses;
};
export default ExpensesLayout;

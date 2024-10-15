import React from 'react';
import ExpenseListItem from './ExpenseListItem';
interface Expense {
  id: string;
  title: string;
  amount: number;
}
interface ExpensesListProps {
  expenses: Expense[];
}
const ExpensesList: React.FC<ExpensesListProps> = ({ expenses }) => {
  return (
    <ol id="expenses-list">
      {expenses.map((expense) => (
        <li key={expense.id}>
          <ExpenseListItem
            id={expense.id}
            title={expense.title}
            amount={expense.amount}
          />
        </li>
      ))}
    </ol>
  );
};

export default ExpensesList;
// <Form method='delete' action={`/expenses/${id}`}>
// <button>Delete</button>
// </Form>
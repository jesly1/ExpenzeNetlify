import { Form, Link } from "@remix-run/react";
import React from "react";
interface ExpenseListItemProps {
  id: string;
  title: string;
  amount: number;
}
const ExpenseListItem: React.FC<ExpenseListItemProps> = ({
  id,
  title,
  amount,
}) => {
  //other than wrapping btn inside a form use usefetcher so tat u dont have to redirect to expensepage
  //thus to have a more optimized approach
  // const fetcher = useFetcher();
  // function deleteExpenseItemHandler() {
  //   console.log("inside delete");
  //   const proceed = confirm("Are you sure you want to delete this item!");
  //   if (!proceed) {
  //     return;
  //   }
  //   fetcher.submit(null, { method: "delete", action: `/expenses/${id}` });
  // }
  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        {/* <button onClick={deleteExpenseItemHandler}>Delete</button> */}
        <Form method="post" action={`/expenses/${id}`}>
          <button type="submit" name="intent" value="delete">
            Delete
          </button>
        </Form>
        {/* <button onClick={deleteExpenseItemHandler}>Delete</button> */}
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
};
export default ExpenseListItem;

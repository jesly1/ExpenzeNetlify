import { Form, Link, useActionData, useLoaderData, useNavigation } from '@remix-run/react';
import React from 'react';
interface ValidationErrors {
  [key: string]: string;
}
interface ExpenseData {
  title: string;
  amount: number;
  date: string;
}

const ExpenseForm: React.FC = () => {
  const today = new Date().toISOString().slice(0, 10);
  const validationErrors = useActionData<ValidationErrors>();
  const navigation = useNavigation();
  const expenseData = useLoaderData<ExpenseData | null>(); 
  console.log('expense data',expenseData);
  
  const formIsSubmitting = navigation.state === 'submitting';
  const defaultValues = {
    title: expenseData?.title || '',
    amount: expenseData ? expenseData.amount.toString() : '',
    date: expenseData?.date?.slice(0, 10) || '',
  };
  return (
    <Form method={expenseData?'patch':'post'} className="form" id="expense-form" >
       {expenseData && <input type="hidden" name="_method" value="patch" />}
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultValues.title}
        />
      </p>
      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValues.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={defaultValues.date}
          />
        </p>
      </div>
      
      {/* Display validation errors */}
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={formIsSubmitting} type="submit">
          {formIsSubmitting ? 'Saving Expense...' : expenseData ? 'Update Expense' : 'Add Expense'}
        </button>
        <Link to="/expenses">Cancel</Link>
      </div>
    </Form>
  );
};

export default ExpenseForm;

import { LoaderFunctionArgs } from "@remix-run/node";
import { requireUserSession } from "../data/auth.server";
import { getExpenses } from "../data/expenses.server";
export async function loader({ request }: LoaderFunctionArgs) {
  const userid = await requireUserSession(request);
  const expenses = await getExpenses(userid);
  if (!expenses) {
    throw new Response("Expenses not found", { status: 404 });
  }
  return expenses;
}

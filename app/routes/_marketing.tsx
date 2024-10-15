import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import React from "react";
import MainHeader from "../components/navigation/MainHeader";
import { getUserfromSession } from "../data/auth.server";
import styles from "../styles/marketing.css";
const expensesLayout: React.FC = () => {
  return (
    <>
      <main>
        <MainHeader />
        <Outlet />
      </main>
    </>
  );
};
export async function loader({ request }: LoaderFunctionArgs){
  console.log("inside loader of marketing route. This is the request object:",request);
  const user= await getUserfromSession(request);
  console.log("userid in route is",user);
  return user ;
}
export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];
export default expensesLayout;

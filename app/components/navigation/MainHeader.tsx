import { Form, NavLink, useLoaderData } from "@remix-run/react";
import React from "react";
import Logo from "../util/Logo";

const MainHeader: React.FC = () => {
  type LoaderData = {
    userId: string | null;
  };
  const userId  = useLoaderData<LoaderData>();
  console.log("userid in frontend", userId);

  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="pricing">Pricing</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <ul>
          <li>
            {userId && (
              <Form method="post" action="/logout">
                <button className="cta-alt">Logout</button>
              </Form>
            )}
            {!userId && (
              <NavLink to="/auth" className="cta">
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;

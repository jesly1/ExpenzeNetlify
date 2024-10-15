import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import React from "react";
import { FaLock, FaUserPlus } from "react-icons/fa";

const AuthForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const authState = searchParams.get("mode") || "login";
  const submitbtncaption = authState === "login" ? "Login" : "CreateUser(SignUp)";
  const togglebtncaption = authState === "login" ? "create a new user" : "Login with existing user";
  const validationErrors = useActionData<string>();
  console.log("validation errors",validationErrors);
  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {authState === "login" ? <FaLock /> : <FaUserPlus />}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      {validationErrors && (
          <p>{validationErrors}</p>
      )}
      <div className="form-actions">
        <button type="submit">{submitbtncaption}</button>
        <Link to={authState === "login" ? "?mode=signup" : "?mode=login"}>
          {togglebtncaption}
        </Link>
      </div>
    </Form>
  );
};
export default AuthForm;

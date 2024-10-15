import { ActionFunction, LinksFunction } from "@remix-run/node";
import React from "react";
import AuthForm from '../components/auth/AuthForm';
import { login, signup } from "../data/auth.server";
import { validateCredentials } from "../data/validation.server";
import styles from '../styles/auth.css';
import { useLoaderData } from "@remix-run/react";
const Auth:React.FC=()=> {
const user=useLoaderData()
console.log("user inside marketingauthpage",user);
  return (
    <div>
     <AuthForm/>
    </div>
  )
}
export const links: LinksFunction = () => [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
  export const action: ActionFunction = async ({ request }) => {
  const searchparams=new URL(request.url).searchParams
  const authmode=searchparams.get('mode')||'login'
    console.log("inside auth action")
    const formData = await request.formData();
    const authData = Object.fromEntries(formData) as {
    email:string,
    password:string
    };
    console.log("Auth Data:", authData);
    try{
      validateCredentials(authData)
    }catch(error){
      return error
    }
    try {
      if (authmode === 'login') {
       return  await login(authData)
      } else {
       return await signup(authData); 
      }
    }catch(error){
      if (error instanceof Error){
        return error.message;
      } else {
        return 'An unknown error occurred';
      }
    }
  };
export default Auth

import { ActionFunctionArgs } from "@remix-run/node";
import { destroyUserfromSession } from "../data/auth.server";

export function action({request}:ActionFunctionArgs){
    if(request.method!=='POST'){
        return {status:400,message:'Invalid request method'};
    }
    return destroyUserfromSession(request)
}
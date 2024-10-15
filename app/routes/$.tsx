import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, useRouteError } from "@remix-run/react";
export function loader({ params }: LoaderFunctionArgs) {
  if (params["*"] === "exp") {
    return redirect("/expenses");
  }
  console.log(params);
  // if we go to http://localhost:5173/abbbb/12/3 we get  abbbb/12/3 as params
  throw new Response("Not Found", { status: 404 });
}
export function ErrorBoundary() {
  const error = useRouteError();
  console.log(error);

  return (
    <main>
      <h1>Unexpected Error</h1>
      {error instanceof Error ? <p>{error.message}</p> : <p>Unknown error occurred</p>}
      <Link to="/"> to safety</Link>
    </main>
  );
}

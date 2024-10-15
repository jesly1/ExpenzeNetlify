import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import styles from "./styles/shared.css?url";
import "./tailwind.css";

// Define global links (CSS files, etc.)
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

// Layout component
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
// Reusable Document component
function Document({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
// App layout with Outlet for nested routes
export default function App() {
  return (
    <Document title="App">
      <Outlet />
    </Document>
  );
}
// CatchBoundary for handling 404/expected errors
// export function CatchBoundary() {
//   const error = useRouteError();
//   const message = error instanceof Error ? error.message : "Page not found";
//   console.log("error.message",message);
//   return <Document title="Error"> 
//   <main>
//        <h1>Erroryyyyyyyyyyyyyyyyyyyyyyyyyyyy</h1>
//        <Error title="Error">
//         <p>{message}</p>
//        </Error>
//        <p>{message}</p>
//        <Link to="/">Back to safety</Link>
//      </main>
//   </Document>
//     // <Document title="Error">
//     //   <main>
//     //     <h1>Erroryyyyyyyyyyyyyyyyyyyyyyyyyyyy</h1>
//     //     <p>{message}</p>
//     //     <Link to="/">Back to safety</Link>
//     //   </main>
//     // </Document>
// }
// ErrorBoundary for handling unexpected errors
// export function ErrorBoundary(){
//   const error = useRouteError();
//   return (
//     // <Document title="Error!">
//       <main>
//         <h1>Unexpected Error</h1>
//         <p>{error instanceof Error ? error.message : "Unknown error occurred."}</p>
//         <Link to="/"> to safety</Link>
//       </main>
//     // </Document>
//   );
// }

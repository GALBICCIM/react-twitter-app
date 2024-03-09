import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import CreateAccount from "./routes/Create-account";
import { Login } from "./routes/Login";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const router = createBrowserRouter([
   {
      path: "/",
      element: <Layout />,
      children: [
         {
            path: "",
            element: <Home />,
         },
         {
            path: "profile",
            element: <Profile />,
         },
      ],
   },
   {
      path: "/login",
      element: <Login />,
   },
   {
      path: "/create-account",
      element: <CreateAccount />,
   },
]);

const GlobalStyle = createGlobalStyle`
   ${reset};
   * {

   }

   body {
      background-color: black;
      color: white;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
   }
`;

const App = () => {
   return (
      <>
         <GlobalStyle />
         <RouterProvider router={router} />
      </>
   );
};

export default App;

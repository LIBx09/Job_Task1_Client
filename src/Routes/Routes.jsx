import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
]);

export default routes;

import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import AddTask from "../Pages/AddTask";
import Home from "../Pages/Home";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/add_task",
        element: <AddTask />,
      },
    ],
  },
]);

export default routes;

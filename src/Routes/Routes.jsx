import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import AddTask from "../Pages/AddTask";
import Home from "../Pages/Home";
import UpdateTask from "../components/UpdateTask";
import Login from "../Social/Login/Login";
import Register from "../Social/Register/Register";
import Banner from "../components/Banner";
import PrivateRoutes from "./PrivateRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Banner />,
      },
      {
        path: "/home",
        element: (
          <PrivateRoutes>
            <Home />
          </PrivateRoutes>
        ),
      },
      {
        path: "/add_task",
        element: (
          <PrivateRoutes>
            <AddTask />
          </PrivateRoutes>
        ),
      },
      {
        path: "/update_task",
        element: (
          <PrivateRoutes>
            <UpdateTask />
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default routes;

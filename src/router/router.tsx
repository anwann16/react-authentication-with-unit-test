import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import ProtectedRoute from "@/components/ProtectedRoute";

const setupRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

export default setupRouter;

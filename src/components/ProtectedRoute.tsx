import { useNavigate } from "react-router-dom";
import { PropsWithChildren, useEffect } from "react";

import { useAuth } from "../context/AuthContext";

type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return children;
};

export default ProtectedRoute;

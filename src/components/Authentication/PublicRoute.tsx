import { Navigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to home if already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

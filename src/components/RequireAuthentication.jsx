import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuthentication = () => {
  const { isLoggedIn, auth } = useAuth();
  console.log("requireauth:" + JSON.stringify(auth));

  return isLoggedIn && auth.role=="admin" ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuthentication;
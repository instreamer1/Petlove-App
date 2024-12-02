import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/userSlice/selectors";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, redirectTo }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
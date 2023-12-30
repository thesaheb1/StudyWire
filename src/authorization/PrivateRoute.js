import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { credentialData } = useSelector((state) => state.auth);

  if (credentialData !== null) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;

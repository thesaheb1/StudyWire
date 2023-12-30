import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RouteForStudents = ({ children }) => {
  const { credentialData } = useSelector((state) => state.auth);
  if (credentialData?.accountType === "Student") {
    return children;
  }
  return <Navigate to="/"/>
};

export default RouteForStudents;

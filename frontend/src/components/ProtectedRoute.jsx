// import React from "react";
// import { useNavigate } from "react-router-dom";

// export const ProtectedRouteElement = ({ component: Component, ...props }) => {
//   return props.loggedIn ? <Component {...props} /> : useNavigate("/sign-in");
// };

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ component: Component, ...props }) => {
  return props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRouteElement;

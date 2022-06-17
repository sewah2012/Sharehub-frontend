import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/authenticate" replace />;
  }
  return children;
};

export default ProtectedRoute;

// import React from "react";
// import { Route, Redirect } from "react-router-dom";

// export const ProtectedRoute = ({ component: Component, ...rest }) => {

// let login = "thequickbrownfoxjumpoverthelazydog"
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (login) {
//           return <Component {...props} />;
//         } else {
//           return (
//             <Redirect
//               to={{
//                 pathname: "/",
//                 state: {
//                   from: props.location,
//                 },
//               }}
//             />
//           );
//         }
//       }}
//     />
//   );
// };

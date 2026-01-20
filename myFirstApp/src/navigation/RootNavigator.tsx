import React, { useContext } from "react";
import { AuthContext } from "../../src/context/AuthContext";

import LoginScreen from "../../src/screens/auth/LoginScreen"
import EmployeeDashboard from "../screens/Employee/EmployeeDashboard";

const RootNavigator = () => {
  const { user } = useContext(AuthContext);

  return user ? <EmployeeDashboard /> : <LoginScreen />;
};

export default RootNavigator;

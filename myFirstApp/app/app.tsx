import React, { useContext } from "react";
import LoginScreen from "../src/screens/auth/LoginScreen";
import EmployeeDashboard from "../app/employee/dashboard";
import { AuthProvider, AuthContext } from "../src/context/AuthContext";

const MainApp = () => {
  const { user } = useContext(AuthContext);
  return user ? <EmployeeDashboard /> : <LoginScreen />;
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

import React, { useContext } from "react";
import EmployeeDashboard from "../app/employee/dashboard";
import LoginScreen from "../src/auth/LoginScreen";
import { AuthContext, AuthProvider } from "../src/context/AuthContext";

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

import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import EmployeeDashboard from "../../app/employee/dashboard";
import { AuthContext } from "../../src/context/AuthContext";
import LoginScreen from "../auth/LoginScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="EmployeeDashboard" component={EmployeeDashboard} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from "../auth/LoginScreen";

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

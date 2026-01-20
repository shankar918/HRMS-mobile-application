import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EmployeeDashboard from "../../app/employee/dashboard";
import AttendanceScreen from "../../app/employee/attendance"
import NoticeBoardScreen from "../../app";

const Stack = createStackNavigator();

export default function EmployeeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={EmployeeDashboard} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="NoticeBoard" component={NoticeBoardScreen} />
    </Stack.Navigator>
  );
}

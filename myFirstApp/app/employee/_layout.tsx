import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function EmployeeLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        initialRouteName="dashboard"
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: "#2563EB",
        }}
      >
        <Drawer.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            drawerIcon: ({ color }) => (
              <Ionicons name="home-outline" size={20} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="attendance"
          options={{
            title: "Attendance",
            drawerIcon: ({ color }) => (
              <Ionicons name="calendar-outline" size={20} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="notice-board"
          options={{
            title: "Notices",
            drawerIcon: ({ color }) => (
              <Ionicons name="notifications-outline" size={20} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="leave-request"
          options={{
            title: "Leave Request",
            drawerIcon: ({ color }) => (
              <Ionicons name="document-text-outline" size={20} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="HolidayCalender"
          options={{
            title: "Holiday Calendar",
            drawerIcon: ({ color }) => (
              <Ionicons name="calendar-outline" size={20} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

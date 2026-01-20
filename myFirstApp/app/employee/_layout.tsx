import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";

export default function EmployeeLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerType: "slide",
      }}
    >
      <Drawer.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="attendance"
        options={{
          title: "Attendance",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="notice-board"
        options={{
          title: "Notice Board",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="leave-request"
        options={{
          title: "Leave Request",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />


      
      
    </Drawer>
  );
}

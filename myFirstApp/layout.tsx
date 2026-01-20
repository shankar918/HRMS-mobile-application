import { Stack } from "expo-router";
import { AuthProvider } from "./constants/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
}

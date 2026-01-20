import { View, Text } from "react-native";
import { useAuth } from "../../src/context/useAuth";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginTop: 100 }}>Admin Dashboard</Text>
      <Text style={{ fontSize: 18, textAlign: "center", marginTop: 20 }}>{user?.name}</Text>
    </View>
  );
}

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useAuth } from "../../src/context/useAuth";
import {
  getTodayAttendance,
  punchIn,
  punchOut,
} from "../../src/services/api";

export default function AttendanceScreen() {
  const { user } = useAuth();
  const employeeId = user?.employeeId;

  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState<any>(null);

  const fetchToday = async () => {
    try {
      setLoading(true);
      const data = await getTodayAttendance(employeeId);
      setAttendance(data);
    } catch {
      setAttendance(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToday();
  }, []);

  const handlePunchIn = async () => {
    try {
      await punchIn(employeeId);
      Alert.alert("Success", "Punched In");
      fetchToday();
    } catch {
      Alert.alert("Error", "Punch In failed");
    }
  };

  const handlePunchOut = async () => {
    try {
      await punchOut(employeeId);
      Alert.alert("Success", "Punched Out");
      fetchToday();
    } catch {
      Alert.alert("Error", "Punch Out failed");
    }
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} size="large" />;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Today Attendance</Text>

      <Row label="Date" value={attendance?.date || "-"} />
      <Row label="First In" value={attendance?.firstIn || "-"} />
      <Row label="Last Out" value={attendance?.lastOut || "-"} />
      <Row label="Worked" value={attendance?.workedTime || "0h 0m"} />
      <Row label="Status" value={attendance?.status || "Not Started"} />

      {!attendance?.firstIn ? (
        <Button text="PUNCH IN" onPress={handlePunchIn} />
      ) : !attendance?.lastOut ? (
        <Button text="PUNCH OUT" onPress={handlePunchOut} danger />
      ) : (
        <Text style={styles.done}>✅ Attendance Completed</Text>
      )}
    </View>
  );
}

/* ===== UI HELPERS ===== */

const Row = ({ label, value }: any) => (
  <View style={styles.row}>
    <Text>{label}:</Text>
    <Text style={{ fontWeight: "700" }}>{value}</Text>
  </View>
);

const Button = ({ text, onPress, danger }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.btn, danger && { backgroundColor: "#ef4444" }]}
  >
    <Text style={styles.btnText}>{text}</Text>
  </TouchableOpacity>
);

/* ===== STYLES ===== */

const styles = StyleSheet.create({
  card: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  btn: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  btnText: {
    color: "#fff",
    fontWeight: "800",
  },
  done: {
    marginTop: 20,
    color: "#16a34a",
    fontWeight: "800",
    textAlign: "center",
  },
});

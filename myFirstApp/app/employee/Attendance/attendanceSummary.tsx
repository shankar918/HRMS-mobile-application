import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../../src/context/useAuth";
import { getMonthlySummary } from "../../../src/services/attendanceApi";

export default function AttendanceSummary() {
  const { user } = useAuth();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    getMonthlySummary(user.employeeId, 1, 2026).then(setData);
  }, []);

  return (
    <View style={styles.grid}>
      <Card label="Full Days" value={data.fullDays} />
      <Card label="Half Days" value={data.halfDays} />
      <Card label="Present" value={data.present} />
      <Card label="Absent" value={data.absent} />
    </View>
  );
}

const Card = ({ label, value }: any) => (
  <View style={styles.card}>
    <Text style={styles.value}>{value || 0}</Text>
    <Text>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", padding: 10 },
  card: {
    width: "48%",
    margin: "1%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  value: { fontSize: 22, fontWeight: "900" },
});

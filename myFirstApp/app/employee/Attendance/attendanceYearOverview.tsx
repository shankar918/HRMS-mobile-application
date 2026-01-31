import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../../../src/context/useAuth";
import { getYearOverview } from "../../../src/services/attendanceApi";

export default function AttendanceYearOverview() {
  const { user } = useAuth();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    getYearOverview(user.employeeId, 2026).then(setData);
  }, []);

  return (
    <View style={styles.container}>
      {Object.keys(data).map((month) => (
        <View key={month} style={styles.row}>
          <Text style={{ width: 60 }}>{month}</Text>
          <Text>Present: {data[month].present}</Text>
          <Text>Absent: {data[month].absent}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  row: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 8,
    borderRadius: 12,
  },
});

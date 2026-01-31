import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAttendanceForEmployee } from "../../src/services/attendanceApi";

const EMPLOYEE_ID = "TEST01"; // later get from auth context

export default function AttendanceScreen() {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const res = await getAttendanceForEmployee(EMPLOYEE_ID);
      setRecords(res || []);
    } catch (err) {
      console.log("Attendance fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} size="large" />;
  }

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Attendance</Text>
            <Ionicons name="notifications-outline" size={22} color="#fff" />
          </View>

          {/* MONTHLY BREAKDOWN */}
          <Text style={styles.sectionTitle}>Monthly Breakdown</Text>

          <View style={styles.statsRow}>
            <Stat label="FULL DAYS" value="0" />
            <Stat label="HALF DAYS" value="0" />
            <Stat label="PRESENT" value="1" />
            <Stat label="ABSENT" value="0" />
          </View>

          <Text style={styles.sectionTitle}>Attendance History</Text>
        </>
      }
      data={records}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <AttendanceCard item={item} />}
      contentContainerStyle={{ paddingBottom: 30 }}
    />
  );
}

/* ---------------- COMPONENTS ---------------- */

const Stat = ({ label, value }: any) => (
  <View style={styles.statCard}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const AttendanceCard = ({ item }: any) => (
  <View style={styles.card}>
    <View style={styles.rowBetween}>
      <View>
        <Text style={styles.dateText}>{item.date}</Text>
        <Text style={styles.dayText}>{item.day}</Text>
      </View>

      <View style={[styles.badge, badgeColor(item.status)]}>
        <Text style={styles.badgeText}>{item.status}</Text>
      </View>
    </View>

    <View style={styles.timeRow}>
      <TimeItem icon="log-in-outline" label="In" value={item.inTime || "--"} />
      <TimeItem icon="log-out-outline" label="Out" value={item.outTime || "--"} />
      <TimeItem icon="time-outline" label="Worked" value={item.worked || "0h"} />
    </View>
  </View>
);

const TimeItem = ({ icon, label, value }: any) => (
  <View style={styles.timeItem}>
    <Ionicons name={icon} size={18} />
    <Text style={styles.timeLabel}>{label}</Text>
    <Text style={styles.timeValue}>{value}</Text>
  </View>
);

const badgeColor = (status: string) => {
  switch (status) {
    case "Absent":
      return { backgroundColor: "#FEE2E2" };
    case "Late":
      return { backgroundColor: "#FEF3C7" };
    default:
      return { backgroundColor: "#DCFCE7" };
  }
};

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { backgroundColor: "#F5F7FB" },

  header: {
    backgroundColor: "#2563EB",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    margin: 16,
  },

  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  statLabel: { color: "#64748B" },
  statValue: { fontSize: 20, fontWeight: "700" },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    borderRadius: 14,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dateText: { fontSize: 16, fontWeight: "700" },
  dayText: { color: "#64748B" },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: { fontWeight: "600" },

  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },

  timeItem: {
    alignItems: "center",
    width: "30%",
  },
  timeLabel: { fontSize: 12, color: "#64748B" },
  timeValue: { fontWeight: "600" },
});

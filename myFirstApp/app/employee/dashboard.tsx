import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../../src/context/useAuth";

const THEME = {
  primary: "#2563eb",
  bg: "#f8fafc",
  card: "#ffffff",
  text: "#0f172a",
  muted: "#64748b",
  border: "#e2e8f0",
  success: "#16a34a",
};

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* ================= HEADER ================= */}


      {/* ================= PROFILE CARD ================= */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0) || "U"}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.role}>{user?.role || "Employee"}</Text>

          {/* <View style={styles.row}>
            <Text style={styles.info}>ID: {user?.employeeId}</Text>
            <Text style={styles.info}>Dept: {user?.department}</Text>
          </View> */}
        </View>
      </View>

      {/* ================= TODAY ATTENDANCE ================= */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🕒 Today Attendance</Text>

        <View style={styles.attendanceRow}>
          <Text>Date:</Text>
          <Text>{new Date().toDateString()}</Text>
        </View>

        <View style={styles.attendanceRow}>
          <Text>Login Status:</Text>
          <Text style={{ color: THEME.muted }}>Not Logged In</Text>
        </View>

        <TouchableOpacity style={styles.punchBtn}>
          <Text style={styles.punchText}>PUNCH IN</Text>
        </TouchableOpacity>
      </View>

      {/* ================= TODAY PROGRESS ================= */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 Today Progress</Text>

        <View style={styles.progressBox}>
          <Text style={styles.progressPercent}>0%</Text>
        </View>

        <View style={styles.progressRow}>
          <View>
            <Text style={styles.muted}>Worked Hrs</Text>
            <Text style={styles.bold}>0h 0m</Text>
          </View>
          <View>
            <Text style={styles.muted}>Target</Text>
            <Text style={styles.bold}>9h 0m</Text>
          </View>
        </View>
      </View>

      {/* ================= ATTENDANCE SUMMARY ================= */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📅 Attendance Summary</Text>

        <View style={styles.summaryRow}>
          <Text>Full Day</Text>
          <Text>0</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>Half Day</Text>
          <Text>0</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>Absent</Text>
          <Text>0</Text>
        </View>
      </View>

      {/* ================= QUICK NAV ================= */}
      <View style={styles.navRow}>
        <TouchableOpacity onPress={() => router.push("/employee/attendance")}>
          <Ionicons name="calendar-outline" size={24} color={THEME.primary} />
          <Text style={styles.navText}>Attendance</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/employee/notice-board")}>
          <Ionicons name="notifications-outline" size={24} color={THEME.primary} />
          <Text style={styles.navText}>Notices</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/employee/leave-request")}>
          <Ionicons name="document-text-outline" size={24} color={THEME.primary} />
          <Text style={styles.navText}>Leave</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.bg,
  },

  header: {
    backgroundColor: THEME.primary,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },

  profileCard: {
    flexDirection: "row",
    backgroundColor: "#e0ecff",
    margin: 16,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: THEME.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  avatarText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },

  name: {
    fontSize: 18,
    fontWeight: "800",
    color: THEME.text,
  },

  role: {
    fontSize: 12,
    color: THEME.primary,
    marginVertical: 2,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  info: {
    fontSize: 11,
    color: THEME.muted,
  },

  card: {
    backgroundColor: THEME.card,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },

  cardTitle: {
    fontWeight: "800",
    marginBottom: 10,
    fontSize: 14,
  },

  attendanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  punchBtn: {
    backgroundColor: THEME.primary,
    marginTop: 14,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  punchText: {
    color: "#fff",
    fontWeight: "800",
  },

  progressBox: {
    alignItems: "center",
    marginVertical: 20,
  },

  progressPercent: {
    fontSize: 28,
    fontWeight: "900",
  },

  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  muted: {
    color: THEME.muted,
    fontSize: 12,
  },

  bold: {
    fontWeight: "700",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  navRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    paddingBottom: 10,
  },

  navText: {
    fontSize: 11,
    textAlign: "center",
    marginTop: 4,
  },
});

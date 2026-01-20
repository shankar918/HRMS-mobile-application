import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* ================= THEME ================= */

const THEME = {
  primary: "#4F46E5",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  bg: "#F8FAFC",
  card: "#FFFFFF",
  text: "#1E293B",
  border: "#E2E8F0",
};

/* ================= TYPES ================= */

type LeaveStatus = "APPROVED" | "PENDING" | "REJECTED";

type Leave = {
  _id: string;
  leaveType: string;
  status: LeaveStatus;
  startDate: string;
  endDate: string;
  reason: string;
};

/* ================= STATUS STYLES ================= */

const statusStyles: Record<LeaveStatus, { backgroundColor: string }> = {
  APPROVED: { backgroundColor: THEME.success },
  PENDING: { backgroundColor: THEME.warning },
  REJECTED: { backgroundColor: THEME.danger },
};

/* ================= COMPONENT ================= */

export default function EmployeeLeaveManagement() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [leaveType, setLeaveType] = useState("CASUAL");
  const [reason, setReason] = useState("");

  /* ================= FETCH LEAVES ================= */

  const fetchLeaves = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(
        "https://hrms-ask.onrender.com/api/leave/employee",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setLeaves(Array.isArray(data) ? data : []);
    } catch {
      Alert.alert("Error", "Failed to load leaves");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  /* ================= APPLY LEAVE ================= */

  const submitRequest = async () => {
    if (!reason.trim()) {
      Alert.alert("Validation", "Reason is required");
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(
        "https://hrms-ask.onrender.com/api/leave/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            from: startDate.toISOString().split("T")[0],
            to: endDate.toISOString().split("T")[0],
            leaveType,
            reason,
          }),
        }
      );

      if (!res.ok) throw new Error();

      Alert.alert("Success", "Leave applied successfully");
      setModalOpen(false);
      setReason("");
      fetchLeaves();
    } catch {
      Alert.alert("Error", "Failed to apply leave");
    } finally {
      setLoading(false);
    }
  };

  /* ================= LEAVE ITEM ================= */

  const LeaveItem = ({ item }: { item: Leave }) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <Text style={styles.cardType}>{item.leaveType} LEAVE</Text>

        <View style={[styles.badge, statusStyles[item.status]]}>
          <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>

      <Text style={styles.cardDate}>
        {new Date(item.startDate).toDateString()} —{" "}
        {new Date(item.endDate).toDateString()}
      </Text>

      <Text style={{ marginTop: 6, color: "#64748B" }}>
        {item.reason}
      </Text>
    </View>
  );

  /* ================= UI ================= */

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leave Dashboard</Text>
        <Text style={styles.subtitle}>Manage your leave requests</Text>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={THEME.primary}
          style={{ marginTop: 40 }}
        />
      ) : (
        <FlatList
          data={leaves}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <LeaveItem item={item} />}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.empty}>No leave history found</Text>
          }
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => setModalOpen(true)}>
        <Text style={styles.fabText}>Apply Leave</Text>
      </TouchableOpacity>

      {/* ================= MODAL ================= */}

      <Modal visible={modalOpen} animationType="slide">
        <SafeAreaView style={styles.modalBody}>
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text style={styles.modalTitle}>Apply Leave</Text>

            <TouchableOpacity
              style={styles.dateBtn}
              onPress={() => setShowStartPicker(true)}
            >
              <Text>From: {startDate.toDateString()}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateBtn}
              onPress={() => setShowEndPicker(true)}
            >
              <Text>To: {endDate.toDateString()}</Text>
            </TouchableOpacity>

            {showStartPicker && (
              <DateTimePicker
                value={startDate}
                onChange={(_, d) => {
                  setShowStartPicker(false);
                  if (d) setStartDate(d);
                }}
              />
            )}

            {showEndPicker && (
              <DateTimePicker
                value={endDate}
                onChange={(_, d) => {
                  setShowEndPicker(false);
                  if (d) setEndDate(d);
                }}
              />
            )}

            <TextInput
              style={styles.input}
              placeholder="Leave type (CASUAL / SICK)"
              value={leaveType}
              onChangeText={setLeaveType}
            />

            <TextInput
              style={[styles.input, { height: 100 }]}
              multiline
              placeholder="Reason"
              value={reason}
              onChangeText={setReason}
            />

            <TouchableOpacity style={styles.submitBtn} onPress={submitRequest}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalOpen(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.bg },

  header: {
    padding: 20,
    backgroundColor: THEME.card,
    borderBottomWidth: 1,
    borderBottomColor: THEME.border,
  },

  title: { fontSize: 28, fontWeight: "bold", color: THEME.text },
  subtitle: { color: "#64748B" },

  listContainer: { padding: 20, paddingBottom: 100 },

  card: {
    backgroundColor: THEME.card,
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardType: { fontWeight: "bold", fontSize: 12, color: "#64748B" },

  cardDate: { marginTop: 10, fontWeight: "600", color: THEME.text },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },

  fab: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: THEME.primary,
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 40,
  },

  fabText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  modalBody: { flex: 1, backgroundColor: THEME.bg },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  dateBtn: {
    padding: 14,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: THEME.border,
  },

  submitBtn: {
    backgroundColor: THEME.primary,
    padding: 16,
    borderRadius: 14,
    marginTop: 20,
  },

  submitText: { color: "#fff", textAlign: "center", fontWeight: "bold" },

  cancel: {
    textAlign: "center",
    marginTop: 14,
    color: THEME.danger,
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#94A3B8",
  },
});

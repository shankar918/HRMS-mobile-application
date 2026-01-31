import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  applyForLeave,
  approveLeaveRequestById,
  cancelLeaveRequestById,
  getLeaveRequests,
  rejectLeaveRequestById,
} from "../../src/services/leave.api";

type PickerType = "FROM" | "TO" | null;

const LeaveScreen = () => {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔐 Change role when needed
  const role = "EMPLOYEE"; // ADMIN | EMPLOYEE
  const employeeId = "EMP001";

  const [form, setForm] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const [activePicker, setActivePicker] =
    useState<PickerType>(null);

  const formatDate = (date: Date) =>
    date.toISOString().split("T")[0];

  const loadLeaves = async () => {
    try {
      setLoading(true);
      const res = await getLeaveRequests();
      setLeaves(res);
    } catch {
      Alert.alert("Error", "Failed to load leaves");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  /* ================== HANDLERS ================== */

  const openFromPicker = () => {
    setActivePicker("FROM");
  };

  const openToPicker = () => {
    if (!form.fromDate) {
      Alert.alert("Validation", "Please select From Date first");
      return;
    }
    setActivePicker("TO");
  };

  const onDateChange = (
    event: any,
    selectedDate?: Date
  ) => {
    setActivePicker(null);

    if (!selectedDate) return;

    if (activePicker === "FROM") {
      setForm({
        ...form,
        fromDate: formatDate(selectedDate),
        toDate: "",
      });
    }

    if (activePicker === "TO") {
      setForm({
        ...form,
        toDate: formatDate(selectedDate),
      });
    }
  };

  const applyLeave = async () => {
    if (!form.fromDate || !form.toDate || !form.reason) {
      Alert.alert("Validation", "All fields are required");
      return;
    }

    try {
      await applyForLeave({
        employeeId,
        ...form,
      });
      Alert.alert("Success", "Leave applied successfully");
      setForm({ fromDate: "", toDate: "", reason: "" });
      loadLeaves();
    } catch {
      Alert.alert("Error", "Failed to apply leave");
    }
  };

  const approveLeave = async (id: string) => {
    await approveLeaveRequestById(id);
    loadLeaves();
  };

  const rejectLeave = async (id: string) => {
    await rejectLeaveRequestById(id);
    loadLeaves();
  };

  const cancelLeave = async (id: string) => {
    await cancelLeaveRequestById(id);
    loadLeaves();
  };

  /* ================== UI ================== */

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leave Management</Text>

      {/* ========== APPLY LEAVE ========== */}
      {role === "EMPLOYEE" && (
        <View style={styles.card}>
          <Text style={styles.subtitle}>Apply Leave</Text>

          {/* FROM DATE */}
          <TouchableOpacity onPress={openFromPicker}>
            <TextInput
              placeholder="From Date"
              style={styles.input}
              value={form.fromDate}
              editable={false}
            />
          </TouchableOpacity>

          {/* TO DATE */}
          <TouchableOpacity onPress={openToPicker}>
            <TextInput
              placeholder="To Date"
              style={styles.input}
              value={form.toDate}
              editable={false}
            />
          </TouchableOpacity>

          {/* REASON */}
          <TextInput
            placeholder="Reason"
            style={styles.input}
            value={form.reason}
            onChangeText={(v) =>
              setForm({ ...form, reason: v })
            }
          />

          <Button title="Apply Leave" onPress={applyLeave} />
        </View>
      )}

      {/* ========== DATE PICKER (ONE AT A TIME) ========== */}
      {activePicker && (
        <DateTimePicker
          value={
            activePicker === "FROM"
              ? form.fromDate
                ? new Date(form.fromDate)
                : new Date()
              : form.toDate
              ? new Date(form.toDate)
              : new Date(form.fromDate)
          }
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          minimumDate={
            activePicker === "TO" && form.fromDate
              ? new Date(form.fromDate)
              : undefined
          }
          onChange={onDateChange}
        />
      )}

      {/* ========== LEAVE LIST ========== */}
      <FlatList
        data={leaves}
        keyExtractor={(item) => item._id}
        refreshing={loading}
        onRefresh={loadLeaves}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Employee: {item.employeeId}</Text>
            <Text>
              {item.fromDate} → {item.toDate}
            </Text>
            <Text>Status: {item.status}</Text>
            <Text>Reason: {item.reason}</Text>

            {/* ADMIN ACTIONS */}
            {role === "ADMIN" && item.status === "PENDING" && (
              <>
                <Button
                  title="Approve"
                  onPress={() => approveLeave(item._id)}
                />
                <Button
                  title="Reject"
                  onPress={() => rejectLeave(item._id)}
                />
              </>
            )}

            {/* EMPLOYEE ACTION */}
            {role === "EMPLOYEE" && item.status === "PENDING" && (
              <Button
                title="Cancel"
                onPress={() => cancelLeave(item._id)}
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

export default LeaveScreen;

/* ================== STYLES ================== */

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 10 },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 8,
  },
});

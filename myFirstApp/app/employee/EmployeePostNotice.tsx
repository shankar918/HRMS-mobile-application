import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { addNotice } from "../../src/services/notice.api";

const EmployeePostNotice = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const submitNotice = async () => {
    if (!title || !message) {
      alert("All fields required");
      return;
    }

    try {
      await addNotice({
        title,
        message,
        recipients: "ADMIN", // 👈 employee → admin
      });

      alert("Posted successfully");
      setTitle("");
      setMessage("");
    } catch (err) {
      alert("Post failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Post Announcement</Text>

      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Write your announcement..."
        style={[styles.input, styles.textArea]}
        value={message}
        onChangeText={setMessage}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={submitNotice}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmployeePostNotice;

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

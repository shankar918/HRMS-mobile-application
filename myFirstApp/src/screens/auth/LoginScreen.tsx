import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { loginApi } from "../../services/authApi";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/useAuth";
import { loginApi } from "../../services/auth.api";
// If you are using Expo Vector Icons:
// import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Use state to manage the error text
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    setError(""); // Clear previous errors
    try {
      // The image shows "Invalid Credentials" so let's simulate that if empty
      if (!email || !password) {
        setError("Invalid Credentials.");
        return;
      }
      
      const res = await loginApi(email, password);

      const user = res.data;
      const token = res.token;

      if (!user || !user.role) {
        setError("Role not received from server");
        return;
      }

      login(user, token);

      if (user.role === "admin" || user.role === "manager") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/employee/dashboard");
      }

    } catch (apiError: any) {
      setError(apiError.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Text Section */}
      <View style={styles.header}>
        {/* Placeholder for "HRMS Portal" badge */}
        <View style={styles.badge}>
            {/* <FontAwesome5 name="star" color="#fff" size={14} /> */}
            <Text style={styles.badgeText}>HRMS Portal</Text>
        </View>
        <Text style={styles.title}>Sign in to Continue</Text>
        <Text style={styles.subtitle}>Use your corporate email and password to access the HRMS dashboard.</Text>
      </View>
      
      {/* Login Card (The white background area) */}
      <View style={styles.card}>
        
        {/* Error Alert Box (matches the design in the image) */}
        {error ? (
          <View style={styles.errorBox}>
            {/* <MaterialCommunityIcons name="alert-circle-outline" color="#EF4444" size={20} /> */}
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <Text style={styles.label}>Work Email</Text>
        <View style={styles.inputContainer}>
          {/* <MaterialCommunityIcons name="email" color="#94A3B8" style={styles.icon} /> */}
          <TextInput
            placeholder="Enter mail"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            style={styles.input}
            placeholderTextColor="#94A3B8"
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          {/* <FontAwesome5 name="lock" color="#94A3B8" style={styles.icon} /> */}
          <TextInput
            placeholder="● ● ● ● ● ● ● ●" // Visually represent the dots
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#94A3B8"
          />
          {/* Placeholder for the eye icon */}
          {/* <MaterialCommunityIcons name="eye" color="#94A3B8" style={styles.iconRight} /> */}
        </View>

        {/* Checkbox and Encrypted Text (Just visual representation) */}
        <View style={styles.checkboxRow}>
            <View style={styles.checkboxPlaceholder} />
            <Text style={styles.checkboxLabel}>Remember this device</Text>
            <Text style={styles.encryptedText}>Encrypted</Text>
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Sign in to Dashboard</Text>
        </TouchableOpacity>
        
        <Text style={styles.troubleText}>Having trouble? <Text style={styles.linkText}>support@arahinfotech.com</Text></Text>
      </View>

      <Text style={styles.versionText}>v1.0- HRMS Suite</Text>
      <Text style={styles.footerText}>© 2026 Avah Info Tech. All rights reserved.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F46E5', // Primary purple background
    justifyContent: 'center',
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    color: '#D1D5DB',
    textAlign: 'center',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 25,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: '#EF4444',
    marginLeft: 10,
    fontWeight: '600',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4B5563',
    marginBottom: 8,
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#F9FAFB',
    marginBottom: 10,
    height: 50,
  },
  icon: { marginRight: 10 },
  iconRight: { marginLeft: 10 },
  input: {
    flex: 1,
    height: '100%',
    color: '#1F2937',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  checkboxPlaceholder: { // Placeholder for the actual checkbox UI
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    marginRight: 10,
  },
  checkboxLabel: { color: '#6B7280', fontSize: 13 },
  encryptedText: { color: '#6B7280', fontSize: 12, marginLeft: 'auto', textAlign: 'right' },
  
  loginBtn: {
    backgroundColor: '#4F46E5', // Indigo color for the main button
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  troubleText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 13,
  },
  linkText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  versionText: {
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 12,
  },
  footerText: {
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
  },
});

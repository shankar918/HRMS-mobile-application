import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getNotices } from "../../src/services/notice.api";

const EmployeeNoticeBoard = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    try {
      const data = await getNotices();
      setNotices(data);
    } catch (error) {
      console.log("Failed to load notices", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleReadMore = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderItem = ({ item }: any) => {
    const isExpanded = expandedId === item._id;

    return (
      <View style={styles.card}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text
            style={[
              styles.role,
              item.createdByRole === "EMPLOYEE"
                ? styles.employee
                : styles.admin,
            ]}
          >
            {item.createdByRole || "System Admin"}
          </Text>

          <Text style={styles.date}>
            {new Date(item.updatedAt).toLocaleString()}
          </Text>
        </View>

        {/* TITLE */}
        <Text style={styles.title}>{item.title}</Text>

        {/* MESSAGE */}
        <Text
          numberOfLines={isExpanded ? undefined : 3}
          style={styles.message}
        >
          {item.message}
        </Text>

        {/* READ MORE */}
        {item.message?.length > 120 && (
          <TouchableOpacity onPress={() => toggleReadMore(item._id)}>
            <Text style={styles.readMore}>
              {isExpanded ? "Show less" : "Read more"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!notices.length) {
    return (
      <View style={styles.center}>
        <Text>No announcements available</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={notices}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

export default EmployeeNoticeBoard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    margin: 12,
    padding: 14,
    borderRadius: 10,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  role: {
    fontWeight: "bold",
    fontSize: 13,
  },
  admin: {
    color: "#1e40af", // blue
  },
  employee: {
    color: "#15803d", // green
  },
  date: {
    fontSize: 11,
    color: "#777",
  },
  title: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    marginTop: 6,
    color: "#444",
    lineHeight: 20,
  },
  readMore: {
    marginTop: 8,
    color: "#2563eb",
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

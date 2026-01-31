import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { getHolidays } from "../../src/services/holiday.api";

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const HolidayCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState<any[]>([]);

  useEffect(() => {
    loadHolidays();
  }, [currentDate]);

  const loadHolidays = async () => {
    try {
      const data = await getHolidays();
      setHolidays(data);
    } catch (e) {
      console.log("Holiday fetch failed", e);
    }
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay() || 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dates = Array(firstDay - 1).fill(null).concat(
    [...Array(daysInMonth)].map((_, i) => i + 1)
  );

  const holidayCount = holidays.filter(
    (h) =>
      new Date(h.date).getMonth() === month &&
      new Date(h.date).getFullYear() === year
  ).length;

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>📅 Holiday Calendar</Text>
        <Text style={styles.subTitle}>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </Text>
      </View>

      {/* CALENDAR CARD */}
      <View style={styles.calendarCard}>
        <View style={styles.dayRow}>
          {DAYS.map((d) => (
            <Text key={d} style={styles.dayText}>{d}</Text>
          ))}
        </View>

        <View style={styles.grid}>
          {dates.map((date, index) => (
            <View key={index} style={styles.cell}>
              {date && (
                <View
                  style={[
                    styles.dateCircle,
                    date === new Date().getDate() &&
                      month === new Date().getMonth() &&
                      styles.today,
                  ]}
                >
                  <Text style={styles.dateText}>{date}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* HOLIDAY COUNT */}
      <View style={styles.countCard}>
        <Text style={styles.countTitle}>Holiday in {currentDate.toLocaleString("default", { month: "long" })}</Text>
        <Text style={styles.count}>{holidayCount}</Text>
        <Text style={styles.year}>{year}</Text>
      </View>

      {/* HOLIDAYS LIST */}
      <Text style={styles.sectionTitle}>🎉 Holidays</Text>
      {holidayCount === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No holiday this month.</Text>
        </View>
      ) : (
        <FlatList
          data={holidays}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.holidayItem}>
              <Text style={styles.holidayName}>{item.name}</Text>
              <Text style={styles.holidayDate}>
                {new Date(item.date).toDateString()}
              </Text>
            </View>
          )}
        />
      )}

      {/* BIRTHDAY SECTION */}
      <Text style={styles.sectionTitle}>🎂 Colleagues Birthdays</Text>
      <View style={styles.emptyCard}>
        <Text style={styles.emptyText}>No birthday this month.</Text>
      </View>
    </View>
  );
};

export default HolidayCalendar;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subTitle: {
    color: "#6b7280",
  },
  calendarCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    elevation: 3,
  },
  dayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayText: {
    width: "14%",
    textAlign: "center",
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  cell: {
    width: "14%",
    alignItems: "center",
    marginVertical: 6,
  },
  dateCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  today: {
    backgroundColor: "#2563eb",
  },
  dateText: {
    fontWeight: "600",
  },
  countCard: {
    marginTop: 14,
    borderRadius: 16,
    padding: 20,
    backgroundColor: "#7c3aed",
    alignItems: "center",
  },
  countTitle: {
    color: "#e5e7eb",
  },
  count: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  year: {
    color: "#e5e7eb",
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginTop: 8,
    alignItems: "center",
  },
  emptyText: {
    color: "#6b7280",
  },
  holidayItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  holidayName: {
    fontWeight: "600",
  },
  holidayDate: {
    color: "#6b7280",
  },
});

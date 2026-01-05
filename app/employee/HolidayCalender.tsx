import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HolidayCalender = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Holiday Calendar</Text>
    </View>
  )
}

export default HolidayCalender

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1E90FF',
  },
});


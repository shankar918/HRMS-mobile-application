import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <Link href="/Profile" asChild>
        <TouchableOpacity style={styles.link} accessibilityRole="button">
          <Icon name="account" size={20} color="#1E90FF" />
          <Text style={styles.linkText}>View Employee Profile</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: { flex: 1, 
    padding: 20,
     backgroundColor: '#fff' 
    },
  title: { fontSize: 20,
     fontWeight: '600'
     , marginBottom: 12
     },
  link: { flexDirection: 'row',
     alignItems: 'center',
      gap: 8 
    },
  linkText: { color: '#1E90FF'
    , marginLeft: 6 
},
});
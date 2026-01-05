import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COLLAPSED_WIDTH = 70;
const EXPANDED_WIDTH = 260;
const HEADER_HEIGHT = 56;

const MENU_ITEMS = [
  { icon: 'account', label: 'Profile', href: '/employee/Profile' },
  { icon: 'home', label: 'Home', href: '/' },
  { icon: 'clock', label: 'Attendance', href: '/employee/Attendance' },
  { icon: 'calendar', label: 'Holiday Calendar', href: '/employee/HolidayCalender' },
  { icon: 'bullhorn', label: 'Notice Board', href: '/employee/Noticeboard' },
  { icon: 'clock-outline', label: 'Request Overtime', href: '/employee/Requestovertime' },
  { icon: 'clipboard-text', label: 'Leave Requests', href: '/employee/LeaveRequests' },
  { icon: 'swap-horizontal', label: 'Work Mode', href: '/employee/WorkMode' },
  { icon: 'account-group', label: 'My Team', href: '/employee/MyTeam' },
];

export default function Index() {
  const [expanded, setExpanded] = useState(true);
  const sidebarWidth = useRef(new Animated.Value(EXPANDED_WIDTH)).current;

  const insets = useSafeAreaInsets();
  const headerTotalHeight = HEADER_HEIGHT + insets.top;

  const toggleMenu = () => {
    const toValue = expanded ? COLLAPSED_WIDTH : EXPANDED_WIDTH;
    setExpanded(!expanded);

    Animated.timing(sidebarWidth, {
      toValue,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const labelOpacity = sidebarWidth.interpolate({
    inputRange: [COLLAPSED_WIDTH, EXPANDED_WIDTH],
    outputRange: [0, 1],
  });

  const labelTranslate = sidebarWidth.interpolate({
    inputRange: [COLLAPSED_WIDTH, EXPANDED_WIDTH],
    outputRange: [-10, 0],
  });

  const labelAnimatedStyle = useMemo(
    () => ({
      opacity: labelOpacity,
      transform: [{ translateX: labelTranslate }],
    }),
    []
  );

  return (
    <View style={styles.root}>
      {/* HEADER */}
      <View style={[styles.header, { paddingTop: insets.top, height: headerTotalHeight, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }]}> 
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name="menu" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>HRMS</Text>

        <View style={styles.headerIcons}>
          <Icon name="bell-outline" size={24} color="#fff" style={styles.headerIcon} />
          
        </View>
      </View>

      {/* BODY */}
      <View style={[styles.body, { marginTop: headerTotalHeight }]}> 
        {/* SIDEBAR */}
        <Animated.View style={[styles.sidebar, { width: sidebarWidth }]}>
          <Animated.Text style={[styles.sidebarTitle, labelAnimatedStyle]}>
            Employee Panel
          </Animated.Text>

          {MENU_ITEMS.map(item => (
            <MenuItem
              key={item.label}
              icon={item.icon as any}
              label={item.label}
              href={item.href}
              labelAnimatedStyle={labelAnimatedStyle}
            />
          ))}
        </Animated.View>

        {/* MAIN CONTENT */}
        <View style={styles.content}>
          <Text style={styles.contentText}>
            Welcome to HRMS Mobile Application
          </Text>
        </View>
      </View>
    </View>
  );
}

type MenuItemProps = {
  icon: React.ComponentProps<typeof Icon>['name'];
  label: string;
  href: string;
  labelAnimatedStyle: any;
};

const MenuItem = ({
  icon,
  label,
  href,
  labelAnimatedStyle,
}: MenuItemProps) => (
  <Link href={href as any} asChild>
    <TouchableOpacity style={styles.menuItem}>
      <Icon name={icon} size={26} color="#fff" />
      <Animated.Text style={[styles.menuLabel, labelAnimatedStyle]}>
        {label}
      </Animated.Text>
    </TouchableOpacity>
  </Link>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F2F4F8',
  },

  /* HEADER */
  header: {
    backgroundColor: '#1E90FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:20,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 1,
    padding:1,
  },

  /* BODY */
  body: {
    flex: 1,
    flexDirection: 'row',
  },

  /* SIDEBAR */
  sidebar: {
    backgroundColor: '#1E90FF',
    paddingTop: 2,
  },
  sidebarTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
    marginBottom:-2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal:7,
  },
  menuLabel: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 15,
  },

  /* CONTENT */
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  contentText: {
    fontSize: 16,
    color: '#333',
  },
});

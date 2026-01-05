import { useThemeColor } from '@/hooks/use-theme-color';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Index = () => {
  const [showLabel, setShowLabel] = useState(true);
  const headerBg = useThemeColor({}, 'tint');
  const windowWidth = Dimensions.get('window').width;
  const expandedWidth = windowWidth;
  const collapsedWidth = 80;
  const animWidth = useRef(new Animated.Value(expandedWidth)).current;

  const labelOpacity = animWidth.interpolate({
    inputRange: [collapsedWidth, expandedWidth],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const labelTranslate = animWidth.interpolate({
    inputRange: [collapsedWidth, expandedWidth],
    outputRange: [-10, 0],
    extrapolate: 'clamp',
  });

  const labelAnimatedStyle = { opacity: labelOpacity, transform: [{ translateX: labelTranslate }] };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.menuHeader}>
          <TouchableOpacity
            onPress={() => {
              setShowLabel(prev => {
                const next = !prev;
                Animated.timing(animWidth, {
                  toValue: next ? expandedWidth : collapsedWidth,
                  duration: 250,
                  useNativeDriver: false,
                }).start();
                return next;
              });
            }}
            style={styles.menuButton}
          >
            <Icon name="menu" size={28} color="white" />
          </TouchableOpacity>
          <Animated.Text style={[styles.label, labelAnimatedStyle]}>Employee Panel</Animated.Text>
        </View>
        <Text style={styles.title}>HRMS</Text>
        <Icon name="bell" size={28} color="white" style={styles.bellIcon} />
        <Icon name="account" size={28} color="white" style={styles.bellIcon} />
      </View>
      <Animated.View style={[styles.iconContainer, { backgroundColor: headerBg, width: animWidth }]}>
        {/* MENU ITEMS */}
        <MenuItem icon="account" label="Profile" showLabel={showLabel} href="/Profile" labelAnimatedStyle={labelAnimatedStyle} />
        <MenuItem icon="home" label="Home" showLabel={showLabel} href="/" labelAnimatedStyle={labelAnimatedStyle} />
        <MenuItem icon="clock" label="Attendance" showLabel={showLabel} href="/Attendance" labelAnimatedStyle={labelAnimatedStyle} />
        <MenuItem icon="calendar" label="Holiday Calendar" showLabel={showLabel} href="/HolidayCalender" labelAnimatedStyle={labelAnimatedStyle} />
        <MenuItem icon="bullhorn" label="Notice Board" showLabel={showLabel} href="/Noticeboard" labelAnimatedStyle={labelAnimatedStyle} />
        <MenuItem icon="clock" label="Request Overtime" showLabel={showLabel} href="/Requestovertime" labelAnimatedStyle={labelAnimatedStyle} />
        <MenuItem icon="account" label="Leave Requests" showLabel={showLabel} href="/LeaveRequests" labelAnimatedStyle={labelAnimatedStyle} />
        <MenuItem icon="clock" label="Request Workmode" showLabel={showLabel} href="/" labelAnimatedStyle={labelAnimatedStyle} />
        <MenuItem icon="group" label="My Team" showLabel={showLabel} href="../componer" labelAnimatedStyle={labelAnimatedStyle} />
      </Animated.View>
    </View>
  );
};

type MenuItemProps = {
  icon: React.ComponentProps<typeof Icon>['name'];
  label: string;
  showLabel: boolean;
  href: string;
  labelAnimatedStyle?: any;
};

const MenuItem = ({ icon, label, showLabel, href, labelAnimatedStyle }: MenuItemProps) => (
  <Link href={href as any} asChild>
    <TouchableOpacity style={styles.iconRow}>
      <Icon name={icon} size={40} color="white" />
      <Animated.Text style={[styles.label, labelAnimatedStyle]}>{label}</Animated.Text>
    </TouchableOpacity>
  </Link>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'blue',
    flex: 1,
    textAlign: 'center',
  },
  welcome: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  iconContainer: {
    marginTop: 30,
    paddingHorizontal: 10,
    /* width is animated */
    marginHorizontal: -20,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#1E90FF',
  },
  menuButton: {
    padding: 8,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    backgroundColor: '#1E90FF',
     top: -54,
     left: -9,
  },
  label: {
    marginLeft: 15,
    fontSize: 16,
    color: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: -20,
    alignSelf: 'stretch',
    backgroundColor: '#1E90FF',
    top: -23,
  },

  bellIcon: {
    alignSelf: 'center',
    padding: 8,
  },
});

export default Index;

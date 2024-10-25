import { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, Animated, Dimensions, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Octicons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { green, purple } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const Home = () => {

  const navigation = useNavigation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-Dimensions.get('window').width * 0.6)).current;

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    Animated.timing(sidebarAnim, {
      toValue: isSidebarOpen ? -Dimensions.get('window').width * 0.6 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Close sidebar function
  const closeSidebar = () => {
    setIsSidebarOpen(false);
    Animated.timing(sidebarAnim, {
      toValue: -Dimensions.get('window').width * 0.60,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const profileHandler = () => {
    navigation.navigate('Profile');
    closeSidebar();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F5FA', paddingHorizontal: 15 }}>
      <StatusBar
        animated={true}
        backgroundColor={'#F4F5FA'}
        barStyle="dark-content"
      />

      {/* Sidebar */}
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: Dimensions.get('window').width * 0.6,
          backgroundColor: '#F4F5FA',
          transform: [{ translateX: sidebarAnim }],
          zIndex: 2,
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingBottom: 20
        }}
      >
        <View style={{ flex: 1, paddingVertical: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <Image
                source={require("../assets/splashLogo.png")}
                style={{
                  width: 90,
                  height: 30,
                  resizeMode: 'contain',
                }}
              />
            </View>

            <TouchableOpacity onPress={closeSidebar} style={{ paddingRight: 5 }}>
              <Icon2 name="sidebar-expand" size={16} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Sidebar Items */}
          <View style={{ marginTop: 25, paddingHorizontal: 10 }}>
            <TouchableOpacity onPress={closeSidebar} style={{ flexDirection: 'row', marginVertical: 5, paddingVertical: 10, alignItems: 'center', backgroundColor: green, paddingHorizontal: 8, borderRadius: 10 }}>
              <Icon name="today" size={20} color="#000" style={{ marginRight: 8 }} />
              <Text style={{ fontSize: responsiveFontSize(2), color: '#000', fontWeight: '500' }}>Today's Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={profileHandler} style={{ flexDirection: 'row', paddingVertical: 10, marginVertical: 5, alignItems: 'center', backgroundColor: green, paddingHorizontal: 8, borderRadius: 10 }}>
              <Icon name="person" size={20} color="#000" style={{ marginRight: 8 }} />
              <Text style={{ fontSize: responsiveFontSize(2), color: '#000', fontWeight: '500' }}>Profile</Text>
            </TouchableOpacity>
          </View>

        </View>

        <TouchableOpacity onPress={closeSidebar} style={{ flexDirection: 'row', paddingVertical: 10, marginVertical: 5, alignItems: 'center', backgroundColor: purple, paddingHorizontal: 8, borderRadius: 10, marginHorizontal: 10 }}>
          <Icon3 name="log-out" size={24} color="#fff" style={{ marginRight: 8 }} />
          <Text style={{ fontSize: responsiveFontSize(2.2), color: '#fff', fontWeight: '500' }}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Dim Background and Close Sidebar on Outside Press */}
      {isSidebarOpen && (
        <Pressable
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1,
          }}
          onPress={closeSidebar}
        />
      )}

      {/* Main Content */}
      <View style={{ marginTop: 10 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, width: '100%' }}>
          <TouchableOpacity onPress={toggleSidebar} style={{ width: '10%' }}>
            <Icon2 name="sidebar-collapse" size={16} color="#000" />
          </TouchableOpacity>

          <View style={{ width: '80%' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', textAlign: 'center' }}>Dashboard</Text>
          </View>

          <View style={{ width: '10%' }} />
        </View>

        {/* Profile Section */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={{ width: 80, height: 80, borderRadius: 40, marginRight: 15 }}
          />
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: purple }}>Delivery Boy</Text>
            <Text style={{ fontSize: responsiveFontSize(1.8), color: 'gray' }}>deliveryboy@gmail.com</Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 }}>
          <View style={cardStyle('#E8F9FD')}>
            <Text style={cardTextStyle}>20</Text>
            <Text style={{ fontSize: 14, color: 'gray' }}>Completed Deliveries</Text>
          </View>
          <View style={cardStyle('#FFE3E4')}>
            <Text style={cardTextStyle}>100</Text>
            <Text style={{ fontSize: 14, color: 'gray' }}>Pending Deliveries</Text>
          </View>
          <View style={cardStyle('#EEEFFF')}>
            <Text style={cardTextStyle}>50</Text>
            <Text style={{ fontSize: 14, color: 'gray' }}>Total Collected</Text>
          </View>
          <View style={cardStyle('#FFEEE2')}>
            <Text style={cardTextStyle}>26</Text>
            <Text style={{ fontSize: 14, color: 'gray' }}>Total Earnings</Text>
          </View>
        </View>

        {/* Cancelled Deliveries */}
        <View style={{ backgroundColor: '#F9D6D7', padding: 15, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FF4D67' }}>20 Deliveries Cancelled</Text>
            <Text style={{ fontSize: 14, color: 'gray' }}>10 Minutes estimated</Text>
          </View>
          <Icon name="cancel" size={30} color="#FF4D67" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const cardStyle = (bgColor) => ({
  backgroundColor: bgColor,
  width: '48%',
  padding: 20,
  borderRadius: 10,
  marginBottom: 20,
  alignItems: 'center',
  elevation: 1,
});

const cardTextStyle = {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 5,
  color: '#000',
};

export default Home;

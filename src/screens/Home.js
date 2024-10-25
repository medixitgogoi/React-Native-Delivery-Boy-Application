import { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { purple } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // State to track sidebar visibility
  const sidebarAnim = useRef(new Animated.Value(-Dimensions.get('window').width * 0.75)).current; // Initial sidebar position

  // Function to toggle sidebar
  const toggleSidebar = () => {
    console.log('clicked')
    setIsSidebarOpen(!isSidebarOpen);
    Animated.timing(sidebarAnim, {
      toValue: isSidebarOpen ? -Dimensions.get('window').width * 0.75 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F5FA', paddingHorizontal: 15 }}>
      <StatusBar
        animated={true}
        backgroundColor={isSidebarOpen ? '#fff' : '#F4F5FA'}
        barStyle="dark-content"
      />

      {/* Sidebar */}
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: Dimensions.get('window').width * 0.50,  // Sidebar width
          backgroundColor: '#FFF',
          transform: [{ translateX: sidebarAnim }],
          zIndex: 1, // Ensure it overlaps other content
        }}
      >
        <View style={{ flex: 1, padding: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#000' }}>Menu</Text>
          {/* Add sidebar content like navigation links here */}
          <Text style={{ color: '#000' }}>Home</Text>
          <Text style={{ color: '#000' }}>Profile</Text>
          <Text style={{ color: '#000' }}>Settings</Text>
        </View>
      </Animated.View>

      {/* Main Content */}
      <View style={{ marginTop: 10 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Icon name="menu" size={25} color="#000" />
          </TouchableOpacity>

          <View style={{ width: '100%' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', textAlign: 'center' }}>Dashboard</Text>
          </View>
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
import { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, Animated, Dimensions, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Octicons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { green, purple } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Sidebar from '../components/Sidebar';

const Home = () => {
  
  const navigation = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F5FA', paddingHorizontal: 15 }}>
      <StatusBar
        animated={true}
        backgroundColor={'#F4F5FA'}
        barStyle="dark-content"
      />

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} navigation={navigation} activeItem="Home" />

      {/* Main Content */}
      <View style={{ marginTop: 10 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, width: '100%' }}>
          <TouchableOpacity onPress={toggleSidebar} style={{ width: '10%' }}>
            <Icon2 name="sidebar-collapse" size={16} color="#000" />
          </TouchableOpacity>

          <View style={{ width: '80%' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', textAlign: 'center' }}>Today's Orders</Text>
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
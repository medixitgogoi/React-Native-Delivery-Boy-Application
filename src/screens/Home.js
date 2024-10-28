import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import Icon2 from 'react-native-vector-icons/Octicons';
import { purple, green } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Sidebar from '../components/Sidebar';

const ordersData = [
  {
    id: '1',
    customerName: 'Nick Adams',
    location: '123 Main St, Springfield',
    orderDescription: 'Apples, Orange Juice',
    deliveryTime: '2:00 PM',
    price: '₹15.00',
    paymentStatus: 'COD',
  },
  {
    id: '2',
    customerName: 'Anthony Adverse',
    location: '456 Elm St, Springfield',
    orderDescription: 'Bread, Milk',
    deliveryTime: '3:30 PM',
    price: '₹12.50',
    paymentStatus: 'UPI',
  },
  // Additional orders can be added here
];

const OrderCard = ({ order }) => {
  return (
    <View style={{
      backgroundColor: '#FFF',
      borderRadius: 10,
      padding: 15,
      // marginBottom: 15,
      elevation: 2,
    }}>
      {/* Customer Details */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: purple }}>{order.customerName}</Text>
        <Text style={{ fontSize: 14, color: 'gray' }}>{order.deliveryTime}</Text>
      </View>
      <Text style={{ fontSize: 14, color: '#555' }}>{order.location}</Text>

      {/* Order Description */}
      <Text style={{ marginTop: 10, fontSize: 16, color: '#333' }}>{order.orderDescription}</Text>

      {/* Price and Payment Status */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#000' }}>{order.price}</Text>
        <Text style={{
          fontSize: 14,
          color: order.paymentStatus === 'COD' ? '#FF6347' : green,
          fontWeight: '600',
        }}>
          {order.paymentStatus}
        </Text>
      </View>

      {/* Accept/Reject Buttons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
        <TouchableOpacity style={{
          backgroundColor: green,
          paddingVertical: 8,
          paddingHorizontal: 20,
          borderRadius: 5,
        }}>
          <Text style={{ color: '#FFF', fontWeight: '600' }}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          backgroundColor: '#FF6347',
          paddingVertical: 8,
          paddingHorizontal: 20,
          borderRadius: 5,
        }}>
          <Text style={{ color: '#FFF', fontWeight: '600' }}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F5FA', paddingHorizontal: 0 }}>
      <StatusBar animated={true} backgroundColor={'#F4F5FA'} barStyle="dark-content" />

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} navigation={navigation} activeItem="Home" />

      {/* Header */}
      <View style={{ paddingHorizontal: 15, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, width: '100%' }}>
        <TouchableOpacity onPress={toggleSidebar} style={{ width: '10%', height: 30, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Icon2 name="sidebar-collapse" size={16} color="#000" />
        </TouchableOpacity>
        <View style={{ width: '80%' }}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: purple, textAlign: 'center' }}>Today's Orders</Text>
        </View>
        <View style={{ width: '10%' }} />
      </View>

      {/* Profile Section */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <View style={{ elevation: 1, width: 80, height: 80 }}>
          <Image
            source={require('../assets/avatar.png')}
            style={{ width: '100%', height: '100%', borderRadius: 40, marginRight: 15 }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>Delivery Boy</Text>
          <Text style={{ fontSize: responsiveFontSize(1.8), color: 'gray' }}>deliveryboy@gmail.com</Text>
        </View>
      </View>

      {/* Orders List */}
      <FlatList
        data={ordersData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderCard order={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 0, paddingBottom: 20, gap: 15 }}
      />
    </SafeAreaView>
  );
};

export default Home;

import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import Icon2 from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
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
  {
    id: '3',
    customerName: 'Sarah Johnson',
    location: '789 Maple St, Springfield',
    orderDescription: 'Eggs, Flour, Sugar',
    deliveryTime: '4:00 PM',
    price: '₹20.00',
    paymentStatus: 'COD',
  },
  {
    id: '4',
    customerName: 'Michael Brown',
    location: '101 Oak St, Springfield',
    orderDescription: 'Chicken, Rice, Vegetables',
    deliveryTime: '5:15 PM',
    price: '₹30.75',
    paymentStatus: 'UPI',
  },
  {
    id: '5',
    customerName: 'Emily White',
    location: '202 Pine St, Springfield',
    orderDescription: 'Pasta, Tomato Sauce',
    deliveryTime: '6:45 PM',
    price: '₹18.50',
    paymentStatus: 'COD',
  },
];

const OrderCard = ({ order }) => {
  return (
    <View style={{
      backgroundColor: '#FFF',
      borderRadius: 15,
      padding: 15,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
    }}>
      {/* Customer Details */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
          <Icon3 name="user-circle" size={20} color="#000" style={{ marginRight: 5 }} />
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#9f6efe' }}>{order.customerName}</Text>
        </View>
        <Text style={{ fontSize: 14, color: '#888' }}>{order.deliveryTime}</Text>
      </View>

      {/* Location */}
      <Text style={{ fontSize: 14, color: '#555', marginBottom: 10 }}>{order.location}</Text>

      {/* Order Description */}
      <Text style={{ fontSize: 16, color: '#333', marginBottom: 15 }}>{order.orderDescription}</Text>

      {/* Price and Payment Status */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }}>{order.price}</Text>
        <Text style={{
          fontSize: 14,
          fontWeight: '700',
          color: order.paymentStatus === 'COD' ? '#FF6347' : '#6ae4e9',
          backgroundColor: order.paymentStatus === 'COD' ? '#FFE8E6' : '#E6FAFB',
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 12,
        }}>
          {order.paymentStatus}
        </Text>
      </View>

      {/* Accept/Reject Buttons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, width: '100%' }}>
        <TouchableOpacity style={{
          backgroundColor: '#6ae4e9',
          paddingVertical: 10,
          width: '48%',
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
          flexDirection: 'row'
        }}>
          <Text style={{ color: '#000', fontWeight: '700' }}>Accept</Text>
          <Icon name="check-circle" size={20} color="#000" style={{ marginRight: 5 }} />
        </TouchableOpacity>
        <TouchableOpacity style={{
          backgroundColor: '#FF6347',
          paddingVertical: 10,
          width: '48%',
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 5
        }}>
          <Text style={{ color: '#FFF', fontWeight: '700' }}>Reject</Text>
          <Icon name="cancel" size={20} color="#fff" style={{ marginRight: 5 }} />
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
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15, alignSelf: 'center' }}>
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
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10, gap: 15 }}
      />
    </SafeAreaView>
  );
};

export default Home;

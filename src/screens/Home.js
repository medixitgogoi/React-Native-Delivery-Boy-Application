import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import Icon2 from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import Icon5 from 'react-native-vector-icons/Entypo';
import Icon6 from 'react-native-vector-icons/MaterialIcons';
import { purple, green } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Sidebar from '../components/Sidebar';
import { orders } from '../utils/homeData';

const Home = () => {

  const navigation = useNavigation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const OrderCard = ({ order }) => {
    return (
      <View style={{
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
      }}>
        {/* Customer Details */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <View style={{ width: 23 }}>
              <Icon3 name="user" size={18} color="#9d9d9d" style={{ marginRight: 5 }} />
            </View>
            <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: '600', color: '#9f6efe' }}>{order?.customerName}</Text>
          </View>
        </View>

        {/* Location */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 8 }}>
          <View style={{ width: 23 }}>
            <Icon4 name="location-dot" size={18} color="#9d9d9d" style={{ marginRight: 5 }} />
          </View>
          <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>{order.location}</Text>
        </View>

        {/* Order Description */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 8 }}>
          <View style={{ width: 23 }}>
            <Icon5 name="box" size={15} color="#9d9d9d" style={{ marginRight: 5 }} />
          </View>
          <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>{order.orderDescription}</Text>
        </View>

        {/* Price */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 8 }}>
          <View style={{ width: 23 }}>
            <Icon4 name="money-bill" size={15} color="#9d9d9d" style={{ marginRight: 5 }} />
          </View>
          <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>{order?.price}</Text>
        </View>

        {/* Delivery Date */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 8 }}>
          <View style={{ width: 23 }}>
            <Icon name="date-range" size={18} color="#9d9d9d" style={{}} />
          </View>
          <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>Delivery Date: {order?.deliveryDate}</Text>
        </View>

        {/* Order Status */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 8 }}>
          <View style={{ width: 23 }}>
            <Icon4 name="circle-info" size={15} color="#9d9d9d" style={{ marginRight: 5, marginLeft: 1 }} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>Status:</Text>
            {order.status === 'Delivered' ? (
              <View style={{ backgroundColor: '#a0df89', paddingHorizontal: 5, paddingVertical: 3, borderRadius: 4, elevation: 1 }}>
                <Text style={{ fontSize: responsiveFontSize(1.5), color: '#000', fontWeight: '500' }}>{order.status}</Text>
              </View>
            ) : (
              <View style={{ backgroundColor: '#FFF8E1', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 4, elevation: 1, borderColor: '#e19e00', borderWidth: 0.5 }}>
                <Text style={{ fontSize: responsiveFontSize(1.5), color: '#e19e00', fontWeight: '500' }}>{order.status}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Accept/Reject Buttons */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, width: '100%' }}>
          {/* Accept */}
          <TouchableOpacity
            style={{
              backgroundColor: '#6ae4e9',
              paddingVertical: 8,
              width: '48%',
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              flexDirection: 'row',
              elevation: 1
            }}
            onPress={() => navigation.navigate('Delivery', { data: order })}
          >
            <Text style={{ color: '#000', fontWeight: '600' }}>Accept</Text>
            <Icon name="check-circle" size={20} color="#000" style={{ marginRight: 5 }} />
          </TouchableOpacity>

          {/* Reject */}
          <TouchableOpacity style={{
            backgroundColor: '#ef2400',
            paddingVertical: 8,
            width: '48%',
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 5,
            elevation: 1
          }}>
            <Text style={{ color: '#FFF', fontWeight: '600' }}>Reject</Text>
            <Icon name="cancel" size={20} color="#fff" style={{ marginRight: 5 }} />
          </TouchableOpacity>
        </View>

        {/* Payment status */}
        <View style={{ position: 'absolute', top: 10, right: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{
            fontSize: responsiveFontSize(1.6),
            fontWeight: '700',
            color: order.paymentStatus === 'COD' ? '#FF6347' : '#1fc9d0',
            backgroundColor: order.paymentStatus === 'COD' ? '#FFE8E6' : '#E6FAFB',
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 6,
            borderColor: order.paymentStatus === 'COD' ? '#ff7468' : '#1eb6bd',
            borderWidth: 0.6
          }}>
            {order.paymentStatus}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F5FA', paddingHorizontal: 0 }}>
      <StatusBar
        animated={true}
        backgroundColor={'#F4F5FA'}
        barStyle="dark-content"
      />

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} navigation={navigation} activeItem="Home" />

      {/* Header */}
      <View style={{ paddingHorizontal: 15, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, width: '100%' }}>
        <TouchableOpacity onPress={toggleSidebar} style={{ width: '10%', height: 30, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Icon2 name="sidebar-collapse" size={16} color="#000" />
        </TouchableOpacity>
        <View style={{ width: '80%' }}>
          <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '700', color: purple, textAlign: 'center' }}>Today's Orders</Text>
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
          <Text style={{ fontSize: responsiveFontSize(2), fontWeight: 'bold', color: '#000' }}>Delivery Boy</Text>
          <Text style={{ fontSize: responsiveFontSize(1.8), color: 'gray' }}>deliveryboy@gmail.com</Text>
        </View>
      </View>

      {/* Orders List */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderCard order={item} />}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10, gap: 15, paddingBottom: 15 }}
      />
    </SafeAreaView>
  );
};

export default Home;
import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Sidebar from '../components/Sidebar';
import Icon2 from 'react-native-vector-icons/Octicons';
import { green, purple } from '../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import Icon6 from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/Entypo';

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

const DeliveredOrders = () => {

    const navigation = useNavigation();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const renderOrderItem = ({ item }) => (
        <View style={{
            backgroundColor: '#FFF',
            borderRadius: 15,
            padding: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 1,
            position: 'relative',
        }}>
            {/* Delivered Status Badge */}
            <View style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: '#EDF7EC',
                paddingVertical: 3,
                paddingHorizontal: 7,
                borderRadius: 6,
                borderColor: '#5EC467',
                borderWidth: 0.8,
            }}>
                <Text style={{ fontSize: responsiveFontSize(1.5), fontWeight: '500', color: '#286d2e' }}>Delivered</Text>
            </View>

            {/* Customer Details */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ width: 25 }}>
                    <Icon3 name="user" size={18} color="#9f6efe" style={{ marginRight: 5 }} />
                </View>
                <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: '600', color: '#9f6efe' }}>{item?.customerName}</Text>
            </View>

            {/* Location */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ width: 25 }}>
                    <Icon4 name="location-dot" size={16} color="#9d9d9d" style={{ marginRight: 5 }} />
                </View>
                <Text style={{ fontSize: responsiveFontSize(1.9), color: '#333', fontWeight: '500' }}>{item?.location}</Text>
            </View>

            {/* Order Description */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <View style={{ width: 25 }}>
                    <Icon5 name="box" size={15} color="#9d9d9d" style={{ marginRight: 5 }} />
                </View>
                <Text style={{ fontSize: responsiveFontSize(1.9), color: '#333', fontWeight: '500' }}>{item?.orderDescription}</Text>
            </View>

            {/* Price */}
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <View style={{ width: 25 }}>
                    <Icon4 name="money-bill" size={15} color="#9d9d9d" style={{ marginRight: 5 }} />
                </View>
                <Text style={{ fontSize: responsiveFontSize(1.9), color: '#333', fontWeight: '500' }}>{item?.price}</Text>

                {/* Payment Mode */}
                <View style={{
                    alignSelf: 'flex-start',
                    backgroundColor: item.paymentStatus === 'COD' ? '#FFE8E6' : '#E6FAFB',
                    paddingVertical: 3,
                    paddingHorizontal: 6,
                    borderRadius: 5,
                    borderColor: item.paymentStatus === 'COD' ? '#ff7468' : '#1eb6bd',
                    borderWidth: 0.5,
                    marginLeft: 6,
                }}>
                    <Text style={{
                        fontSize: responsiveFontSize(1.4),
                        color: item.paymentStatus === 'COD' ? '#ff7468' : '#1eb6bd',
                        fontWeight: '500'
                    }}>
                        {item?.paymentStatus === 'UPI' ? 'Paid via UPI' : 'Paid via CASH'}
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#F4F5FA', }}>
            <StatusBar
                animated={true}
                backgroundColor={'#F4F5FA'}
                barStyle="dark-content"
            />

            {/* Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} navigation={navigation} activeItem="DeliveredOrders" />

            {/* Header */}
            <View style={{ marginTop: 10, paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, width: '100%' }}>
                <TouchableOpacity onPress={toggleSidebar} style={{ width: '10%', height: 30, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Icon2 name="sidebar-collapse" size={16} color="#000" />
                </TouchableOpacity>

                <View style={{ width: '80%' }}>
                    <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '700', color: purple, textAlign: 'center' }}>Delivered Orders</Text>
                </View>

                <View style={{ width: '10%' }} />
            </View>

            {/* Delivered Orders List */}
            <FlatList
                data={ordersData}
                renderItem={renderOrderItem}
                keyExtractor={(item) => item?.id}
                contentContainerStyle={{ paddingVertical: 10, gap: 10, paddingHorizontal: 15 }}
                ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: 16, color: '#9d9d9d', marginTop: 20 }}>No delivered orders found.</Text>}
            />
        </View>
    );
};

export default DeliveredOrders;
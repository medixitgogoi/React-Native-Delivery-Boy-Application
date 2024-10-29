import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Sidebar from '../components/Sidebar';
import Icon2 from 'react-native-vector-icons/Octicons';
import { green, purple } from '../utils/colors';

const DeliveredOrders = () => {

    const navigation = useNavigation();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [deliveredOrders, setDeliveredOrders] = useState([]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    useEffect(() => {
        setDeliveredOrders([
            { id: '1', orderNumber: '1001', date: '2024-10-28', customerName: 'John Doe' },
            { id: '2', orderNumber: '1002', date: '2024-10-27', customerName: 'Jane Smith' },
        ]);
    }, []);

    const renderOrderItem = ({ item }) => (
        <View style={{ backgroundColor: green, borderRadius: 10, padding: 15, marginBottom: 15, elevation: 1 }}>
            <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600' }}>Order #{item.orderNumber}</Text>
            <Text style={{ fontSize: 16, color: '#fff', fontWeight: '600' }}>Customer: {item.customerName}</Text>
            <Text style={{ fontSize: 14, color: '#f0f0f0', marginTop: 5 }}>Delivered on: {item.date}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#F4F5FA', paddingHorizontal: 15 }}>
            <StatusBar animated={true} backgroundColor={'#F4F5FA'} barStyle="dark-content" />

            {/* Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} navigation={navigation} activeItem="DeliveredOrders" />

            {/* Header */}
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, width: '100%' }}>
                <TouchableOpacity onPress={toggleSidebar} style={{ width: '10%', height: 30, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Icon2 name="sidebar-collapse" size={16} color="#000" />
                </TouchableOpacity>

                <View style={{ width: '80%' }}>
                    <Text style={{ fontSize: 20, fontWeight: '700', color: purple, textAlign: 'center' }}>Delivered Orders</Text>
                </View>

                <View style={{ width: '10%' }} />
            </View>
            {/* Delivered Orders List */}
            <FlatList
                data={deliveredOrders}
                renderItem={renderOrderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
                ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: 16, color: '#9d9d9d', marginTop: 20 }}>No delivered orders found.</Text>}
            />
        </View>
    );
};

export default DeliveredOrders;
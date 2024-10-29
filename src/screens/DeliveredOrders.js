// Profile.js
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { green, purple } from '../utils/colors'; // Import colors if needed
import Sidebar from '../components/Sidebar';
import Icon2 from 'react-native-vector-icons/Octicons'; // Import the icon

const DeliveredOrders = () => {

    const navigation = useNavigation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F4F5FA', paddingHorizontal: 15 }}>
            <StatusBar animated={true} backgroundColor={'#F4F5FA'} barStyle="dark-content" />

            {/* Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} navigation={navigation} activeItem="DeliveredOrders" />

            <Text style={{ color: '#000' }}>DeliveredOrders</Text>
        </View>
    )
}

export default DeliveredOrders;
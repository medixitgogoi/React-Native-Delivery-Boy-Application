// Profile.js
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { green, purple } from '../utils/colors'; // Import colors if needed
import Sidebar from '../components/Sidebar';
import Icon2 from 'react-native-vector-icons/Octicons'; // Import the icon

const Profile = () => {

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
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} navigation={navigation} activeItem="Profile" />

            {/* Header */}
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, width: '100%' }}>
                <TouchableOpacity onPress={toggleSidebar} style={{ width: '10%', height: 30, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Icon2 name="sidebar-collapse" size={16} color="#000" />
                </TouchableOpacity>

                <View style={{ width: '80%' }}>
                    <Text style={{ fontSize: 20, fontWeight: '700', color: purple, textAlign: 'center' }}>Profile</Text>
                </View>

                <View style={{ width: '10%' }} />
            </View>

            {/* Main Profile Content */}
            <View style={{ flex: 1, paddingHorizontal: 10 }}>

                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/100' }}
                        style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: purple }}>Delivery Boy</Text>
                    <Text style={{ fontSize: 16, color: 'gray' }}>deliveryboy@gmail.com</Text>
                </View>

                <View style={{ backgroundColor: green, padding: 20, borderRadius: 10, elevation: 1 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#000' }}>Personal Information</Text>
                    <Text style={{ fontSize: 16, color: '#000' }}>Name: John Doe</Text>
                    <Text style={{ fontSize: 16, color: '#000' }}>Phone: +123456789</Text>
                    <Text style={{ fontSize: 16, color: '#000' }}>Vehicle: Bike</Text>
                </View>

                {/* Stats Section */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: 20 }}>
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

            </View>
        </View>
    );
};

export default Profile;

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
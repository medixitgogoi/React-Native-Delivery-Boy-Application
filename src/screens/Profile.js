import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { green, purple } from '../utils/colors'; // Import colors if needed
import Sidebar from '../components/Sidebar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Octicons'; // Import the icon
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'; // Import the icon
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';

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

                {/* Profile section */}
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <View style={{ elevation: 1, width: 90, height: 80 }}>
                        <Image
                            source={require('../assets/avatar.png')}
                            style={{ width: '100%', height: '100%', borderRadius: 40, marginRight: 15 }}
                        />
                    </View>
                    <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: 'bold', color: purple }}>Delivery Boy</Text>
                    <Text style={{ fontSize: responsiveFontSize(1.8), color: 'gray', }}>deliveryboy@gmail.com</Text>
                </View>

                {/* Personal Information */}
                <LinearGradient
                    colors={['#bbf2f5', '#FFFFFF', '#b9f2f5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        borderRadius: 15,
                        padding: 20,
                        flexDirection: 'column',
                        elevation: 1,
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>Name:</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#148186', fontWeight: '600' }}>John Doe</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>Phone:</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#148186', fontWeight: '600' }}>+91 1234567890</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>Vehicle:</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#148186', fontWeight: '600' }}>Bike</Text>
                    </View>
                </LinearGradient>

                {/* Stats Section */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: 20 }}>
                    {/* Completed Deliveries */}
                    <View style={cardStyle('#EDF7EC')}>
                        <Icon name="check-circle" size={24} color="green" style={{ marginBottom: 5 }} />
                        <Text style={cardTextStyle}>20</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: '#515151', width: '100%', textAlign: 'center', fontWeight: '400' }}>
                            Completed Deliveries
                        </Text>
                    </View>

                    <View style={cardStyle('#FFE3E4')}>
                        <Icon3 name="clock" size={24} color="red" style={{ marginBottom: 5 }} />
                        <Text style={cardTextStyle}>23</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: '#515151', width: '100%', textAlign: 'center', fontWeight: '400' }}>
                            Pending Deliveries
                        </Text>
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
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 1,
});

const cardTextStyle = {
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
    marginBottom: 5,
    color: '#000',
};
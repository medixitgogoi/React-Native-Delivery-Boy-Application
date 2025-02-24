import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
import { green } from '../utils/colors';
import Sidebar from '../components/Sidebar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { fetchTasks } from '../utils/fetchTasks';

const Profile = ({ navigation }) => {

    const userDetails = useSelector(state => state.user);
    // console.log('userDetails: ', userDetails);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    // fetch clients
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTasks(userDetails); // Fetch all products
                // setClients(data);

                // console.log('client: ', data)

            } catch (error) {
                console.log('Error fetching clients: ', error?.message);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#F4F5FA' }}>
            <StatusBar animated={true} backgroundColor={isSidebarOpen ? '#ebebeb' : '#F4F5FA'} barStyle="dark-content" />

            {/* Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} navigation={navigation} activeItem="Profile" />

            {/* Header */}
            <View style={{ paddingHorizontal: 15, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, width: '100%' }}>
                <TouchableOpacity onPress={toggleSidebar} style={{ width: '10%', height: 30, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Icon name="menu" size={22} color="#000" />
                </TouchableOpacity>

                <View style={{ width: '80%' }}>
                    <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '700', color: '#000', textAlign: 'center' }}>Profile</Text>
                </View>

                <View style={{ width: '10%' }} />
            </View>

            {/* Main Profile Content */}
            <View style={{ flex: 1, paddingHorizontal: 10, }}>
                {/* Profile section */}
                <View style={{ alignItems: 'center', marginBottom: 20 }}>
                    <View style={{ borderRadius: 50, width: 90, height: 90, borderColor: green, borderWidth: 2 }}>
                        <Image
                            source={require('../assets/avatar.png')}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </View>

                    <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: 'bold', color: '#000', marginTop: 5 }}>{userDetails?.[0]?.name?.name}</Text>

                    <Text style={{ fontSize: responsiveFontSize(1.7), color: 'gray', }}>{userDetails?.[0]?.name?.email}</Text>
                </View>

                {/* Personal Information */}
                <LinearGradient
                    colors={['#bbe0a8', '#FFFFFF', '#bbe0a8']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        borderRadius: 12,
                        padding: 20,
                        flexDirection: 'column',
                        elevation: 1,
                        marginHorizontal: 15
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#333', fontWeight: '500' }}>Name:</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '600' }}>{userDetails?.[0]?.name?.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#333', fontWeight: '500' }}>Phone:</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '600' }}>+91 {userDetails?.[0]?.name?.mobile}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#333', fontWeight: '500' }}>Tasks completed:</Text>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '600' }}>{userDetails?.[0]?.name?.completed_tasks}</Text>
                    </View>
                </LinearGradient>

                {/* Quotation History */}
                <TouchableOpacity onPress={() => navigation.navigate('TaskHistory')} style={{ backgroundColor: '#fff', borderRadius: 12, marginTop: 15, padding: 8, elevation: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <View style={{ backgroundColor: '#bce1a9', width: 27, height: 27, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                        <MaterialCommunityIcons name="history" size={16} color="#000" />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={{ color: '#000', fontWeight: '500' }}>Quotation History</Text>
                    </View>

                    <Icon name="keyboard-arrow-right" size={23} color="#000" />
                </TouchableOpacity>
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
    fontSize: responsiveFontSize(2.1),
    fontWeight: '600',
    marginBottom: 5,
    color: '#000',
};

const collectionCardStyle = (bgColor) => ({
    backgroundColor: bgColor,
    width: '48%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 1,
});

const collectionCardTextStyle = {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '500',
    color: '#515151',
    textAlign: 'center',
};

const collectionAmountStyle = {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '600',
    color: '#000',
};
import { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/AntDesign';
import { green, sidebarBackground } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/UserSlice';
import Toast from 'react-native-toast-message';
import { fetchLogOut } from '../utils/fetchLogOut';

const Sidebar = ({ isOpen, closeSidebar, navigation, activeItem }) => {

    const userDetails = useSelector(state => state.user);
    console.log('userDetails: ', userDetails);

    const dispatch = useDispatch();

    const sidebarAnim = useRef(new Animated.Value(-Dimensions.get('window').width * 0.6)).current;

    // Animate sidebar on open/close
    const animateSidebar = () => {
        Animated.timing(sidebarAnim, {
            toValue: isOpen ? 0 : -Dimensions.get('window').width * 0.6,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    // Call animation on mount
    useEffect(() => {
        animateSidebar();
    }, [isOpen]);

    const itemStyle = (item) => ({
        flexDirection: 'row',
        marginVertical: 6,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: activeItem === item ? green : 'white',
        paddingHorizontal: 8,
        borderRadius: 10,
        elevation: activeItem === item ? 1 : 0,
    });

    const logoutHandler = async () => {
        closeSidebar;

        try {
            dispatch(logoutUser());
            await AsyncStorage.removeItem('userDetails');

            navigation.navigate('Login');
        } catch {
            Toast.show({
                type: 'error',
                text1: 'Failed to log out',
                text2: `Error: 'Network Error. Please try again'`, // Show error message
                position: 'top', // Show toast at the top
                topOffset: 5, // Adjust position slightly down from the top
            });
        }
    }

    return (
        <>
            <Animated.View
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: Dimensions.get('window').width * 0.6,
                    backgroundColor: sidebarBackground,
                    transform: [{ translateX: sidebarAnim }],
                    zIndex: 2,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    paddingBottom: 8,
                }}
            >
                <View style={{ flex: 1, paddingVertical: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5 }}>
                        <Image
                            source={require("../assets/logo.png")}
                            style={{
                                width: 100,
                                height: 30,
                                resizeMode: 'contain',
                            }}
                        />

                        <TouchableOpacity onPress={closeSidebar} style={{ marginRight: 6, borderRadius: 8, backgroundColor: '#000', width: 25, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon4 name="close" size={17} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* Sidebar Items */}
                    <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
                        <TouchableOpacity onPress={() => { closeSidebar(); navigation.navigate('Home'); }} style={itemStyle('Home')}>
                            <Icon name="today" size={19} color={'#000'} style={{ marginRight: 8 }} />
                            <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>Today's Tasks</Text>
                        </TouchableOpacity>

                        {/* New Delivered Orders item */}
                        <TouchableOpacity onPress={() => { closeSidebar(); navigation.navigate('Quotation'); }} style={itemStyle('DeliveredOrders')}>
                            <Icon name="receipt" size={19} color={'#000'} style={{ marginRight: 8 }} />
                            <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>Quotation</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { closeSidebar(); navigation.navigate('Clients'); }} style={itemStyle('Clients')}>
                            <Icon name="receipt" size={19} color={'#000'} style={{ marginRight: 8 }} />
                            <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>Clients</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { closeSidebar(); navigation.navigate('Profile'); }} style={itemStyle('Profile')}>
                            <Icon name="person" size={19} color={'#000'} style={{ marginRight: 8 }} />
                            <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Logout */}
                <TouchableOpacity onPress={logoutHandler} style={{ borderColor: '#b6251d', borderWidth: 1.5, flexDirection: 'row', padding: 10, marginVertical: 5, alignItems: 'center', backgroundColor: '#f8d3d1', borderRadius: 10, marginHorizontal: 10 }}>
                    <Icon3 name="log-out" size={22} color="#000" style={{ marginRight: 5 }} />
                    <Text style={{ fontSize: responsiveFontSize(2.2), color: '#333', fontWeight: '600' }}>Log Out</Text>
                </TouchableOpacity>
            </Animated.View>

            {/* Dim Background and Close Sidebar on Outside Press */}
            {isOpen && (
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        zIndex: 1,
                    }}
                    onPress={closeSidebar}
                />
            )}
        </>
    );
};

export default Sidebar;
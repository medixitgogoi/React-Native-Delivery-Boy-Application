import { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Dimensions, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Octicons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { green, purple } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const Sidebar = ({ isOpen, toggleSidebar, closeSidebar, navigation, activeItem }) => {

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

    return (
        <>
            <Animated.View
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: Dimensions.get('window').width * 0.6,
                    backgroundColor: '#F4F5FA',
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
                            source={require("../assets/splashLogo.png")}
                            style={{
                                width: 100,
                                height: 30,
                                resizeMode: 'contain',
                            }}
                        />
                        <TouchableOpacity onPress={closeSidebar} style={{ paddingRight: 5 }}>
                            <Icon2 name="sidebar-expand" size={16} color="#000" />
                        </TouchableOpacity>
                    </View>

                    {/* Sidebar Items */}
                    <View style={{ marginTop: 25, paddingHorizontal: 10 }}>
                        <TouchableOpacity onPress={() => { closeSidebar(); navigation.navigate('Home'); }} style={itemStyle('Home')}>
                            <Icon name="today" size={20} color={'#000'} style={{ marginRight: 8 }} />
                            <Text style={{ fontSize: responsiveFontSize(2), color: '#000', fontWeight: '500' }}>Today's Orders</Text>
                        </TouchableOpacity>

                        {/* New Delivered Orders item */}
                        <TouchableOpacity onPress={() => { closeSidebar(); navigation.navigate('DeliveredOrders'); }} style={itemStyle('DeliveredOrders')}>
                            <Icon name="receipt" size={20} color={'#000'} style={{ marginRight: 8 }} />
                            <Text style={{ fontSize: responsiveFontSize(2), color: '#000', fontWeight: '500' }}>Delivered Orders</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { closeSidebar(); navigation.navigate('Profile'); }} style={itemStyle('Profile')}>
                            <Icon name="person" size={20} color={'#000'} style={{ marginRight: 8 }} />
                            <Text style={{ fontSize: responsiveFontSize(2), color: '#000', fontWeight: '500' }}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity onPress={closeSidebar} style={{ flexDirection: 'row', paddingVertical: 10, marginVertical: 5, alignItems: 'center', backgroundColor: purple, paddingHorizontal: 8, borderRadius: 10, marginHorizontal: 10 }}>
                    <Icon3 name="log-out" size={25} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={{ fontSize: responsiveFontSize(2.2), color: '#fff', fontWeight: '500' }}>Log Out</Text>
                </TouchableOpacity>
            </Animated.View>

            {/* Dim Background and Close Sidebar on Outside Press */}
            {isOpen && (
                <Pressable
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

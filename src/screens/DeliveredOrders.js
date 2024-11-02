import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Sidebar from '../components/Sidebar';
import Icon2 from 'react-native-vector-icons/Octicons';
import { green, purple } from '../utils/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import Icon6 from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/Entypo';
import { orders } from '../utils/data';

const DeliveredOrders = () => {

    const navigation = useNavigation();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [deliveredOrders, setDeliveredOrders] = useState([]);

    useFocusEffect(
        useCallback(() => {
            setDeliveredOrders(orders);
        }, [])
    );

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
                    <Icon3 name="user" size={18} color="#9d9d9d" style={{ marginRight: 5 }} />
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

    const onDateChange = (event, date) => {
        setShowDatePicker(false);
        if (date) {
            setSelectedDate(date);

            // Format the new date to match the deliveryDate format in ordersData
            const selectedDat = date.toLocaleDateString();

            // Filter orders based on the new selected date
            const filtered = deliveredOrders.filter(order => {
                return order.deliveryDate === selectedDat;
            });

            setFilteredOrders(filtered);
        }
    };

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
            <View style={{
                marginTop: 10,
                paddingHorizontal: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
                width: '100%'
            }}>
                {/* Sidebar Toggle Button */}
                <TouchableOpacity
                    onPress={toggleSidebar}
                    style={{ height: 30, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
                >
                    <Icon2 name="sidebar-collapse" size={16} color="#000" />
                </TouchableOpacity>

                {/* Delivered Orders Text Centered */}
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '700', color: purple }}>
                        Delivered Orders
                    </Text>
                </View>

                {/* Date Picker Button */}
                <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    style={{
                        alignItems: 'center',
                        paddingVertical: 5,
                        paddingHorizontal: 8,
                        backgroundColor: '#e0e7ff',  // Light purple background
                        borderRadius: 7,
                        borderColor: '#6b46c1',  // Darker purple border
                        borderWidth: 1,
                    }}
                >
                    <Text style={{ fontSize: responsiveFontSize(1.5), color: '#6b46c1', fontWeight: '600' }}>
                        Select Date
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Date Picker Modal */}
            {showDatePicker && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="calendar"
                    onChange={onDateChange}
                />
            )}

            {/* Date showing */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, gap: 5, marginBottom: 10 }}>
                <Text style={{ color: '#000', fontWeight: '500' }}>Your delivered orders on:</Text>
                <View style={{ backgroundColor: purple, padding: 5, borderRadius: 6 }}>
                    <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.4), fontWeight: '600' }}>{selectedDate.toLocaleDateString()}</Text>
                </View>
            </View>

            {/* Delivered Orders List */}
            <FlatList
                data={filteredOrders}
                renderItem={renderOrderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingVertical: 10, gap: 10, paddingHorizontal: 15 }}
                ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: 16, color: '#9d9d9d', marginTop: 20 }}>No delivered orders found.</Text>}
            />
        </View>
    );
};

export default DeliveredOrders;

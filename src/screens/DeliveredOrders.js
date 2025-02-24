import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Sidebar from '../components/Sidebar';
import Icon2 from 'react-native-vector-icons/Octicons';
import { background, green, purple } from '../utils/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import Icon6 from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/Entypo';
import { deliveredOrdersData } from '../utils/deliveredOrdersData';

const DeliveredOrders = () => {

    const navigation = useNavigation();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [deliveredOrders, setDeliveredOrders] = useState([]);

    // useFocusEffect and useCallback
    useFocusEffect(
        useCallback(() => {
            setDeliveredOrders(deliveredOrdersData);
            setFilteredOrders(deliveredOrdersData);
        }, [])
    );

    // toggleSidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // closeSidebar
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    // renderOrderItem
    const renderOrderItem = ({ item }) => (
        <View style={{
            backgroundColor: '#FFF',
            borderRadius: 12,
            paddingHorizontal: 20,
            paddingVertical: 15,
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
                top: 12,
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
                    backgroundColor: item.paymentStatus.method === 'COD' ? '#FFE8E6' : '#E6FAFB',
                    paddingVertical: 3,
                    paddingHorizontal: 6,
                    borderRadius: 5,
                    borderColor: item.paymentStatus.method === 'COD' ? '#ff7468' : '#1eb6bd',
                    borderWidth: 0.5,
                    marginLeft: 6,
                }}>
                    <Text style={{
                        fontSize: responsiveFontSize(1.4),
                        color: item.paymentStatus.method === 'COD' ? '#ff7468' : '#1eb6bd',
                        fontWeight: '500'
                    }}>
                        {item?.paymentStatus.method === 'UPI' ? 'Paid via UPI' : 'Paid via COD'}
                    </Text>
                </View>
            </View>
        </View>
    );

    // onDateChange function
    const onDateChange = (event, date) => {
        setShowDatePicker(false);
        if (date) {
            setSelectedDate(date);
            setDate(date);

            // Format the new date to match the deliveryDate format in ordersData
            const selectedDat = date.toLocaleDateString();

            // Filter orders based on the new selected date
            const filtered = deliveredOrders?.filter(order => {
                return order.deliveryDate === selectedDat;
            });

            setFilteredOrders(filtered);
        }
    };

    // totalCashCollection
    const totalCashCollection = filteredOrders.reduce((sum, order) => {
        if (order.paymentStatus.method === 'COD' && order.paymentStatus.details.paidVia === 'Cash') {
            return sum + parseFloat(order.paymentStatus.details.amount.replace('₹', ''));
        }
        return sum;
    }, 0);

    return (
        <View style={{ flex: 1, backgroundColor: background, }}>
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
                width: '100%',
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
                    style={{ height: 30, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
                >
                    <Icon name="date-range" size={20} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Date Picker Modal */}
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="calendar"
                    onChange={onDateChange}
                />
            )}

            {/* Sub header */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingVertical: 8,
                backgroundColor: '#fff',
                borderRadius: 8,
                marginHorizontal: 15,
                marginBottom: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 1,
            }}>
                {/* Total Cash Collection */}
                <View style={{ alignItems: 'center', flexDirection: 'row', gap: 4 }}>
                    <Text style={{ fontSize: responsiveFontSize(1.7), fontWeight: '600', color: '#333' }}>Total Cash Collection:</Text>

                    <View style={{ backgroundColor: '#000', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 4 }}>
                        <Text style={{ fontSize: responsiveFontSize(1.6), fontWeight: '600', color: '#fff' }}>₹{totalCashCollection?.toFixed(2)}</Text>
                    </View>
                </View>

                {/* on */}
                <Text style={{ fontSize: responsiveFontSize(1.8), fontWeight: '500', color: '#000' }}>on</Text>

                {/* Selected Date */}
                <View style={{ backgroundColor: '#000', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 5, elevation: 1 }}>
                    <Text style={{ fontSize: responsiveFontSize(1.6), fontWeight: '600', color: '#fff' }}>
                        {selectedDate ? selectedDate.toLocaleDateString() : 'All Orders'}
                    </Text>
                </View>
            </View>

            {/* Delivered Orders List */}
            <FlatList
                data={filteredOrders}
                renderItem={renderOrderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ gap: 10, paddingHorizontal: 15, paddingVertical: 1, paddingBottom: 10 }}
                ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: responsiveFontSize(1.8), color: '#737373', marginTop: 20 }}>No delivered orders found on {selectedDate?.toLocaleDateString()}.</Text>}
            />
        </View>
    );
};

export default DeliveredOrders;
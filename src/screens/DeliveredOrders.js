import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation, validatePathConfig } from '@react-navigation/native';
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

const ordersData = [
    {
        id: '1',
        customerName: 'Nick Adams',
        location: '123 Main St, Springfield',
        orderDescription: 'Apples, Orange Juice',
        deliveryTime: '2:00 PM',
        price: '₹15.00',
        paymentStatus: 'COD',
        deliveryDate: '01/11/2024',
    },
    {
        id: '2',
        customerName: 'Anthony Adverse',
        location: '456 Elm St, Springfield',
        orderDescription: 'Bread, Milk',
        deliveryTime: '3:30 PM',
        price: '₹12.50',
        paymentStatus: 'UPI',
        deliveryDate: '01/11/2024',
    },
    {
        id: '3',
        customerName: 'Sarah Johnson',
        location: '789 Maple St, Springfield',
        orderDescription: 'Eggs, Flour, Sugar',
        deliveryTime: '4:00 PM',
        price: '₹20.00',
        paymentStatus: 'COD',
        deliveryDate: '01/11/2024',
    },
    {
        id: '4',
        customerName: 'Michael Brown',
        location: '101 Oak St, Springfield',
        orderDescription: 'Chicken, Rice, Vegetables',
        deliveryTime: '5:15 PM',
        price: '₹30.75',
        paymentStatus: 'UPI',
        deliveryDate: '02/11/2024',
    },
    {
        id: '5',
        customerName: 'Emily White',
        location: '202 Pine St, Springfield',
        orderDescription: 'Pasta, Tomato Sauce',
        deliveryTime: '6:45 PM',
        price: '₹18.50',
        paymentStatus: 'COD',
        deliveryDate: '02/11/2024',
    },
    {
        id: '6',
        customerName: 'Jessica Smith',
        location: '303 Cedar St, Springfield',
        orderDescription: 'Rice, Lentils',
        deliveryTime: '7:30 PM',
        price: '₹22.00',
        paymentStatus: 'UPI',
        deliveryDate: '02/11/2024',
    },
    {
        id: '7',
        customerName: 'Robert Johnson',
        location: '404 Birch St, Springfield',
        orderDescription: 'Beef, Broccoli',
        deliveryTime: '8:00 PM',
        price: '₹35.00',
        paymentStatus: 'COD',
        deliveryDate: '03/11/2024',
    },
    {
        id: '8',
        customerName: 'Linda Davis',
        location: '505 Spruce St, Springfield',
        orderDescription: 'Fish, Chips',
        deliveryTime: '9:15 PM',
        price: '₹40.50',
        paymentStatus: 'UPI',
        deliveryDate: '03/11/2024',
    },
    {
        id: '9',
        customerName: 'Charles Miller',
        location: '606 Ash St, Springfield',
        orderDescription: 'Tacos, Salsa',
        deliveryTime: '10:00 PM',
        price: '₹28.75',
        paymentStatus: 'COD',
        deliveryDate: '03/11/2024',
    },
    {
        id: '10',
        customerName: 'Laura Garcia',
        location: '707 Walnut St, Springfield',
        orderDescription: 'Salad, Dressing',
        deliveryTime: '11:30 AM',
        price: '₹10.00',
        paymentStatus: 'UPI',
        deliveryDate: '04/11/2024',
    },
    {
        id: '11',
        customerName: 'James Wilson',
        location: '808 Cherry St, Springfield',
        orderDescription: 'Cookies, Milk',
        deliveryTime: '12:15 PM',
        price: '₹5.50',
        paymentStatus: 'COD',
        deliveryDate: '04/11/2024',
    },
    {
        id: '12',
        customerName: 'Patricia Martinez',
        location: '909 Peach St, Springfield',
        orderDescription: 'Chocolate Cake',
        deliveryTime: '1:00 PM',
        price: '₹35.00',
        paymentStatus: 'UPI',
        deliveryDate: '05/11/2024',
    },
    {
        id: '13',
        customerName: 'Michael Thompson',
        location: '1010 Lemon St, Springfield',
        orderDescription: 'Pizza, Garlic Bread',
        deliveryTime: '2:30 PM',
        price: '45.00',
        paymentStatus: 'COD',
        deliveryDate: '05/11/2024',
    },
    {
        id: '14',
        customerName: 'Jennifer White',
        location: '1111 Apricot St, Springfield',
        orderDescription: 'Sushi, Soy Sauce',
        deliveryTime: '3:45 PM',
        price: '₹50.00',
        paymentStatus: 'UPI',
        deliveryDate: '06/11/2024',
    },
    {
        id: '15',
        customerName: 'William Harris',
        location: '1212 Plum St, Springfield',
        orderDescription: 'Burger, Fries',
        deliveryTime: '5:00 PM',
        price: '₹25.00',
        paymentStatus: 'COD',
        deliveryDate: '06/11/2024',
    },
    {
        id: '16',
        customerName: 'Susan Clark',
        location: '1313 Fig St, Springfield',
        orderDescription: 'Spaghetti, Meatballs',
        deliveryTime: '6:30 PM',
        price: '₹30.00',
        paymentStatus: 'UPI',
        deliveryDate: '07/11/2024',
    },
    {
        id: '17',
        customerName: 'David Lewis',
        location: '1414 Date St, Springfield',
        orderDescription: 'Chicken Wings',
        deliveryTime: '7:45 PM',
        price: '₹22.50',
        paymentStatus: 'COD',
        deliveryDate: '08/11/2024',
    },
    {
        id: '18',
        customerName: 'Barbara Young',
        location: '1515 Kiwi St, Springfield',
        orderDescription: 'Pancakes, Syrup',
        deliveryTime: '8:30 AM',
        price: '₹15.00',
        paymentStatus: 'UPI',
        deliveryDate: '08/11/2024',
    },
    {
        id: '19',
        customerName: 'Joseph Walker',
        location: '1616 Coconut St, Springfield',
        orderDescription: 'Steak, Potatoes',
        deliveryTime: '9:30 PM',
        price: '₹75.00',
        paymentStatus: 'COD',
        deliveryDate: '09/11/2024',
    },
    {
        id: '20',
        customerName: 'Margaret Hall',
        location: '1717 Olive St, Springfield',
        orderDescription: 'Vegetable Stir Fry',
        deliveryTime: '10:30 AM',
        price: '₹20.00',
        paymentStatus: 'UPI',
        deliveryDate: '10/11/2024',
    },
];

const DeliveredOrders = () => {

    const navigation = useNavigation();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [filteredOrders, setFilteredOrders] = useState(ordersData);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

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
            // Update the selected date state
            setSelectedDate(date);

            // Set the time to midnight for comparison
            const selectedDat = selectedDate.toLocaleDateString(); // Format the date correctly

            console.log('selectedDate: ', selectedDat);

            // Filter orders based on the selected date
            const filtered = ordersData.filter(order => {
                // Convert the order's deliveryDate to a Date object and then to a string
                // const orderDate = new Date(order.deliveryDate).setHours(0, 0, 0, 0);
                return order.deliveryDate === selectedDat; // Compare the two midnight times
            });

            setFilteredOrders(filtered);
            console.log('filtered', filtered);
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
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        backgroundColor: '#e0e7ff',  // Light purple background
                        borderRadius: 10,
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

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, gap: 5 }}>
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
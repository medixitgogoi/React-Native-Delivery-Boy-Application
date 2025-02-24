import { View, Text, ScrollView, StatusBar, TouchableOpacity, FlatList } from 'react-native';
import Sidebar from '../components/Sidebar';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon2 from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import Icon5 from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon6 from 'react-native-vector-icons/FontAwesome5';
import { useCallback, useState } from 'react';
import { green } from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { fetchQuotationHistory } from '../utils/fetchQuotationHistory';

const tasks = [
    {
        id: 1,
        title: "Deliver Groceries",
        description: "Deliver groceries to Anil Kumar at 15 MG Road.",
        assignedDate: "2025-01-03",
        dueTime: "10:30 AM",
        status: "Pending",
        location: {
            address: "15 MG Road, Bengaluru, Karnataka",
            coordinates: { latitude: 12.9716, longitude: 77.5946 },
        },
        customerContact: "9876543210",
    },
    {
        id: 2,
        title: "Pick Up Laundry",
        description: "Pick up laundry from Priya Sharma at 22 Lajpat Nagar.",
        assignedDate: "2025-01-03",
        dueTime: "11:00 AM",
        status: "In Progress",
        location: {
            address: "22 Lajpat Nagar, New Delhi",
            coordinates: { latitude: 28.5672, longitude: 77.2273 },
        },
        customerContact: "8765432190",
    },
    {
        id: 3,
        title: "Deliver Medicine",
        description: "Deliver prescribed medicine to Rajesh Verma at 8 Sector 45.",
        assignedDate: "2025-01-03",
        dueTime: "12:00 PM",
        status: "Completed",
        location: {
            address: "8 Sector 45, Gurugram, Haryana",
            coordinates: { latitude: 28.4595, longitude: 77.0266 },
        },
        customerContact: "7654321098",
    },
    {
        id: 4,
        title: "Pick Up Parcel",
        description: "Pick up a parcel from Kavita Iyer at 19 Nungambakkam.",
        assignedDate: "2025-01-03",
        dueTime: "1:30 PM",
        status: "Pending",
        location: {
            address: "19 Nungambakkam, Chennai, Tamil Nadu",
            coordinates: { latitude: 13.0604, longitude: 80.2496 },
        },
        customerContact: "6543210987",
    },
    {
        id: 5,
        title: "Deliver Documents",
        description: "Deliver legal documents to Arjun Singh at 45 Civil Lines.",
        assignedDate: "2025-01-03",
        dueTime: "3:00 PM",
        status: "In Progress",
        location: {
            address: "45 Civil Lines, Jaipur, Rajasthan",
            coordinates: { latitude: 26.9124, longitude: 75.7873 },
        },
        customerContact: "5432109876",
    },
    {
        id: 6,
        title: "Deliver Cake",
        description: "Deliver birthday cake to Meena Joshi at 33 FC Road.",
        assignedDate: "2025-01-03",
        dueTime: "4:00 PM",
        status: "Pending",
        location: {
            address: "33 FC Road, Pune, Maharashtra",
            coordinates: { latitude: 18.5204, longitude: 73.8567 },
        },
        customerContact: "4321098765",
    },
    {
        id: 7,
        title: "Pick Up Vegetables",
        description: "Pick up fresh vegetables from Shalini Agarwal at 29 Salt Lake.",
        assignedDate: "2025-01-03",
        dueTime: "5:30 PM",
        status: "Completed",
        location: {
            address: "29 Salt Lake, Kolkata, West Bengal",
            coordinates: { latitude: 22.5726, longitude: 88.3639 },
        },
        customerContact: "3210987654",
    },
    {
        id: 8,
        title: "Deliver Clothes",
        description: "Deliver clothes to Ramesh Patel at 55 Paldi.",
        assignedDate: "2025-01-03",
        dueTime: "6:00 PM",
        status: "Pending",
        location: {
            address: "55 Paldi, Ahmedabad, Gujarat",
            coordinates: { latitude: 23.0225, longitude: 72.5714 },
        },
        customerContact: "2109876543",
    },
    {
        id: 9,
        title: "Deliver Package",
        description: "Deliver package to Sunita Nair at 18 Marine Drive.",
        assignedDate: "2025-01-03",
        dueTime: "7:00 PM",
        status: "In Progress",
        location: {
            address: "18 Marine Drive, Mumbai, Maharashtra",
            coordinates: { latitude: 19.0760, longitude: 72.8777 },
        },
        customerContact: "1098765432",
    },
    {
        id: 10,
        title: "Pick Up Books",
        description: "Pick up books from Vijay Gupta at 12 Hazratganj.",
        assignedDate: "2025-01-03",
        dueTime: "8:00 PM",
        status: "Completed",
        location: {
            address: "12 Hazratganj, Lucknow, Uttar Pradesh",
            coordinates: { latitude: 26.8467, longitude: 80.9462 },
        },
        customerContact: "0987654321",
    },
];

const TaskHistory = ({ navigation }) => {

    const userDetails = useSelector(state => state.user);

    const [quotations, setQuotations] = useState([]);
    const [loading, setLoading] = useState(true);

    // Map paymentMode to string
    const getPaymentMode = (mode) => {
        switch (mode) {
            case "1": return 'NEFT';
            case "2": return 'RTGS';
            case "3": return 'CREDIT';
            default: return 'Unknown';
        }
    };

    // Fetch quotations
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    setLoading(true); // Set loading to true when fetching starts
                    const data = await fetchQuotationHistory(userDetails);

                    console.log('quotations data: ', data);

                    setQuotations(data);
                } catch (error) {
                    console.log('Error fetching quotations: ', error?.message);
                } finally {
                    setLoading(false); // Set loading to false after fetching
                }
            };

            fetchData();

        }, [userDetails]) // Include userDetails in the dependency array
    );

    // Render skeleton loader
    const renderSkeletonLoader = () => (
        Array.from({ length: 4 }).map((_, index) => (
            <ShimmerPlaceholder
                key={index}
                style={{
                    marginBottom: 10,
                    height: 120,
                    borderRadius: 12,
                    width: '100%',
                    alignSelf: 'center',
                }}
            />
        ))
    );

    // Render a single quotation item
    const renderQuotationItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('QuotationDetails', { id: item?.id })}
            activeOpacity={0.8} // Adjust for feedback on press
        >
            <LinearGradient
                colors={['#ffffff', '#f9f9f9']}
                style={{
                    marginBottom: 10,
                    padding: 16,
                    borderRadius: 12,
                    elevation: 2,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                    flexDirection: 'column',
                    borderWidth: 1,
                    borderColor: '#e0e0e0',
                }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name="business" size={20} color="#4CAF50" />
                        <Text style={{ marginLeft: 10, fontSize: responsiveFontSize(2), fontWeight: '600', color: '#000' }}>
                            {item?.company_name}
                        </Text>
                    </View>

                    {/* <Text style={{ fontSize: responsiveFontSize(1.7), color: '#757575' }}>
                        {new Date(item?.created_at).toLocaleDateString()}
                    </Text> */}
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Feather name="dollar-sign" size={18} color="#4CAF50" />
                    <Text style={{ marginLeft: 10, fontSize: responsiveFontSize(1.8), color: '#000' }}>
                        Payment Mode: {getPaymentMode(item?.payment_mode)}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <AntDesign name="warning" size={18} color="#FF5722" />
                    <Text style={{ marginLeft: 10, fontSize: responsiveFontSize(1.8), color: '#000' }}>
                        Breakage: {item?.breakage}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="calendar" size={18} color="#3F51B5" />
                    <Text style={{ marginLeft: 10, fontSize: responsiveFontSize(1.8), color: '#000' }}>
                        Validity: {item?.validity} days
                    </Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#F4F5FA', paddingHorizontal: 10 }}>
            {/* Header */}
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, width: '100%' }}>
                <TouchableOpacity style={{ borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: '#daeecf', borderColor: green, borderWidth: 1 }} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" style={{ color: '#000' }} size={16} />
                </TouchableOpacity>

                <View style={{ width: '80%' }}>
                    <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '700', color: '#000', textAlign: 'center' }}>Quotation History</Text>
                </View>

                <View style={{ width: '10%' }}></View>
            </View>

            {/* FlatList or Skeleton */}
            {loading ? (
                <View style={{ paddingVertical: 10 }}>
                    {renderSkeletonLoader()}
                </View>
            ) : (
                <FlatList
                    data={quotations}
                    renderItem={renderQuotationItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 1, marginTop: 5 }}
                />
            )}
        </View>
    )
}

export default TaskHistory;
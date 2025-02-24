import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { background, green } from '../utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import { fetchQuotationHistory } from '../utils/fetchQuotationHistory';
import { useSelector } from 'react-redux';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { useFocusEffect } from '@react-navigation/native';

const Quotation = ({ navigation }) => {

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

            // Optionally return a cleanup function if needed
            return () => {
                // Cleanup logic if necessary
            };
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
        <View style={{ flex: 1, backgroundColor: background, paddingHorizontal: 8 }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5, width: '100%' }}>
                <TouchableOpacity
                    style={{ borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: '#daeecf', borderColor: green, borderWidth: 1 }}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="arrowleft" style={{ color: '#000' }} size={16} />
                </TouchableOpacity>

                <View style={{ width: '80%' }}>
                    <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '700', color: '#000', textAlign: 'center' }}>Quotation</Text>
                </View>
                
                <View style={{ width: 30, height: 30 }} />
            </View>

            {/* Add Quotation button */}
            <LinearGradient
                colors={['#c8e6b9', green]}
                style={{
                    width: '100%', height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 10,
                    elevation: 3, flexDirection: 'row', borderColor: '#569635', borderWidth: 1, overflow: 'hidden', marginTop: 10
                }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <TouchableOpacity
                    style={{
                        paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8,
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', gap: 5,
                    }}
                    onPress={() => navigation.navigate('AddQuotation')}
                >
                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2.1), fontWeight: '600' }}>Add New Quotation</Text>
                    <AntDesign name="plussquare" size={18} color="#000" />
                </TouchableOpacity>
            </LinearGradient>

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
    );
};

export default Quotation;
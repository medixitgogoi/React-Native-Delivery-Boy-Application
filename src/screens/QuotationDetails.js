import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { background, green } from '../utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import RenderHTML from 'react-native-render-html';

const QuotationDetails = ({ route, navigation }) => {

    const { id } = route.params;

    const { width } = useWindowDimensions(); // Get screen width for RenderHTML

    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchQuotationDetails = async () => {
        try {
            const data = {
                quotation_id: id,
            };

            const response = await axios.post(`/api/user/quotation/details`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('quotationDetails: ', response?.data?.data);

            setDetails(response.data?.data || {});
        } catch (error) {
            console.log('Error: ', error?.response);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchQuotationDetails();
        }, [id])
    );

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={green} />
            </View>
        );
    }

    if (!details) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>No details available.</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: background, paddingHorizontal: 10 }}>
            {/* Header */}
            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, width: '100%' }}>
                <TouchableOpacity style={{ borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: '#daeecf', borderColor: green, borderWidth: 1 }} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" style={{ color: '#000' }} size={16} />
                </TouchableOpacity>

                <View style={{ width: '80%' }}>
                    <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '700', color: '#000', textAlign: 'center' }}>Quotation Details</Text>
                </View>

                <View style={{ width: '10%' }}></View>
            </View>

            {/* Client Info Section */}
            <View style={{ marginBottom: 20 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 10 }}>
                    <View style={{ backgroundColor: '#cfe9c1', borderColor: green, borderWidth: 0.5, width: 20, height: 20, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name="place" size={15} color="#000" />
                    </View>
                    <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', color: '#000' }}>
                        {details.company_name}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 10 }}>
                    <View style={{ backgroundColor: '#cfe9c1', borderColor: green, borderWidth: 0.5, width: 20, height: 20, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name="business" size={15} color="#000" />
                    </View>
                    <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', color: '#000', width: '90%' }}>
                        {details.client_address}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                    <View style={{ backgroundColor: '#cfe9c1', borderColor: green, borderWidth: 0.5, width: 20, height: 20, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name="phone" size={15} color="#000" />
                    </View>
                    <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', color: '#000' }}>
                        {details.client_mobile}
                    </Text>
                </View>
            </View>

            {/* Bank Details Section */}
            <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                    <View style={{ backgroundColor: '#cfe9c1', borderColor: green, borderWidth: 0.5, width: 20, height: 20, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name="account-balance" size={17} color="#000" />
                    </View>
                    <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '600', color: '#000' }}>
                        Bank Details :
                    </Text>
                </View>

                <View style={{ paddingLeft: 26 }}>
                    <RenderHTML
                        contentWidth={width} // Use device width
                        source={{ html: `<div style="color: black; font-size: 12px; margin: 0;">${details?.bank_details}</div>` }} // Render the HTML disclaimer
                        tagsStyles={{
                            div: { color: 'black', fontSize: 16, lineHeight: 24 }, // Ensure black text with proper spacing
                        }}
                    />
                </View>
            </View>

            {/* Quotation Items Section */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 10 }}>
                <View style={{ backgroundColor: '#cfe9c1', borderColor: green, borderWidth: 0.5, width: 20, height: 20, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="category" size={15} color="#000" />
                </View>
                <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '600', color: '#000' }}>
                    Product Details :
                </Text>
            </View>

            <FlatList
                data={details.detail}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View
                        style={{
                            padding: 10,
                            borderWidth: 1,
                            borderColor: '#dee2e6',
                            borderRadius: 12,
                            backgroundColor: '#e9f5e3',
                            borderColor: green,
                            borderWidth: 1
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 10 }}>
                            <View style={{ backgroundColor: '#cfe9c1', borderColor: green, borderWidth: 0.5, width: 20, height: 20, borderRadius: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name="widgets" size={15} color="#000" />
                            </View>
                            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', color: '#000' }}>
                                {item.product}                            </Text>
                        </View>

                        <Text style={{ color: 'black' }}>Size: {item.size}</Text>

                        <Text style={{ color: 'black' }}>Rate: {item.rate}</Text>
                    </View>
                )}
                contentContainerStyle={{ gap: 10 }}
            />
        </View>
    );
};

export default QuotationDetails;
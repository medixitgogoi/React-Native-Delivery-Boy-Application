import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import Icon2 from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import Icon5 from 'react-native-vector-icons/Entypo';
import Icon6 from 'react-native-vector-icons/AntDesign';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { purple, green } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const Delivery = ({ route }) => {

    const navigation = useNavigation();

    const order = route.params.data;

    const [isDelivered, setIsDelivered] = useState(false);
    const [upi, setUpi] = useState(false);
    const [paymentMode, setPaymentMode] = useState(null);

    const handleDeliveryConfirmation = () => {
        setIsDelivered(true);
        Alert.alert('Order Delivered', 'The order has been marked as delivered.');
    };

    const handleUpiPayment = () => {
        setUpi(prev => !prev);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F5FA', padding: 12 }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '700', color: purple, textAlign: 'center', flex: 1 }}>Order Details</Text>
            </View>

            {/* Customer Details */}
            <View style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, borderRadius: 15, elevation: 2 }}>
                <LinearGradient
                    colors={['#c9f5f7', '#FFFFFF', '#b9f2f5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        borderRadius: 15,
                        padding: 20,
                        flexDirection: 'column',
                    }}
                >
                    {/* Customer Details */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                            <Icon3 name="user" size={18} color="#9d9d9d" style={{ marginRight: 5 }} />
                            <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: '700', color: '#9f6efe' }}>{order.customerName}</Text>
                        </View>
                    </View>

                    {/* Location */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 12 }}>
                        <Icon4 name="location-dot" size={18} color="#9d9d9d" style={{ marginRight: 5 }} />
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>{order.location}</Text>
                    </View>

                    {/* Order Description */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 12 }}>
                        <Icon5 name="box" size={15} color="#9d9d9d" style={{ marginRight: 5 }} />
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>{order.orderDescription}</Text>
                    </View>

                    {/* Price and Payment Status */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                            <Icon4 name="money-bill" size={15} color="#9d9d9d" style={{ marginRight: 5 }} />
                            <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>{order?.price}</Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>

            {/* Conditional Payment/Delivery Options */}
            {order.paymentStatus === 'COD' && (
                <View style={{ marginTop: 30 }}>
                    <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: '600', color: "#000", marginBottom: 10 }}>Collect Payment</Text>

                    <View style={{ flexDirection: 'row', gap: 15, marginBottom: 30, alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => {
                                setPaymentMode(1)
                                handleUpiPayment()
                            }}
                            style={{
                                backgroundColor: paymentMode === 1 ? '#4CAF50' : green, // Highlighted color when selected
                                borderColor: '#18a0a6',
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 10,
                                width: '48%',
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                gap: 5
                            }}
                        >
                            <Icon3 name="money" size={20} color="#000" />
                            <Text style={{ color: '#000', fontWeight: '600' }}>By Cash</Text>
                            {paymentMode === 1 && <Icon6 name="checkcircle" size={20} color="#000" />}
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                setPaymentMode(2)
                                handleUpiPayment()
                            }}
                            style={{
                                backgroundColor: paymentMode === 2 ? '#8A2BE2' : purple, // Highlighted color when selected
                                borderColor: '#18a0a6',
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 10,
                                width: '48%',
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                gap: 5
                            }}
                        >
                            <Icon2 name="credit-card" size={20} color="#fff" />
                            <Text style={{ color: '#fff', fontWeight: '700' }}>By UPI</Text>
                            {paymentMode === 2 && <Icon6 name="checkcircle" size={20} color="#fff" />}
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* QR Code */}
            {upi && (
                <View style={{ elevation: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={require('../assets/qr.png')}
                        style={{ width: 300, height: 300, marginRight: 15 }}
                    />
                </View>
            )}

            {/* Delivery button */}
            {paymentMode === null ? (
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 5,
                        position: 'absolute',
                        bottom: 10,
                        width: '100%',
                        backgroundColor: '#B0B0B0', // Disabled grey color
                        padding: 15,
                        borderRadius: 10,
                        marginTop: 20,
                        alignSelf: 'center',
                        opacity: 0.6 // Reduced opacity for a disabled look
                    }}
                    disabled={true} // Disables button interaction
                >
                    <Text style={{ color: '#6E6E6E', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>
                        I have delivered the order
                    </Text>
                    <Icon6 name="checkcircle" size={20} color="#6E6E6E" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={handleDeliveryConfirmation} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, position: 'absolute', bottom: 10, width: '100%', backgroundColor: '#5EC467', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20, alignSelf: 'center' }}>
                    <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(2.2) }}>I have delivered the order</Text>
                    <Icon6 name="checkcircle" size={20} color="#000" />
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
}

export default Delivery;
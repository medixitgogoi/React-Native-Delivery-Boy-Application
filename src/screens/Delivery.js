import { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
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
import Toast from 'react-native-toast-message';

const Delivery = ({ route }) => {

    const navigation = useNavigation();

    const order = route.params.data;

    const [isDelivered, setIsDelivered] = useState(false);
    const [upi, setUpi] = useState(false);
    const [paymentMode, setPaymentMode] = useState(null);

    const handleDeliveryConfirmation = () => {
        setIsDelivered(true);
        Toast.show({
            type: 'success',
            text1: 'Order Delivered',
            text2: 'The order has been marked as delivered.',
            position: 'top',
            topOffset: 10,
        });
        console.log('edeeded');
    };

    const handleUpiPayment = () => {
        if (paymentMode !== 2) {
            setUpi(prev => !prev);
        }
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
                            <Icon3 name="user" size={17} color="#9d9d9d" style={{ marginRight: 5 }} />
                            <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '700', color: '#9f6efe' }}>{order.customerName}</Text>
                        </View>
                    </View>

                    {/* Location */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 12 }}>
                        <Icon4 name="location-dot" size={17} color="#9d9d9d" style={{ marginRight: 5 }} />
                        <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000', fontWeight: '500' }}>{order.location}</Text>
                    </View>

                    {/* Order Description */}
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 3, marginBottom: 12 }}>
                        <Icon5 name="box" size={14} color="#9d9d9d" style={{ marginRight: 5, marginTop: 1 }} />
                        <View style={{ gap: 2 }}>
                            {order.orderDescription.map((item, index) => (
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }} key={index}>
                                    <Text
                                        style={{
                                            fontSize: responsiveFontSize(1.8),
                                            color: '#000',
                                            fontWeight: '500',
                                        }}
                                    >
                                        {item.product}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: responsiveFontSize(1.6),
                                            color: '#000',
                                            fontWeight: '500',
                                        }}
                                    >
                                        x
                                    </Text>
                                    <View style={{ backgroundColor: '#000', borderRadius: 4, paddingHorizontal: 4, paddingVertical: 1 }}>
                                        <Text
                                            style={{
                                                fontSize: responsiveFontSize(1.5),
                                                color: '#fff',
                                                fontWeight: '500',
                                            }}
                                        >
                                            {item.quantity}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>


                    {/* Price and Payment Status */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                            <Icon4 name="money-bill" size={14} color="#9d9d9d" style={{ marginRight: 5 }} />
                            <Text style={{ fontSize: responsiveFontSize(1.8), color: '#000', fontWeight: '500' }}>{order?.price}</Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>

            {/* Conditional Payment/Delivery Options */}
            {order.paymentStatus === 'COD' ? (
                <View style={{ marginTop: 25 }}>
                    <Text style={{
                        fontSize: responsiveFontSize(2.1),
                        fontWeight: '600',
                        color: "#000",
                        marginBottom: 8,
                    }}>
                        Collect Payment
                    </Text>

                    <View style={{
                        flexDirection: 'row',
                        marginBottom: 30,
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        {/* By Cash Option */}
                        <TouchableOpacity
                            onPress={() => {
                                setPaymentMode(1);
                                setUpi(false);
                            }}
                            style={{
                                backgroundColor: paymentMode === 1 ? '#000' : green,
                                borderColor: '#18a0a6',
                                borderWidth: 1,
                                paddingVertical: 12,
                                paddingHorizontal: 15,
                                borderRadius: 12,
                                width: '49%',
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                gap: 6,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.2,
                                shadowRadius: 3,
                            }}
                        >
                            <Icon3 name="money" size={20} color={paymentMode === 1 ? '#fff' : '#333'} />
                            <Text style={{
                                color: paymentMode === 1 ? '#fff' : '#333',
                                fontWeight: '600',
                                fontSize: responsiveFontSize(1.9)
                            }}>
                                By Cash
                            </Text>
                            {paymentMode === 1 && <Icon6 name="checkcircle" size={20} color="#fff" />}
                        </TouchableOpacity>

                        {/* By UPI Option */}
                        <TouchableOpacity
                            onPress={() => {
                                setPaymentMode(2);
                                handleUpiPayment();
                            }}
                            style={{
                                backgroundColor: paymentMode === 2 ? '#000' : purple,
                                borderColor: '#18a0a6',
                                borderWidth: 1,
                                paddingVertical: 12,
                                paddingHorizontal: 15,
                                borderRadius: 12,
                                width: '49%',
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                gap: 6,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.2,
                                shadowRadius: 3,
                            }}
                        >
                            <Icon2 name="credit-card" size={20} color="#fff" />
                            <Text style={{
                                color: '#fff',
                                fontWeight: '700',
                                fontSize: responsiveFontSize(1.9)
                            }}>
                                By UPI
                            </Text>
                            {paymentMode === 2 && <Icon6 name="checkcircle" size={20} color="#fff" />}
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={{
                    marginTop: 30,
                    backgroundColor: '#E8F6E9',
                    borderRadius: 15,
                    padding: 20,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                    elevation: 2
                }}>
                    <Icon6 name="checkcircle" size={40} color={green} style={{ marginBottom: 10 }} />

                    <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '700', color: '#000', textAlign: 'center' }}>
                        Payment Received
                    </Text>

                    <Text style={{
                        fontSize: responsiveFontSize(1.8),
                        color: '#6E6E6E',
                        textAlign: 'center',
                        marginTop: 5,
                        fontWeight: '500'
                    }}>
                        The order has been paid via UPI.
                    </Text>

                    <View style={{
                        backgroundColor: '#F0FFF4',
                        padding: 15,
                        borderRadius: 10,
                        marginTop: 15,
                        width: '100%',
                        alignItems: 'center',
                        elevation: 1,
                    }}>
                        <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: '#333' }}>
                            Amount Paid:  {order.price}
                        </Text>
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
            {paymentMode === null && order?.paymentStatus === 'COD' ? (
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 5,
                        position: 'absolute',
                        bottom: 10,
                        width: '100%',
                        backgroundColor: '#B0B0B0',
                        padding: 15,
                        borderRadius: 10,
                        marginTop: 20,
                        alignSelf: 'center',
                        opacity: 0.6,
                    }}
                    disabled={true}
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
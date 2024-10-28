import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import Icon2 from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import Icon5 from 'react-native-vector-icons/Entypo';
import Icon6 from 'react-native-vector-icons/MaterialIcons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { purple, green } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const Delivery = ({ route }) => {

    const navigation = useNavigation();

    const order = route.params.data;
    const [isDelivered, setIsDelivered] = useState(false);

    const handleDeliveryConfirmation = () => {
        setIsDelivered(true);
        Alert.alert('Order Delivered', 'The order has been marked as delivered.');
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
                            <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>{order.price}</Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>

            {/* Conditional Payment/Delivery Options */}
            {order.paymentStatus === 'UPI' ? (
                // Paid via UPI
                <TouchableOpacity onPress={handleDeliveryConfirmation} style={{ backgroundColor: '#6ae4e9', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ color: '#000', fontWeight: '700' }}>I have delivered the order</Text>
                </TouchableOpacity>
            ) : (
                // COD with payment options
                <View style={{ marginTop: 30 }}>
                    <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: '600', color: "#000", marginBottom: 10 }}>Collect Payment</Text>

                    <View style={{ flexDirection: 'row', gap: 15, marginBottom: 30 }}>
                        <TouchableOpacity onPress={handleDeliveryConfirmation} style={{ backgroundColor: '#6ae4e9', padding: 15, borderRadius: 10, width: '45%', alignItems: 'center' }}>
                            <Icon3 name="money" size={24} color="#000" />
                            <Text style={{ color: '#000', fontWeight: '700' }}>Cash</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setIsDelivered(true)} style={{ backgroundColor: 'c#FFF', padding: 15, borderRadius: 10, width: '45%', alignItems: 'center', borderColor: '#000', borderWidth: 1 }}>
                            {/* <QRCode value={`upi://pay?pa=merchantUPI&pn=${order.customerName}&am=${order.price.replace('₹', '')}`} size={80} /> */}
                            <Text style={{ color: '#000', fontWeight: '700', marginTop: 10 }}>Pay by UPI</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

export default Delivery;
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, ScrollView, TextInput, Animated, Dimensions, ActivityIndicator } from 'react-native';
import { background, green } from '../utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDropdown from 'react-native-select-dropdown';
import { useEffect, useRef, useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { fetchClients } from '../utils/fetchClients';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { fetchBankDetails } from '../utils/fetchBankDetails';
import axios from 'axios';

const { width: screenWidth } = Dimensions.get('window');

const company = [
    { id: 1, title: 'Evergreen Blocks and Solutions' },
    { id: 2, title: 'Superlite AAC Blocks Industry' },
    { id: 3, title: 'Superlite Solutions' },
];

const pads = [
    { id: 1, title: 'Evergreen Blocks & Solutions (Use Evergreen Pad)' },
    { id: 2, title: 'Superlite AAC Blocks Industry (Use Superlite AAC Pad)' },
    { id: 3, title: 'Superlite Solutions (Use Superlite Solutions Pad)' },
];

const addressTypes = [
    { id: 1, title: 'Guwahati' },
    { id: 2, title: 'Out_station' },
    { id: 3, title: 'Ex_plant' },
];

const payment = [
    { id: 1, title: 'NEFT/RTGS' },
    { id: 2, title: 'CREDIT' },
];

const breakage = [
    { id: 1, title: '2%' },
    { id: 2, title: '3%' },
    { id: 3, title: 'N/A' },
];

const unloading = [
    { id: 1, title: 'Yes' },
    { id: 2, title: 'No' },
];

const sizeType = [
    { id: 1, title: 'Custom (LLL*HHH*TTT (in mm))' },
    { id: 2, title: 'Bag' },
];

const AddQuotation = ({ navigation }) => {

    const userDetails = useSelector(state => state.user);

    const [text, setText] = useState('');

    const [selectedCompany, setSelectedCompany] = useState(null);

    const [selectedPad, setSelectedPad] = useState(null);
    // console.log('selectedPad: ', selectedPad);

    const [clients, setClients] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);

    const [bankDetails, setBankDetails] = useState(null);

    const [selectedAddressType, setselectedAddressType] = useState(null);

    const [selectedPaymentType, setSelectedPaymentType] = useState(null);

    const [noOfCreditDays, setNoOfCreditDays] = useState(null);

    const [selectedBreakage, setSelectedBreakage] = useState(null);

    const [selectedUnloading, setSelectedUnloading] = useState(null);

    const [detentionCharge, setDetentionCharge] = useState(null);

    const [quotationValidity, setQuotationValidity] = useState(null);

    const [selectedOption, setSelectedOption] = useState(null);

    const [productsAdded, setProductsAdded] = useState([]);

    const [selectedSizeType, setSelectedSizeType] = useState(null);

    const [selectedBankDetails, setSelectedBankDetails] = useState(null);

    const [bagSize, setBagSize] = useState(null);

    const [ratePerBag, setRatePerBag] = useState(null);

    const [length, setLength] = useState(null);

    const [height, setHeight] = useState(null);

    const [thickness, setThickness] = useState(null);

    const [customRate, setCustomRate] = useState(null);

    const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

    const [isDisabledFirst, setIsDisabledFirst] = useState(false);

    const [isDisabledSecond, setIsDisabledSecond] = useState(false);

    const translateX = useRef(new Animated.Value(0)).current;

    const [loading, setLoading] = useState(false);

    // fetch clients
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchClients(userDetails); // Fetch all products
                setClients(data);

                console.log('client: ', data)

            } catch (error) {
                console.log('Error fetching clients: ', error?.message);
            }
        };

        fetchData();
    }, []);

    // fetch bank details
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchBankDetails(userDetails); // Fetch all products
                setBankDetails(data);

                // console.log('client: ', data)

            } catch (error) {
                console.log('Error fetching bank details: ', error?.message);
            }
        };

        fetchData();
    }, []);

    // first Proceed Handler
    const firstProceedHandler = () => {
        if (!selectedCompany || !selectedPad || !selectedClient || !selectedAddressType || !selectedPaymentType || !selectedBreakage || !selectedUnloading || !detentionCharge || !quotationValidity || (selectedPaymentType?.title === 'CREDIT' && !noOfCreditDays)) {
            Toast.show({
                type: 'error',
                text1: 'All the fields are mandatory',
                text2: 'Please fill all the details and try again',
                position: 'top',
                topOffset: 5,
            });
            return;
        }

        if (currentScreenIndex < 2) {

            const newIndex = currentScreenIndex + 1;
            setCurrentScreenIndex(newIndex);

            Animated.timing(translateX, {
                toValue: -screenWidth * newIndex,
                duration: 450,
                useNativeDriver: true,
            }).start();
        }
    };

    const handleNext = () => {
        if (currentScreenIndex < 2) { // Allow swiping forward only up to the third screen
            const newIndex = currentScreenIndex + 1;
            setCurrentScreenIndex(newIndex);

            Animated.timing(translateX, {
                toValue: -screenWidth * newIndex,
                duration: 450,
                useNativeDriver: true,
            }).start();
        }
    };

    const addProductHandler = () => {
        if (selectedOption === 1) {
            // Handle AAC Blocks
            if (selectedSizeType?.title === 'Custom (LLL*HHH*TTT (in mm))') {
                // Case: Custom size
                productsAdded.push({
                    productType: 'AAC Blocks',
                    sizeType: selectedSizeType?.title,
                    length: length,
                    height: height,
                    thickness: thickness,
                    customRate: customRate,
                });
            } else {
                // Case: Bag size
                productsAdded.push({
                    productType: 'AAC Blocks',
                    sizeType: selectedSizeType?.title,
                    bagSize: bagSize,
                    ratePerBag: ratePerBag,
                });
            }

            setIsDisabledFirst(true);

        } else if (selectedOption === 2) {
            // Handle Fix-O-Blocks
            if (selectedSizeType?.title === 'Custom (LLL*HHH*TTT (in mm))') {
                // Case: Custom size
                productsAdded.push({
                    productType: 'Fix-O-Blocks',
                    sizeType: selectedSizeType?.title,
                    length: length,
                    height: height,
                    thickness: thickness,
                    customRate: customRate,
                });
            } else {
                // Case: Bag size
                productsAdded.push({
                    productType: 'Fix-O-Blocks',
                    sizeType: selectedSizeType?.title,
                    bagSize: bagSize,
                    ratePerBag: ratePerBag,
                });
            }

            setIsDisabledSecond(true);

        } else {
            // Handle invalid selection
            Toast.show({
                type: 'error',
                text1: 'Invalid selectedOption or no option selected',
                text2: 'Please fill all the details and try again',
                position: 'top',
                topOffset: 5,
            });
            return; // Exit the function if there's an invalid option
        }

        // Reset all the values to null
        setSelectedOption(null);
        setLength(null);
        setHeight(null);
        setThickness(null);
        setCustomRate(null);
        setBagSize(null);
        setRatePerBag(null);
        setSelectedSizeType(null);
    };

    const deleteProductHandler = (productType, index) => {

        if (productType === 'AAC Blocks') {
            setIsDisabledFirst(false);
        } else {
            setIsDisabledSecond(false);
        }

        const updatedProducts = productsAdded.filter((_, i) => i !== index);

        setProductsAdded(updatedProducts); // Update the state
    };

    const generateQuotationHandler = async () => {

        try {
            setLoading(true);

            // Prepare FormData
            const formData = new FormData();

            formData.append('company_name', selectedCompany?.title || '');
            formData.append('pad_type', selectedPad?.id || '');
            formData.append('client_id', selectedClient?.id || '');
            formData.append('address_type', selectedAddressType?.id || '');
            formData.append('payment_mode', selectedPaymentType?.id || '');

            // Only append credit_days if payment type is CREDIT
            if (selectedPaymentType?.title === 'CREDIT' && noOfCreditDays) {
                formData.append('credit_days', noOfCreditDays);
            }

            formData.append('breakage', selectedBreakage?.title || '');
            formData.append('is_unloading', selectedUnloading?.id || '');
            formData.append('detention_charge', detentionCharge ? detentionCharge?.toString() : '');
            formData.append('validity', quotationValidity ? quotationValidity?.toString() : '');

            formData.append('bank_details', selectedBankDetails?.id || '');
            formData.append('addl_terms', text ? text.toString() : '');

            // Handle productsAdded array
            const productDetails = [];

            productsAdded.forEach((product) => {

                const productData = {
                    productType: product?.productType,
                    sizeType: product?.sizeType,
                    length: product?.length,
                    height: product?.height,
                    thickness: product?.thickness,
                    customRate: product?.customRate,
                    bagSize: product?.bagSize,
                    ratePerBag: product?.ratePerBag,
                };

                productDetails.push(productData);

                if (product.productType === 'AAC Blocks') {

                    formData.append('aac_blocks', 1);

                    if (product.sizeType === 'Custom (LLL*HHH*TTT (in mm))') {
                        formData.append('aac_blocks_size_type', 1);
                        formData.append('aac_blocks_length', product.length);
                        formData.append('aac_blocks_height', product.height);
                        formData.append('aac_blocks_thickness', product.thickness);
                        formData.append('aac_blocks_cu_rate', product.customRate);
                    } else {
                        formData.append('aac_blocks_size_type', 2);
                        formData.append('aac_blocks_bag', product.bagSize || '');
                        formData.append('aac_blocks_bag_rate', product.ratePerBag || '');
                    }
                } else if (product.productType === 'Fix-O-Blocks') {

                    formData.append('fix_blocks', 1);

                    if (product.sizeType === 'Custom (LLL*HHH*TTT (in mm))') {
                        formData.append('fix_blocks_size_type', 1);
                        formData.append('fix_blocks_length', product.length);
                        formData.append('fix_blocks_height', product.height);
                        formData.append('fix_blocks_thickness', product.thickness);
                        formData.append('fix_blocks_cu_rate', product.customRate);
                    } else {
                        formData.append('fix_blocks_size_type', 2);
                        formData.append('fix_blocks_bag', product.bagSize || '');
                        formData.append('fix_blocks_bag_rate', product.ratePerBag || '');
                    }
                }
            });

            // API Call using axios with FormData
            const response = await axios.post(`/api/user/quotation/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('quotation add response: ', response);

            if (response?.data?.status) {
                // Create an object with the necessary details
                const quotationDetails = {
                    company_name: selectedCompany?.title || '',
                    pad_type: selectedPad?.id || '',
                    client_id: selectedClient?.id || '',
                    address_type: selectedAddressType || '',
                    payment_mode: selectedPaymentType?.id || '',
                    credit_days: selectedPaymentType?.title === 'CREDIT' ? noOfCreditDays : null,
                    breakage: selectedBreakage?.title || '',
                    is_unloading: selectedUnloading?.id || '',
                    detention_charge: detentionCharge ? detentionCharge.toString() : '',
                    validity: quotationValidity ? quotationValidity.toString() : '',
                    bank_details: selectedBankDetails || '',
                    addl_terms: text ? text.toString() : '',
                    apiData: response?.data?.data,
                    products: productDetails,
                };

                // Navigate to the 'Invoice' screen with the details
                navigation.navigate('Invoice', { data: quotationDetails });

                Toast.show({
                    type: 'success',
                    text1: 'Quotation Added Successfully',
                    text2: 'Your quotation has been submitted.',
                    position: 'top',
                    topOffset: 5,
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to Add Quotation',
                    text2: 'Please try again later.',
                    position: 'top',
                    topOffset: 5,
                });
            }

            console.log('Add quotation response: ', response);

        } catch (error) {

            console.error('Error:', error?.response);

            const errorMessage = error?.response?.data?.message || 'Something went wrong. Please try again.';

            Toast.show({
                type: 'error',
                text1: 'Error submitting form',
                text2: errorMessage,
                position: 'top',
                topOffset: 5,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: background }}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ marginTop: 10, flexDirection: 'row', paddingHorizontal: 8, justifyContent: 'space-between', alignItems: 'center', marginBottom: 5, width: '100%' }}>
                <TouchableOpacity style={{ borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: '#daeecf', borderColor: green, borderWidth: 1 }} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" style={{ color: '#000' }} size={16} />
                </TouchableOpacity>

                <View style={{ width: '80%' }}>
                    <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '700', color: '#000', textAlign: 'center' }}>Add New Quotation</Text>
                </View>

                <View style={{ width: 30, height: 30, }}></View>
            </View>

            <Animated.View style={{ flexDirection: 'row', transform: [{ translateX }], width: screenWidth * 3, height: '100%' }}>
                {/* First part */}
                <View style={{ paddingHorizontal: 8, width: screenWidth, height: '100%', }}>
                    <ScrollView
                        contentContainerStyle={{ paddingHorizontal: 1, paddingBottom: 55, }}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Select Company */}
                        <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 10, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                            {/* Heading */}
                            <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                <Ionicons name="business-outline" size={15} color="#000" />
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Select Company</Text>
                            </View>

                            <SelectDropdown
                                data={company}
                                onSelect={(selectedItem, index) => {
                                    // console.log('selected company: ', selectedItem, index);
                                    setSelectedCompany(selectedItem);
                                }}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={styles.dropdownButtonStyle}>
                                            <Text style={styles.dropdownButtonTxtStyle}>
                                                {(selectedItem && selectedItem.title) || 'Select Company'}
                                            </Text>
                                            <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                        </View>
                                    );
                                }}
                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: green }) }}>
                                            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                                dropdownStyle={styles.dropdownMenuStyle}
                            />
                        </View>

                        {/* Select Pad */}
                        <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 12, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                            {/* Heading */}
                            <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                <Ionicons name="layers-outline" size={16} color="#000" />
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Select Pad Type</Text>
                            </View>

                            <SelectDropdown
                                data={pads}
                                onSelect={(selectedItem, index) => {
                                    // console.log('selected company: ', selectedItem, index);
                                    setSelectedPad(selectedItem);
                                }}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={styles.dropdownButtonStyle}>
                                            <Text style={styles.dropdownButtonTxtStyle}>
                                                {(selectedItem && selectedItem.title) || 'Select Pad Type'}
                                            </Text>
                                            <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                        </View>
                                    );
                                }}
                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: green }) }}>
                                            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                                dropdownStyle={styles.dropdownMenuStyle}
                            />
                        </View>

                        {/* Select Client */}
                        <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 12, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                            {/* Heading */}
                            <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                <Ionicons name="person-outline" size={15} color="#000" />
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Select Client</Text>
                            </View>

                            <SelectDropdown
                                data={clients}
                                onSelect={(selectedItem, index) => {
                                    // console.log('selected company: ', selectedItem, index);
                                    setSelectedClient(selectedItem);
                                }}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={styles.dropdownButtonStyle}>
                                            <Text style={styles.dropdownButtonTxtStyle}>
                                                {(selectedItem && selectedItem.name) || 'Select Client'}
                                            </Text>
                                            <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                        </View>
                                    );
                                }}
                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: green }) }}>
                                            <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                                dropdownStyle={styles.dropdownMenuStyle}
                            />
                        </View>

                        {/* Select Address Type */}
                        <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 12, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                            {/* Heading */}
                            <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                <Ionicons name="document-text-outline" size={16} color="#000" />
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Select Address Type</Text>
                            </View>

                            <SelectDropdown
                                data={addressTypes}
                                onSelect={(selectedItem, index) => {
                                    // console.log('selected company: ', selectedItem, index);
                                    setselectedAddressType(selectedItem);
                                }}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={styles.dropdownButtonStyle}>
                                            <Text style={styles.dropdownButtonTxtStyle}>
                                                {(selectedItem && selectedItem.title) || 'Select Address Type'}
                                            </Text>

                                            <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                        </View>
                                    );
                                }}
                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: green }) }}>
                                            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                                dropdownStyle={styles.dropdownMenuStyle}
                            />
                        </View>

                        {/* Select Payment Type */}
                        <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 12, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                            {/* Heading */}
                            <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                <Ionicons name="card-outline" size={17} color="#000" />
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Select Payment Type</Text>
                            </View>

                            <SelectDropdown
                                data={payment}
                                onSelect={(selectedItem, index) => {
                                    // console.log('selected company: ', selectedItem, index);
                                    setSelectedPaymentType(selectedItem);
                                }}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={styles.dropdownButtonStyle}>
                                            <Text style={styles.dropdownButtonTxtStyle}>
                                                {(selectedItem && selectedItem.title) || 'Select Payment Type'}
                                            </Text>
                                            <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                        </View>
                                    );
                                }}
                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: green }) }}>
                                            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                                dropdownStyle={styles.dropdownMenuStyle}
                            />
                        </View>

                        {/* Credit Days  */}
                        {selectedPaymentType && selectedPaymentType?.title === 'CREDIT' && (
                            <View style={{ marginTop: 12, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                                {/* Heading */}
                                <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                    <Ionicons name="time-outline" size={17} color="#000" />
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Enter the no. of credit days</Text>
                                </View>

                                <TextInput
                                    style={{
                                        paddingVertical: 4,
                                        borderColor: green,
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        paddingLeft: 10,
                                        fontSize: responsiveFontSize(2),
                                        color: '#000',
                                        backgroundColor: '#f0f8ec',
                                        fontWeight: '500'
                                    }}
                                    placeholder="Enter the no. of credit days here"
                                    placeholderTextColor="#888"
                                    value={noOfCreditDays}
                                    keyboardType='numeric'
                                    onChangeText={(text) => setNoOfCreditDays(text)}
                                />
                            </View>
                        )}

                        {/* Select Breakage  */}
                        <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 12, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                            {/* Heading */}
                            <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <Ionicons name="pie-chart-outline" size={16} color="#000" />
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Select Breakage (in %)</Text>
                            </View>

                            <SelectDropdown
                                data={breakage}
                                onSelect={(selectedItem, index) => {
                                    // console.log('selected company: ', selectedItem, index);
                                    setSelectedBreakage(selectedItem);
                                }}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={styles.dropdownButtonStyle}>
                                            <Text style={styles.dropdownButtonTxtStyle}>
                                                {(selectedItem && selectedItem.title) || 'Select Breakage (in %)'}
                                            </Text>
                                            <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                        </View>
                                    );
                                }}
                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: green }) }}>
                                            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                                dropdownStyle={styles.dropdownMenuStyle}
                            />
                        </View>

                        {/* Need for Unloading */}
                        <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 12, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                            {/* Heading */}
                            <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <Icon name="truck-outline" size={17} color="#000" />
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Need for Unloading</Text>
                            </View>

                            <SelectDropdown
                                data={unloading}
                                onSelect={(selectedItem, index) => {
                                    // console.log('selected company: ', selectedItem, index);
                                    setSelectedUnloading(selectedItem);
                                }}
                                renderButton={(selectedItem, isOpened) => {
                                    return (
                                        <View style={styles.dropdownButtonStyle}>
                                            <Text style={styles.dropdownButtonTxtStyle}>
                                                {(selectedItem && selectedItem.title) || 'Select need for Unloading'}
                                            </Text>
                                            <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                        </View>
                                    );
                                }}
                                renderItem={(item, index, isSelected) => {
                                    return (
                                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: green }) }}>
                                            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                        </View>
                                    );
                                }}
                                showsVerticalScrollIndicator={false}
                                dropdownStyle={styles.dropdownMenuStyle}
                            />
                        </View>

                        {/* Detention Charge */}
                        <View style={{ marginTop: 12, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                            {/* Heading */}
                            <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <Icon name="cash-minus" size={18} color="#000" />
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Detention Charge (per day)</Text>
                            </View>

                            <TextInput
                                style={{
                                    paddingVertical: 4,
                                    borderColor: green,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    paddingLeft: 10,
                                    fontSize: responsiveFontSize(2),
                                    color: '#000',
                                    backgroundColor: '#f0f8ec',
                                    fontWeight: '500'
                                }}
                                placeholder="Enter Detention Charge (per day)"
                                placeholderTextColor="#888"
                                keyboardType='numeric'
                                value={detentionCharge}
                                onChangeText={(text) => setDetentionCharge(text)}
                            />
                        </View>

                        {/* Quotation Validity (in days)  */}
                        <View style={{ marginTop: 12, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                            {/* Heading */}
                            <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                <Icon name="calendar-today" size={17} color="#000" />
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Quotation Validity (in days)</Text>
                            </View>

                            <TextInput
                                style={{
                                    paddingVertical: 4,
                                    borderColor: green,
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    paddingLeft: 10,
                                    fontSize: responsiveFontSize(2),
                                    color: '#000',
                                    backgroundColor: '#f0f8ec',
                                    fontWeight: '500'
                                }}
                                placeholder="Enter Quotation Validity (in days)"
                                placeholderTextColor="#888"
                                keyboardType='numeric'
                                value={quotationValidity}
                                onChangeText={(text) => setQuotationValidity(text)}
                            />
                        </View>

                        {/* Proceed button */}
                        <TouchableOpacity onPress={firstProceedHandler} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 12, borderRadius: 12, backgroundColor: green, padding: 12 }}>
                            <Text style={{ color: '#212121', fontWeight: '600', fontSize: responsiveFontSize(2.4) }}>Proceed</Text>
                            <Ionicons name="arrow-forward-outline" size={22} color="#212121" />
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                {/* Second part */}
                <View style={{ paddingHorizontal: 8, width: screenWidth, height: '100%' }}>
                    <ScrollView contentContainerStyle={{ paddingBottom: 60, paddingHorizontal: 1 }}>

                        <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 10, borderRadius: 12, paddingBottom: 50 }}>
                            {/* Products added */}
                            <View style={{ flexDirection: 'column', backgroundColor: '#fff', padding: 13, borderRadius: 12, elevation: 3 }}>
                                {/* Heading */}
                                <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                    <Ionicons name="cart-outline" size={17} color="#000" />
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Products added</Text>
                                </View>

                                {productsAdded?.length === 0 ? (
                                    <View style={{ paddingHorizontal: 24 }}>
                                        <Text style={{ color: '#757575', fontSize: responsiveFontSize(1.6), fontWeight: '500' }}>
                                            No products added till now
                                        </Text>
                                    </View>
                                ) : (
                                    <View>
                                        {productsAdded.map((product, index) => (
                                            <View
                                                key={index}
                                                style={{
                                                    marginBottom: 16,
                                                    padding: 5,
                                                    borderWidth: 1,
                                                    borderColor: '#ddd',
                                                    borderRadius: 10,
                                                }}
                                            >
                                                {/* Common Properties */}
                                                <View
                                                    style={{
                                                        backgroundColor: '#d0eac3',
                                                        borderRadius: 8,
                                                        paddingVertical: 10,
                                                        borderColor: 'green',
                                                        borderWidth: 1,
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            color: '#000',
                                                            fontSize: responsiveFontSize(1.9),
                                                            fontWeight: '600',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        {product.productType}
                                                    </Text>
                                                </View>

                                                {/* Conditional Rendering Based on selectedOption */}
                                                {product.sizeType === 'Custom (LLL*HHH*TTT (in mm))' ? (
                                                    <View style={{ paddingHorizontal: 10, paddingVertical: 12 }}>
                                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(1.8) }}>
                                                            Size Type: {product.sizeType || 'N/A'}
                                                        </Text>
                                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(1.8), marginTop: 2 }}>
                                                            Length: {product.length || 'N/A'}
                                                        </Text>
                                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(1.8), marginTop: 2 }}>
                                                            Height: {product.height || 'N/A'}
                                                        </Text>
                                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(1.8), marginTop: 2 }}>
                                                            Thickness: {product.thickness || 'N/A'}
                                                        </Text>
                                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(1.8), marginTop: 2 }}>
                                                            Custom Rate: {product.customRate || 'N/A'}
                                                        </Text>
                                                    </View>
                                                ) : product.sizeType === 'Bag' ? (
                                                    <View style={{ paddingHorizontal: 10, paddingVertical: 12 }}>
                                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(1.8) }}>
                                                            Size Type: {product.sizeType || 'N/A'}
                                                        </Text>
                                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(1.8), marginTop: 2 }}>
                                                            Bag Size: {product.bagSize || 'N/A'}
                                                        </Text>
                                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(1.8), marginTop: 2 }}>
                                                            Rate Per Bag: {product.ratePerBag || 'N/A'}
                                                        </Text>
                                                    </View>
                                                ) : null}

                                                {/* Delete Button */}
                                                <View style={{ marginTop: 10, }}>
                                                    <TouchableOpacity
                                                        style={{
                                                            backgroundColor: 'red',
                                                            paddingVertical: 10,
                                                            borderRadius: 5,
                                                            alignItems: 'center',
                                                            borderRadius: 10,
                                                            marginBottom: 1
                                                        }}
                                                        onPress={() => deleteProductHandler(product.productType, index)}
                                                    >
                                                        <Text style={{ color: '#fff', fontSize: responsiveFontSize(1.9), fontWeight: '600' }}>
                                                            Delete Product
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>

                            {/* Select Product Type Checkbox */}
                            <View style={{ marginTop: 10, flexDirection: 'column', backgroundColor: '#fff', padding: 13, borderRadius: 12, elevation: 3 }}>
                                {/* Heading */}
                                <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                    <Ionicons name="pricetag-outline" size={15} color="#000" />
                                    <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Select Product Type</Text>
                                </View>

                                {/* Checkboxes */}
                                <View style={{ flexDirection: 'column' }}>
                                    {/* Option 1 */}
                                    {(selectedPad?.id === 1 || selectedPad?.id === 2) && (
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <CheckBox
                                                value={selectedOption === 1} // Checked if selectedOption is 1
                                                onValueChange={() => setSelectedOption(selectedOption === 1 ? null : 1)} // Toggle selection
                                                tintColors={{ true: 'green', false: 'gray' }}
                                                style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                                                disabled={isDisabledFirst ? true : false}
                                            />

                                            <Text
                                                style={{
                                                    fontSize: responsiveFontSize(1.9),
                                                    fontWeight: '500',
                                                    color: isDisabledFirst ? 'grey' : '#000', // Set text color to gray if disabled
                                                    textDecorationLine: isDisabledFirst ? 'line-through' : ''
                                                }}
                                            >
                                                AAC Blocks
                                            </Text>
                                        </View>
                                    )}

                                    {/* Option 2 */}
                                    {(selectedPad?.id === 1 || selectedPad?.id === 3) && (
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <CheckBox
                                                value={selectedOption === 2} // Checked if selectedOption is 2
                                                onValueChange={() => setSelectedOption(selectedOption === 2 ? null : 2)} // Toggle selection
                                                tintColors={{ true: 'green', false: 'gray' }}
                                                style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                                                disabled={isDisabledSecond ? true : false}
                                            />
                                            <Text
                                                style={{
                                                    fontSize: responsiveFontSize(1.9),
                                                    fontWeight: '500',
                                                    color: isDisabledSecond ? 'grey' : '#000', // Set text color to gray if disabled
                                                    textDecorationLine: isDisabledSecond ? 'line-through' : ''
                                                }}
                                            >Fix-O-Blocks</Text>
                                        </View>
                                    )}
                                </View>
                            </View>

                            {/* Select Size Type */}
                            {selectedOption !== null && (
                                <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 10, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                                    {/* Heading */}
                                    <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                        <Ionicons name="resize-outline" size={15} color="#000" />
                                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Size Type</Text>
                                    </View>

                                    <SelectDropdown
                                        data={sizeType}
                                        onSelect={(selectedItem, index) => {
                                            // console.log('selected company: ', selectedItem, index);
                                            setSelectedSizeType(selectedItem);
                                        }}
                                        renderButton={(selectedItem, isOpened) => {
                                            return (
                                                <View style={styles.dropdownButtonStyle}>
                                                    <Text style={styles.dropdownButtonTxtStyle}>
                                                        {(selectedItem && selectedItem.title) || 'Select Size Type'}
                                                    </Text>
                                                    <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                                </View>
                                            );
                                        }}
                                        renderItem={(item, index, isSelected) => {
                                            return (
                                                <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: green }) }}>
                                                    <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                                </View>
                                            );
                                        }}
                                        showsVerticalScrollIndicator={false}
                                        dropdownStyle={styles.dropdownMenuStyle}
                                    />
                                </View>
                            )}

                            {selectedOption !== null && selectedSizeType && selectedSizeType?.id === 1 && (
                                <>
                                    <View style={{ marginTop: 12, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                                        {/* Heading */}
                                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                            <Ionicons name="cube-outline" size={17} color="#000" />
                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Enter Length</Text>
                                        </View>

                                        <TextInput
                                            style={{
                                                paddingVertical: 4,
                                                borderColor: green,
                                                borderWidth: 1,
                                                borderRadius: 10,
                                                paddingLeft: 10,
                                                fontSize: responsiveFontSize(2),
                                                color: '#000',
                                                backgroundColor: '#f0f8ec',
                                                fontWeight: '500'
                                            }}
                                            placeholder="Enter the Length"
                                            placeholderTextColor="#888"
                                            value={length}
                                            keyboardType='numeric'
                                            onChangeText={(text) => setLength(text)}
                                        />
                                    </View>

                                    <View style={{ marginTop: 12, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                                        {/* Heading */}
                                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                            <Ionicons name="arrow-up-outline" size={17} color="#000" />
                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Enter Height</Text>
                                        </View>

                                        <TextInput
                                            style={{
                                                paddingVertical: 4,
                                                borderColor: green,
                                                borderWidth: 1,
                                                borderRadius: 10,
                                                paddingLeft: 10,
                                                fontSize: responsiveFontSize(2),
                                                color: '#000',
                                                backgroundColor: '#f0f8ec',
                                                fontWeight: '500'
                                            }}
                                            placeholder="Enter the Height"
                                            placeholderTextColor="#888"
                                            value={height}
                                            keyboardType='numeric'
                                            onChangeText={(text) => setHeight(text)}
                                        />
                                    </View>

                                    <View style={{ marginTop: 12, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                                        {/* Heading */}
                                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                            <Ionicons name="logo-buffer" size={17} color="#000" />
                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Enter Thickness</Text>
                                        </View>

                                        <TextInput
                                            style={{
                                                paddingVertical: 4,
                                                borderColor: green,
                                                borderWidth: 1,
                                                borderRadius: 10,
                                                paddingLeft: 10,
                                                fontSize: responsiveFontSize(2),
                                                color: '#000',
                                                backgroundColor: '#f0f8ec',
                                                fontWeight: '500'
                                            }}
                                            placeholder="Enter the Thickness"
                                            placeholderTextColor="#888"
                                            value={thickness}
                                            keyboardType='numeric'
                                            onChangeText={(text) => setThickness(text)}
                                        />
                                    </View>

                                    <View style={{ marginTop: 12, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                                        {/* Heading */}
                                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                            <Ionicons name="cash-outline" size={17} color="#000" />
                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Enter the Rate (in Cu.M) </Text>
                                        </View>

                                        <TextInput
                                            style={{
                                                paddingVertical: 4,
                                                borderColor: green,
                                                borderWidth: 1,
                                                borderRadius: 10,
                                                paddingLeft: 10,
                                                fontSize: responsiveFontSize(2),
                                                color: '#000',
                                                backgroundColor: '#f0f8ec',
                                                fontWeight: '500'
                                            }}
                                            placeholder="Enter the Rate (in Cu.M)"
                                            placeholderTextColor="#888"
                                            value={customRate}
                                            keyboardType='numeric'
                                            onChangeText={(text) => setCustomRate(text)}
                                        />
                                    </View>
                                </>
                            )}

                            {selectedOption !== null && selectedSizeType && selectedSizeType?.id === 2 && (
                                <>
                                    <View style={{ marginTop: 12, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                                        {/* Heading */}
                                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                            <Ionicons name="scale-outline" size={17} color="#000" />
                                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4 }}>
                                                <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Bag Size (in Kg)</Text>
                                                <Text style={{ color: 'grey', fontSize: responsiveFontSize(1.7), fontWeight: '400', fontStyle: 'italic' }}>(cannot be changed)</Text>
                                            </View>
                                        </View>

                                        <View style={{ backgroundColor: '#f0f8ec', borderColor: green, borderWidth: 1, borderRadius: 10, paddingVertical: 8, paddingLeft: 10 }}>
                                            <Text style={{ color: '#000', fontWeight: '600' }}>26</Text>
                                        </View>
                                    </View>

                                    <View style={{ marginTop: 12, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                                        {/* Heading */}
                                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                            <Ionicons name="cash-outline" size={17} color="#000" />
                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Enter the Rate per Bag (in ₹)</Text>
                                        </View>

                                        <TextInput
                                            style={{
                                                paddingVertical: 4,
                                                borderColor: green,
                                                borderWidth: 1,
                                                borderRadius: 10,
                                                paddingLeft: 10,
                                                fontSize: responsiveFontSize(2),
                                                color: '#000',
                                                backgroundColor: '#f0f8ec',
                                                fontWeight: '500'
                                            }}
                                            placeholder="Enter the rate per bag"
                                            placeholderTextColor="#888"
                                            value={ratePerBag}
                                            keyboardType='numeric'
                                            onChangeText={(text) => setRatePerBag(text)}
                                        />
                                    </View>
                                </>
                            )}

                            {/* Add Product button */}
                            {(!isDisabledFirst || !isDisabledSecond) && (
                                <TouchableOpacity onPress={addProductHandler} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, elevation: 2, marginTop: 12, borderRadius: 12, backgroundColor: green, paddingVertical: 12 }}>
                                    <Text style={{ color: '#212121', fontWeight: '600', fontSize: responsiveFontSize(2.2) }}>Add Product</Text>
                                    <AntDesign name="plussquare" size={18} color="#000" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </ScrollView>

                    {/* Proceed button */}
                    {productsAdded?.length !== 0 && (
                        <TouchableOpacity onPress={handleNext} style={{ position: 'absolute', bottom: 50, width: '100%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 12, borderRadius: 12, backgroundColor: green, paddingVertical: 13, elevation: 2 }}>
                            <Text style={{ color: '#212121', fontWeight: '600', fontSize: responsiveFontSize(2.4) }}>Proceed</Text>
                            <Ionicons name="arrow-forward-outline" size={22} color="#212121" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Third part */}
                <View style={{ paddingHorizontal: 8, width: screenWidth, height: '100%' }}>
                    {/* Select Bank Details */}
                    <View style={{ flexDirection: 'column', justifyContent: 'center', marginTop: 12, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                        {/* Heading */}
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                            <Ionicons name="wallet-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Select Bank Details</Text>
                        </View>

                        <SelectDropdown
                            data={bankDetails}
                            onSelect={(selectedItem, index) => {
                                // console.log('selected company: ', selectedItem, index);
                                setSelectedBankDetails(selectedItem);
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        <Text style={styles.dropdownButtonTxtStyle}>
                                            {(selectedItem && selectedItem.name) || 'Select Bank Details'}
                                        </Text>
                                        <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                    </View>
                                );
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: green }) }}>
                                        <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                                    </View>
                                );
                            }}
                            showsVerticalScrollIndicator={false}
                            dropdownStyle={styles.dropdownMenuStyle}
                        />
                    </View>

                    {/* Additional Terms */}
                    <View style={{ marginTop: 12, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                        {/* Heading */}
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                            <Ionicons name="document-text-outline" size={17} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Enter Additional Terms (if any)</Text>
                        </View>

                        <TextInput
                            style={{
                                paddingVertical: 4,
                                borderColor: 'green',
                                borderWidth: 1,
                                borderRadius: 10,
                                paddingLeft: 10,
                                fontSize: responsiveFontSize(1.9),
                                color: '#000',
                                backgroundColor: '#f0f8ec',
                                fontWeight: '500',
                                marginBottom: 3
                            }}
                            placeholder="Enter Additionl Terms (if any)"
                            placeholderTextColor="#888"
                            value={text}
                            autoFocus
                            onChangeText={setText}
                            selectionColor="#000"  // This sets the cursor color to black
                            multiline={true}
                        />
                    </View>

                    {/* Generate Quotation Button */}
                    <TouchableOpacity onPress={generateQuotationHandler} style={{ position: 'absolute', bottom: 55, width: '100%', alignSelf: 'center', backgroundColor: green, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 12, paddingVertical: 13, gap: 3 }}>
                        {loading ? (
                            <ActivityIndicator color={'#000'} size="small" />
                        ) : (
                            <>
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(2.1), fontWeight: '500' }}>Generate Quotation</Text>
                                <Icon
                                    name="file-document-outline" // Icon name
                                    size={18}
                                    color="#000"
                                    style={{ marginRight: 8 }} // Add spacing between the icon and text
                                />
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    )
}

export default AddQuotation;

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        width: '100%',
        backgroundColor: '#f0f8ec',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderColor: green,
        borderWidth: 1,
        paddingVertical: 5,
        gap: 5
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: responsiveFontSize(1.9),
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 22,
        color: '#000',
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 0,
        marginTop: 5
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: responsiveFontSize(1.9),
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});
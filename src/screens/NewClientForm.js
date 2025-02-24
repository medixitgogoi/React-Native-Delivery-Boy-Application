import { View, Text, TouchableOpacity, StatusBar, ScrollView, TextInput, KeyboardAvoidingView, Keyboard, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { background, green } from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import SelectDropdown from 'react-native-select-dropdown';
import { fetchClientType } from '../utils/fetchClientType';
import { useSelector } from 'react-redux';

const boolean = [
    { id: 1, title: 'Yes' },
    { id: 2, title: 'No' },
];

const projectType = [
    { id: 1, title: 'Govt' },
    { id: 2, title: 'Private' },
];

const projectStage = [
    { id: 1, title: 'Zero' },
    { id: 2, title: 'Piling' },
    { id: 2, title: 'Casting Slab' },
    { id: 2, title: 'Block Work Ongoing' },
    { id: 2, title: 'Completed' },
];

const NewClientForm = ({ navigation }) => {

    const userDetails = useSelector(state => state.user);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    const [clientTypes, setClientTypes] = useState(null);

    // keyboard visibility
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardVisible(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardVisible(false);
        });

        // Cleanup listeners on component unmount
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    // fetch client type
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchClientType(userDetails); // Fetch all products
                setClientTypes(data);

                // console.log('client: ', data)

            } catch (error) {
                console.log('Error fetching clients: ', error?.message);
            }
        };

        fetchData();
    }, []);

    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [projectName, setProjectName] = useState('');
    const [selectedClientType, setSelectedClientType] = useState('');
    const [cpcName, setCpcName] = useState('');
    const [cpcMobile, setCpcMobile] = useState('');
    const [cpcEmail, setCpcEmail] = useState('');
    const [cpcDesignation, setCpcDesignation] = useState('');
    const [selectedMetWithCpc, setSelectedMetWithCpc] = useState('');
    const [contact, setContact] = useState('');
    const [clientAddress, setClientAddress] = useState('');
    const [addressOf, setAddressOf] = useState('');
    const [townState, setTownState] = useState('');
    const [landmark, setLandmark] = useState('');

    const [projectSiteAddress, setProjectSiteAddress] = useState(null);
    const [projectSiteTown, setProjectSiteTown] = useState(null);
    const [selectedProjectType, setSelectedProjectType] = useState(null);
    const [department, setDepartment] = useState(null);
    const [areas, setAreas] = useState(null);
    const [wallArea, setWallArea] = useState(null);
    const [siteVolume, setSiteVolume] = useState(null);
    const [selectedProjectStage, setSelectedProjectStage] = useState(null);
    const [selectedCompetitor, setSelectedCompetitor] = useState(null);
    const [competitor, setCompetitor] = useState(null);
    const [selectedInterestedInKSL, setSelectedInterestedInKSL] = useState(null);
    const [interestedInOther, setInterestedInOther] = useState(null);
    const [competitorPrice, setCompetitorPrice] = useState(null);
    const [ourPrice, setOurPrice] = useState(null);
    const [remark1, setRemark1] = useState(null);
    const [remark2, setRemark2] = useState(null);

    const submitHandler = async () => {
        try {
            setLoading(true);

            // Create a new FormData instance
            const formData = new FormData();

            formData.append('name', name);
            formData.append('project_name', projectName);
            formData.append('client_type', selectedClientType?.name);
            formData.append('cpc_name', cpcName);
            formData.append('cpc_mobile', cpcMobile);
            formData.append('cpc_email', cpcEmail);
            formData.append('cpc_designation', cpcDesignation);
            formData.append('met_with_cpc', selectedMetWithCpc?.title === 'Yes' ? 1 : 0);
            formData.append('contact', contact ? contact : null);
            formData.append('client_address', clientAddress);
            formData.append('address_of', addressOf);
            formData.append('town_state', townState);
            formData.append('landmark', landmark);

            // Append optional fields only if they are not null/empty
            if (projectSiteAddress) formData.append('project_site_address', projectSiteAddress);
            if (projectSiteTown) formData.append('project_site_town', projectSiteTown);
            if (selectedProjectType) formData.append('project_type', selectedProjectType?.title);
            if (department) formData.append('department', department);
            if (areas) formData.append('areas', areas);
            if (wallArea) formData.append('wall_area', wallArea);
            if (siteVolume) formData.append('site_volume', siteVolume);
            if (selectedProjectStage) formData.append('project_stage', selectedProjectStage?.title);
            if (selectedCompetitor) formData.append('is_competitor', selectedCompetitor?.title === 'Yes' ? 1 : 0);
            if (competitor) formData.append('competitor', competitor);
            if (selectedInterestedInKSL) formData.append('interested_in_KSL', selectedInterestedInKSL?.title);
            if (interestedInOther) formData.append('interested_in_other', interestedInOther);
            if (competitorPrice) formData.append('competitor_price', competitorPrice);
            if (ourPrice) formData.append('our_price', ourPrice);
            if (remark1) formData.append('remark_1', remark1);
            if (remark2) formData.append('remark_2', remark2);

            // API Call using axios with FormData
            const response = await axios.post(`/api/user/client/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response?.data?.status) {
                Toast.show({
                    type: 'success',
                    text1: 'Submission successful',
                    text2: response?.data?.message,
                    position: 'top',
                    topOffset: 5,
                });


            } else {
                Toast.show({
                    type: 'error',
                    text1: response?.data?.message || 'Something went wrong.',
                    text2: 'Please check your credentials and try again.',
                    position: 'top',
                    topOffset: 5,
                });
            }

            console.log('Client add response: ', response);

        } catch (error) {
            console.log('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: background }}>
            <StatusBar
                animated={true}
                backgroundColor={isSidebarOpen ? '#ebebeb' : background}
                barStyle="dark-content"
            />

            {/* Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} navigation={navigation} activeItem="Profile" />

            {/* Header */}
            <View style={{ paddingHorizontal: 15, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, width: '100%' }}>
                <TouchableOpacity onPress={toggleSidebar} style={{ width: '10%', height: 30, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Icon name="menu" size={22} color="#000" />
                </TouchableOpacity>

                <View style={{ width: '80%' }}>
                    <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '700', color: '#000', textAlign: 'center' }}>Add a new client</Text>
                </View>

                <View style={{ width: '10%' }} />
            </View>

            {/* Content */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{
                    flex: 1,
                    paddingBottom: isKeyboardVisible ? 30 : 0
                }}
            >
                <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 12, gap: 12, paddingVertical: 5, paddingBottom: 65 }}>
                    {/* Name Field */}
                    <View style={{ marginTop: 0, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 0 }}>
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="person-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Name</Text>
                            <Text style={{ color: 'red', fontSize: responsiveFontSize(2), fontWeight: '500' }}>*</Text>
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
                            placeholder="Enter Name"
                            placeholderTextColor="#888"
                            value={name}
                            onChangeText={setName}
                            selectionColor="#000"  // This sets the cursor color to black
                        />
                    </View>

                    {/* Project Name */}
                    <View style={{ marginTop: 0, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 0 }}>
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="briefcase-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Project Name</Text>
                            <Text style={{ color: 'red', fontSize: responsiveFontSize(2), fontWeight: '500' }}>*</Text>
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
                            placeholder="Project Name"
                            placeholderTextColor="#888"
                            value={projectName}
                            onChangeText={setProjectName}
                            selectionColor="#000"  // This sets the cursor color to black
                        />
                    </View>

                    {/* Client Type */}
                    <View style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                        {/* Heading */}
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="business-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Client Type</Text>
                            <Text style={{ color: 'red', fontSize: responsiveFontSize(2), fontWeight: '500' }}>*</Text>
                        </View>

                        <SelectDropdown
                            data={clientTypes}
                            onSelect={(selectedItem, index) => {
                                // console.log('selected company: ', selectedItem, index);
                                setSelectedClientType(selectedItem);
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        <Text style={styles.dropdownButtonTxtStyle}>
                                            {(selectedItem && selectedItem.name) || 'Select Client Type'}
                                        </Text>

                                        <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
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

                    {/* Contact Person Name */}
                    <View style={{ marginTop: 0, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 0 }}>
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="person-circle-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Contact Person Name</Text>
                            <Text style={{ color: 'red', fontSize: responsiveFontSize(2), fontWeight: '500' }}>*</Text>
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
                            placeholder="Contact Person Name"
                            placeholderTextColor="#888"
                            value={cpcName}
                            onChangeText={setCpcName}
                            selectionColor="#000"  // This sets the cursor color to black
                        />
                    </View>

                    {/* CPC Mobile */}
                    <View style={{ marginTop: 0, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="call-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>CPC Mobile</Text>
                            <Text style={{ color: 'red', fontSize: responsiveFontSize(2), fontWeight: '500' }}>*</Text>
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
                            placeholder="CPC Mobile"
                            placeholderTextColor="#888"
                            maxLength={10}
                            keyboardType="numeric"
                            value={cpcMobile}
                            onChangeText={setCpcMobile}
                            selectionColor="#000"  // This sets the cursor color to black
                        />
                    </View>

                    {/* CPC Email */}
                    <View style={{ marginTop: 0, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 0 }}>
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="mail-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>CPC Email</Text>
                            <Text style={{ color: 'red', fontSize: responsiveFontSize(2), fontWeight: '500' }}>*</Text>
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
                            placeholder="CPC Email"
                            placeholderTextColor="#888"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={cpcEmail}
                            onChangeText={setCpcEmail}
                            selectionColor="#000"  // This sets the cursor color to black
                        />
                    </View>

                    {/* CPC Designation */}
                    <View style={{ marginTop: 0, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 0 }}>
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="briefcase-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>CPC Designation</Text>
                            <Text style={{ color: 'red', fontSize: responsiveFontSize(2), fontWeight: '500' }}>*</Text>
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
                            placeholder="CPC Designation"
                            placeholderTextColor="#888"
                            value={cpcDesignation}
                            onChangeText={setCpcDesignation}
                            selectionColor="#000"  // This sets the cursor color to black
                        />
                    </View>

                    {/* Met With CPC */}
                    <View style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                        {/* Heading */}
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="person-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Met with CPC</Text>
                            <Text style={{ color: 'red', fontSize: responsiveFontSize(2), fontWeight: '500' }}>*</Text>
                        </View>

                        <SelectDropdown
                            data={boolean}
                            onSelect={(selectedItem, index) => {
                                // console.log('selected company: ', selectedItem, index);
                                setSelectedMetWithCpc(selectedItem);
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        <Text style={styles.dropdownButtonTxtStyle}>
                                            {(selectedItem && selectedItem.title) || 'Select Yes or No'}
                                        </Text>
                                        <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
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

                    {/* Contact Details of the Person Met (Mobile No) */}
                    {selectedMetWithCpc?.title === 'No' && (
                        <View style={{ marginTop: 0, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 0 }}>
                            <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <Ionicons name="person-outline" size={16} color="#000" />
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Contact Details of the Person Met (Mobile No)</Text>
                                <Text style={{ color: 'red', fontSize: responsiveFontSize(2), fontWeight: '500' }}>*</Text>
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
                                placeholder="Contact details"
                                placeholderTextColor="#888"
                                keyboardType="numeric"
                                maxLength={10}
                                value={contact}
                                onChangeText={setContact}
                                selectionColor="#000"  // This sets the cursor color to black
                            />
                        </View>
                    )}

                    {/* Client Address */}
                    <View style={{ marginTop: 0, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 0 }}>
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="location-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Client Address</Text>
                            <Text style={{ color: 'red', fontSize: responsiveFontSize(2), fontWeight: '500' }}>*</Text>
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
                            placeholder="Client Address"
                            placeholderTextColor="#888"
                            value={clientAddress}
                            onChangeText={setClientAddress}
                            selectionColor="#000"  // This sets the cursor color to black
                            multiline={true}
                        />
                    </View>

                    {/* Address Of */}
                    <View style={{ marginTop: 0, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 0 }}>
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="location-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Address Of</Text>
                            <Text style={{ color: 'red', fontSize: responsiveFontSize(2), fontWeight: '500' }}>*</Text>
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
                            placeholder="Address Of"
                            placeholderTextColor="#888"
                            multiline
                            value={addressOf}
                            onChangeText={setAddressOf}
                            selectionColor="#000"  // This sets the cursor color to black
                        />
                    </View>

                    {/* Town/State */}
                    <View style={{ marginTop: 0, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 0 }}>
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="location-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Town/State</Text>
                            <Text style={{ color: 'red', fontSize: responsiveFontSize(2), fontWeight: '500' }}>*</Text>
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
                            placeholder="Town/State"
                            placeholderTextColor="#888"
                            value={townState}
                            onChangeText={setTownState}
                            selectionColor="#000"  // This sets the cursor color to black
                        />
                    </View>

                    {/* Landmark */}
                    <View style={{ marginTop: 0, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 0 }}>
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="location-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Landmark</Text>
                            <Text style={{ color: 'red', fontSize: responsiveFontSize(2), fontWeight: '500' }}>*</Text>
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
                            placeholder="Landmark"
                            placeholderTextColor="#888"
                            multiline
                            value={landmark}
                            onChangeText={setLandmark}
                            selectionColor="#000"  // This sets the cursor color to black
                        />
                    </View>

                    {/* Optional Fields */}
                    {/* Project Site Address */}
                    <View style={{ marginTop: 0, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 0 }}>
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="location-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Project Site Address</Text>
                        </View>

                        <TextInput
                            style={{ paddingVertical: 4, borderColor: 'green', borderWidth: 1, borderRadius: 10, paddingLeft: 10, fontSize: responsiveFontSize(1.9), color: '#000', backgroundColor: '#f0f8ec', fontWeight: '500', marginBottom: 3 }}
                            placeholder="Project Site Address"
                            placeholderTextColor="#888"
                            value={projectSiteAddress}
                            onChangeText={setProjectSiteAddress}
                            selectionColor="#000"
                            multiline
                        />
                    </View>

                    {/* Project Site Town */}
                    <View style={{ marginTop: 0, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 0 }}>
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="location-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Project Site Town</Text>
                        </View>
                        <TextInput
                            style={{ paddingVertical: 4, borderColor: 'green', borderWidth: 1, borderRadius: 10, paddingLeft: 10, fontSize: responsiveFontSize(1.9), color: '#000', backgroundColor: '#f0f8ec', fontWeight: '500', marginBottom: 3 }}
                            placeholder="Project Site Town"
                            placeholderTextColor="#888"
                            value={projectSiteTown}
                            onChangeText={setProjectSiteTown}
                            selectionColor="#000"
                        />
                    </View>

                    {/* Project Type */}
                    <View style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                        {/* Heading */}
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="business-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Project Type</Text>
                        </View>

                        <SelectDropdown
                            data={projectType}
                            onSelect={(selectedItem, index) => {
                                // console.log('selected company: ', selectedItem, index);
                                setSelectedProjectType(selectedItem);
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        <Text style={styles.dropdownButtonTxtStyle}>
                                            {(selectedItem && selectedItem.title) || 'Select Project Type'}
                                        </Text>
                                        <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
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

                    {/* Department */}
                    {selectedProjectType?.title === 'Govt' && (
                        <View style={{ backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 0 }}>
                            <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <Ionicons name="business-outline" size={16} color="#000" />
                                <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Department</Text>
                            </View>

                            <TextInput
                                style={{ paddingVertical: 4, borderColor: 'green', borderWidth: 1, borderRadius: 10, paddingLeft: 10, fontSize: responsiveFontSize(1.9), color: '#000', backgroundColor: '#f0f8ec', fontWeight: '500', marginBottom: 3 }}
                                placeholder="Enter department"
                                placeholderTextColor="#888"
                                value={department}
                                onChangeText={setDepartment}
                                selectionColor="#000"
                            />
                        </View>
                    )}

                    {/* Floor Area */}
                    <View style={{ backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 0 }}>
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="grid-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Floor Area (Sq. ft)</Text>
                        </View>

                        <TextInput
                            style={{ paddingVertical: 4, borderColor: 'green', borderWidth: 1, borderRadius: 10, paddingLeft: 10, fontSize: responsiveFontSize(1.9), color: '#000', backgroundColor: '#f0f8ec', fontWeight: '500', marginBottom: 3 }}
                            placeholder="Enter area"
                            placeholderTextColor="#888"
                            value={areas}
                            onChangeText={setAreas}
                            selectionColor="#000"
                            keyboardType='numeric'
                        />
                    </View>

                    {/* Wall Area */}
                    <View style={{ backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 0 }}>
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="cube-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Wall Area</Text>
                        </View>

                        <TextInput
                            style={{ paddingVertical: 4, borderColor: 'green', borderWidth: 1, borderRadius: 10, paddingLeft: 10, fontSize: responsiveFontSize(1.9), color: '#000', backgroundColor: '#f0f8ec', fontWeight: '500', marginBottom: 3 }}
                            placeholder="Enter wall area"
                            placeholderTextColor="#888"
                            value={wallArea}
                            onChangeText={setWallArea}
                            selectionColor="#000"
                            keyboardType='numeric'
                        />
                    </View>

                    {/* Site Volume */}
                    <View style={{ backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 0 }}>
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="cube-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Site Volume (Cu.M)</Text>
                        </View>

                        <TextInput
                            style={{ paddingVertical: 4, borderColor: 'green', borderWidth: 1, borderRadius: 10, paddingLeft: 10, fontSize: responsiveFontSize(1.9), color: '#000', backgroundColor: '#f0f8ec', fontWeight: '500', marginBottom: 3 }}
                            placeholder="Enter site volume"
                            placeholderTextColor="#888"
                            value={siteVolume}
                            onChangeText={setSiteVolume}
                            keyboardType='numeric'
                            selectionColor="#000"
                        />
                    </View>

                    {/* Project Stage */}
                    <View style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                        {/* Heading */}
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="cube-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Project Stage</Text>
                        </View>

                        <SelectDropdown
                            data={projectStage}
                            onSelect={(selectedItem, index) => {
                                // console.log('selected company: ', selectedItem, index);
                                setSelectedProjectStage(selectedItem);
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        <Text style={styles.dropdownButtonTxtStyle}>
                                            {(selectedItem && selectedItem.title) || 'Select Project Stage'}
                                        </Text>
                                        <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
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

                    {/* isCompetitor */}
                    <View style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                        {/* Heading */}
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="cube-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Is Competitor</Text>
                        </View>

                        <SelectDropdown
                            data={boolean}
                            onSelect={(selectedItem, index) => {
                                // console.log('selected company: ', selectedItem, index);
                                setSelectedCompetitor(selectedItem);
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        <Text style={styles.dropdownButtonTxtStyle}>
                                            {(selectedItem && selectedItem.title) || 'Select Yes or No'}
                                        </Text>
                                        <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
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

                    {/* Competitor */}
                    <View style={{ backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 0 }}>
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="cube-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Competitor</Text>
                        </View>

                        <TextInput
                            style={{ paddingVertical: 4, borderColor: 'green', borderWidth: 1, borderRadius: 10, paddingLeft: 10, fontSize: responsiveFontSize(1.9), color: '#000', backgroundColor: '#f0f8ec', fontWeight: '500', marginBottom: 3 }}
                            placeholder="Competitor"
                            placeholderTextColor="#888"
                            value={competitor}
                            onChangeText={setCompetitor}
                            selectionColor="#000"
                        />
                    </View>

                    {/* Interested In KSL */}
                    <View style={{ flexDirection: 'column', justifyContent: 'center', backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                        {/* Heading */}
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="cube-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Interested In KSL</Text>
                        </View>

                        <SelectDropdown
                            data={boolean}
                            onSelect={(selectedItem, index) => {
                                // console.log('selected company: ', selectedItem, index);
                                setSelectedInterestedInKSL(selectedItem);
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        <Text style={styles.dropdownButtonTxtStyle}>
                                            {(selectedItem && selectedItem.title) || 'Select Yes or No'}
                                        </Text>
                                        <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
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

                    {/* Interested In Other */}
                    <View style={{ backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 0 }}>
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="cube-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Interested In Other</Text>
                        </View>

                        <TextInput
                            style={{ paddingVertical: 4, borderColor: 'green', borderWidth: 1, borderRadius: 10, paddingLeft: 10, fontSize: responsiveFontSize(1.9), color: '#000', backgroundColor: '#f0f8ec', fontWeight: '500', marginBottom: 3 }}
                            placeholder="Interested In Other"
                            placeholderTextColor="#888"
                            value={interestedInOther}
                            onChangeText={setInterestedInOther}
                            selectionColor="#000"
                        />
                    </View>

                    {/* Competitor Price */}
                    <View style={{ backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 0 }}>
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="cube-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Competitor Price</Text>
                        </View>

                        <TextInput
                            style={{ paddingVertical: 4, borderColor: 'green', borderWidth: 1, borderRadius: 10, paddingLeft: 10, fontSize: responsiveFontSize(1.9), color: '#000', backgroundColor: '#f0f8ec', fontWeight: '500', marginBottom: 3 }}
                            placeholder="Competitor Price"
                            placeholderTextColor="#888"
                            value={competitorPrice}
                            keyboardType='numeric'
                            onChangeText={setCompetitorPrice}
                            selectionColor="#000"
                        />
                    </View>

                    {/* Our Price */}
                    <View style={{ backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 0 }}>
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="cube-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Our Price</Text>
                        </View>

                        <TextInput
                            style={{ paddingVertical: 4, borderColor: 'green', borderWidth: 1, borderRadius: 10, paddingLeft: 10, fontSize: responsiveFontSize(1.9), color: '#000', backgroundColor: '#f0f8ec', fontWeight: '500', marginBottom: 3 }}
                            placeholder="Our Price"
                            placeholderTextColor="#888"
                            value={ourPrice}
                            keyboardType='numeric'
                            onChangeText={setOurPrice}
                            selectionColor="#000"
                        />
                    </View>

                    {/* Remark 1 */}
                    <View style={{ backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 0 }}>
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="cube-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Remark 1</Text>
                        </View>

                        <TextInput
                            style={{ paddingVertical: 4, borderColor: 'green', borderWidth: 1, borderRadius: 10, paddingLeft: 10, fontSize: responsiveFontSize(1.9), color: '#000', backgroundColor: '#f0f8ec', fontWeight: '500', marginBottom: 3 }}
                            placeholder="Enter Remark 1"
                            placeholderTextColor="#888"
                            value={remark1}
                            onChangeText={setRemark1}
                            selectionColor="#000"
                        />
                    </View>

                    {/* Remark 2 */}
                    <View style={{ backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 0 }}>
                        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Ionicons name="cube-outline" size={16} color="#000" />
                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Remark 2</Text>
                        </View>

                        <TextInput
                            style={{ paddingVertical: 4, borderColor: 'green', borderWidth: 1, borderRadius: 10, paddingLeft: 10, fontSize: responsiveFontSize(1.9), color: '#000', backgroundColor: '#f0f8ec', fontWeight: '500', marginBottom: 3 }}
                            placeholder="Enter Remark 2"
                            placeholderTextColor="#888"
                            value={remark2}
                            onChangeText={setRemark2}
                            selectionColor="#000"
                        />
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

            {/* Submit button */}
            <TouchableOpacity onPress={submitHandler} style={{ height: 45, position: 'absolute', bottom: 8, backgroundColor: green, width: '94%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
                {loading ? (
                    <ActivityIndicator size='small' color={'#000'} />
                ) : (
                    <>
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2.2), fontWeight: '600' }}>Add Client</Text>
                        <Ionicons name="add-circle-sharp" size={22} color={'#000'} style={{ marginLeft: 4 }} />
                    </>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default NewClientForm;

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
        marginTop: 5,
        // height: '100%'
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
import { View, Text, StatusBar, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { background, green } from '../utils/colors';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SelectDropdown from 'react-native-select-dropdown';
import GetLocation from 'react-native-get-location';
import { fetchVisitType } from '../utils/fetchVisitType';
import { useSelector } from 'react-redux';
import { fetchClients } from '../utils/fetchClients';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const boolean = [
    { id: 1, title: 'Yes' },
    { id: 2, title: 'No' },
];

const NewTask = ({ navigation }) => {

    const userDetails = useSelector(state => state.user);

    const [latitude, setLatitude] = useState(null);

    const [longitude, setLongitude] = useState(null);

    const [clients, setClients] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);

    const [visitTypes, setVisitTypes] = useState(null);
    const [selectedVisitType, setSelectedVisitType] = useState(null);

    const [remarks, setRemarks] = useState(null);

    const [loading, setLoading] = useState(false);

    const [locationLoading, setLocationLoading] = useState(true);

    const [selectedMetWithCpc, setSelectedMetWithCpc] = useState('');

    useEffect(() => {
        fetchCurrentLocation();
    }, []);

    // fetch Current Location
    const fetchCurrentLocation = async () => {
        try {
            const newLocation = await GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 30000,
                rationale: {
                    title: 'Location permission',
                    message: 'The app needs permission to access your location.',
                    buttonPositive: 'Ok',
                },
            });

            setLatitude(newLocation?.latitude);

            setLongitude(newLocation?.longitude);

        } catch (error) {
            console.log('location error: ', error);

            // Alert.alert('Location Error: ', 'Turn on your Location services', [
            //     {
            //         text: 'Go to Settings',
            //         onPress: () => Linking.openSettings(),
            //         style: 'cancel',
            //     },
            // ]);
        } finally {
            setLocationLoading(false);
        }
    };

    // fetch Visit Type
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchVisitType(userDetails); // Fetch all products

                setVisitTypes(data);

            } catch (error) {
                console.log('Error fetching visit: ', error?.message);
            }
        };

        fetchData();
    }, []);

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

    // Add Task Handler
    const addTaskHandler = async () => {
        if (!selectedClient || !selectedVisitType || !latitude || !longitude || !remarks) {
            Toast.show({
                type: 'error',
                text1: 'All fields are required',
                text2: 'Please fill all the details and try again',
                position: 'top',
                topOffset: 5,
            });

            return;
        } else {
            try {
                setLoading(true);

                // Data object as per the API requirement
                const data = {
                    client_id: selectedClient?.id,
                    visit_type: selectedVisitType?.id,
                    latitude: latitude.toString(),
                    longitude: longitude.toString(),
                    remarks: remarks
                };

                // API Call using axios
                const response = await axios.post(`/api/user/task/create`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // Handle success response
                if (response.data.status) {

                    navigation.navigate('Home');

                    Toast.show({
                        type: 'success',
                        text1: 'Submission successful',
                        text2: response?.data?.message,
                        position: 'top',
                        topOffset: 5,
                    });

                    setRemarks(null);
                } else {
                    Toast.show({
                        type: 'error',
                        text1: response?.data?.message || 'Something went wrong.',
                        text2: 'Please check your credentials and try again.',
                        position: 'top',
                        topOffset: 5,
                    });
                }

            } catch (error) {
                if (error?.response) {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: error.response?.data?.message || 'Something went wrong. Please try again.',
                        position: 'top',
                        topOffset: 5,
                    });
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Network error. Please check your internet connection and try again.',
                        position: 'top',
                        topOffset: 5,
                    });
                }
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: background }}>
            <StatusBar
                animated={true}
                backgroundColor={'#F4F5FA'}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ paddingHorizontal: 12, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5, width: '100%' }}>
                <TouchableOpacity
                    style={{ borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: '#daeecf', borderColor: green, borderWidth: 1 }}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="arrowleft" style={{ color: '#000' }} size={16} />
                </TouchableOpacity>

                <View style={{ width: '80%' }}>
                    <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '700', color: '#000', textAlign: 'center' }}>Add a new Task</Text>
                </View>

                <View style={{ width: 30, height: 30 }}></View>
            </View>

            <ScrollView contentContainerStyle={{ flex: 1, paddingBottom: 30 }}>
                {/* Select Client */}
                <View style={{ flexDirection: 'column', marginHorizontal: 12, justifyContent: 'center', marginTop: 10, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                    {/* Heading */}
                    <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                        <Ionicons name="person-outline" size={15} color="#000" />
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Select Client</Text>
                    </View>

                    <SelectDropdown
                        data={clients?.length > 0 ? clients : [{ name: 'Loading clients list...' }]} // Placeholder while loading
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

                {/* Select Visit Type */}
                <View style={{ flexDirection: 'column', marginHorizontal: 12, justifyContent: 'center', marginTop: 10, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                    {/* Heading */}
                    <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                        <Ionicons name="person-outline" size={15} color="#000" />
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Select Visit Type</Text>
                    </View>

                    <SelectDropdown
                        data={visitTypes?.length > 0 ? visitTypes : [{ name: 'Loading visit types list...' }]} // Placeholder while loading
                        onSelect={(selectedItem) => {
                            // console.log('selected visit: ', selectedItem);
                            setSelectedVisitType(selectedItem);
                        }}
                        renderButton={(selectedItem, isOpened) => {
                            return (
                                <View style={styles.dropdownButtonStyle}>
                                    <Text style={styles.dropdownButtonTxtStyle}>
                                        {(selectedItem && selectedItem.name) || 'Select Visit Type'}
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

                {/* Remarks */}
                <View style={{ marginTop: 12, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12, marginHorizontal: 12 }}>
                    {/* Heading */}
                    <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Ionicons name="create-outline" size={15} color="#000" />
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Add Remarks</Text>
                    </View>

                    <TextInput
                        style={{
                            paddingVertical: 3,
                            borderColor: green,
                            borderWidth: 1,
                            borderRadius: 10,
                            paddingLeft: 10,
                            fontSize: responsiveFontSize(1.9),
                            color: '#000',
                            backgroundColor: '#f0f8ec',
                            fontWeight: '500'
                        }}
                        placeholder="Enter Remarks"
                        placeholderTextColor="#888"
                        value={remarks}
                        onChangeText={(text) => setRemarks(text)}
                    />
                </View>

                {/* Met With CPC */}
                <View style={{ flexDirection: 'column', marginHorizontal: 12, justifyContent: 'center', marginTop: 10, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                    {/* Heading */}
                    <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Ionicons name="person-outline" size={15} color="#000" />
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Met with CPC</Text>
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

                {/* Latitude */}
                <View style={{ flexDirection: 'column', marginHorizontal: 12, justifyContent: 'center', marginTop: 10, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                    {/* Heading */}
                    <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Ionicons name="location-outline" size={15} color="#000" />
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Latitude</Text>
                    </View>

                    <View style={{ paddingHorizontal: 10, paddingVertical: 8, backgroundColor: '#f0f8ec', borderColor: green, borderWidth: 1, borderRadius: 10 }}>
                        {locationLoading ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                                <ActivityIndicator size='small' color={green} />
                                <Text style={{ color: '#888', fontSize: responsiveFontSize(1.8), fontStyle: 'italic', fontWeight: '500' }}>Fetching latitude</Text>
                            </View>
                        ) : (
                            <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(1.9) }}>{latitude}</Text>
                        )}
                    </View>
                </View>

                {/* Longitude */}
                <View style={{ flexDirection: 'column', marginHorizontal: 12, justifyContent: 'center', marginTop: 10, backgroundColor: '#fff', padding: 13, elevation: 3, borderRadius: 12 }}>
                    {/* Heading */}
                    <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                        <Ionicons name="earth-outline" size={15} color="#000" />
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '500' }}>Longitude</Text>
                    </View>

                    <View style={{ paddingHorizontal: 10, paddingVertical: 8, backgroundColor: '#f0f8ec', borderColor: green, borderWidth: 1, borderRadius: 10 }}>
                        {locationLoading ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                                <ActivityIndicator size='small' color={green} />
                                <Text style={{ color: '#888', fontSize: responsiveFontSize(1.8), fontStyle: 'italic', fontWeight: '500' }}>Fetching longitude</Text>
                            </View>
                        ) : (
                            <Text style={{ color: '#000', fontWeight: '500', fontSize: responsiveFontSize(1.9) }}>{longitude}</Text>
                        )}
                    </View>
                </View>
            </ScrollView>

            {/* Add Task Button */}
            <TouchableOpacity onPress={addTaskHandler} style={{ elevation: 3, position: 'absolute', bottom: 10, width: '95%', alignSelf: 'center', backgroundColor: green, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 12, paddingVertical: 13, gap: 5 }}>
                {loading ? (
                    <ActivityIndicator size='small' color={'#000'} />
                ) : (
                    <>
                        <Text style={{ color: '#000', fontSize: responsiveFontSize(2.1), fontWeight: '500' }}>Add Task</Text>
                        <AntDesign name="plussquare" size={18} color="#000" />
                    </>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default NewTask;

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        width: '100%',
        // height: 50,
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
        // width: '100%'
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
});;
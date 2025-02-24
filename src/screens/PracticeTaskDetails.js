import { View, Text, ScrollView, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import Sidebar from '../components/Sidebar';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectDropdown from 'react-native-select-dropdown'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import Icon5 from 'react-native-vector-icons/Entypo';
import Icon6 from 'react-native-vector-icons/FontAwesome5';
import { useState } from 'react';
import { green } from '../utils/colors';

const status = [
    { title: 'Pending', icon: 'hourglass-empty' },
    { title: 'Completed', icon: 'check-circle' },
    { title: 'In progress', icon: 'update ' },
];

const TaskDetails = ({ route, navigation }) => {

    const { taskId } = route.params;
    // console.log('taskId: ', taskId);

    return (
        <View style={{ flex: 1, backgroundColor: '#F4F5FA', paddingBottom: 30 }}>
            <StatusBar
                animated={true}
                backgroundColor={'#F4F5FA'}
                barStyle="dark-content"
            />

            {/* Header */}
            <View style={{ paddingHorizontal: 12, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5, width: '100%' }}>
                <TouchableOpacity style={{ borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 30, height: 30, backgroundColor: '#daeecf', borderColor: green, borderWidth: 1 }} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" style={{ color: '#000' }} size={16} />
                </TouchableOpacity>

                <View style={{ width: '80%' }}>
                    <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: '600', color: '#000', textAlign: 'center' }}>Task Details</Text>
                </View>

                <View style={{ width: 30, height: 30, }}></View>
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 12 }}>
                <View style={{ marginBottom: 15 }}>
                    <View style={{ backgroundColor: green, width: '100%', flexDirection: 'row', marginBottom: 10, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 10 }}>
                        <Text style={{ fontSize: responsiveFontSize(2.2), fontWeight: 'bold', color: '#000' }}>{task.title}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, backgroundColor: '#fff', elevation: 1, borderRadius: 10, padding: 10 }}>
                        <MaterialIcons name="location-on" size={19} color="#000" style={{ marginRight: 8 }} />
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', fontWeight: '500' }}>{task?.location?.address}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, backgroundColor: '#fff', elevation: 1, borderRadius: 10, padding: 10 }}>
                        <MaterialIcons name="description" size={19} color="#000" style={{ marginRight: 8 }} />
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', width: '92%', fontWeight: '500' }}>{task.description}</Text>
                    </View>

                    {/* Status */}
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, backgroundColor: '#fff', elevation: 1, borderRadius: 10, padding: 10 }}>
                        <MaterialIcons name="info" size={19} color="#000" style={{ marginRight: 8 }} />
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', width: '92%', fontWeight: '500' }}>Status: {task.status}</Text>
                    </View> */}

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, backgroundColor: '#fff', elevation: 1, borderRadius: 10, padding: 10 }}>
                        <MaterialIcons name="calendar-today" size={19} color="#000" style={{ marginRight: 8 }} />
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', width: '92%', fontWeight: '500' }}>Assigned:  {task.assignedDate}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, backgroundColor: '#fff', elevation: 1, borderRadius: 10, padding: 10 }}>
                        <MaterialIcons name="access-time" size={19} color="#000" style={{ marginRight: 8 }} />
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', width: '92%', fontWeight: '500' }}>Due:  {task.dueTime}</Text>
                    </View>

                    <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', paddingLeft: 10, backgroundColor: '#fff', elevation: 1, borderRadius: 10 }}>
                        <MaterialIcons name="info" size={19} color="#000" style={{ marginRight: 8 }} />

                        <SelectDropdown
                            data={status}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index);
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <View style={styles.dropdownButtonStyle}>
                                        {/* {selectedItem && (
                                            <MaterialIcons name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                                        )} */}
                                        <Text style={styles.dropdownButtonTxtStyle}>
                                            {(selectedItem && selectedItem.title) || 'Select Status'}
                                        </Text>
                                        <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                                    </View>
                                );
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                        {/* <MaterialIcons name={item.icon} style={styles.dropdownItemIconStyle} /> */}
                                        <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                    </View>
                                );
                            }}
                            showsVerticalScrollIndicator={false}
                            dropdownStyle={styles.dropdownMenuStyle}
                        />
                    </View>
                </View>
            </ScrollView>

            {/* Submit button */}
            <TouchableOpacity style={{ backgroundColor: green, elevation: 1, flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center', height: 50, borderRadius: 12, position: 'absolute', bottom: 5, width: '97%', alignSelf: 'center' }}>
                <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2.3) }}>Submit</Text>
                <MaterialIcons name="send" size={18} color="#000" style={{ marginRight: 8 }} />
            </TouchableOpacity>
        </View>
    );
};

export default TaskDetails;

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        width: 120,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingHorizontal: 12,
        // elevation: 1
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
        // backgroundColor: 'red'
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
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
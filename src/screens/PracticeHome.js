import { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, FlatList, Alert, BackHandler, StyleSheet, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import { green, background, sidebarBackground } from '../utils/colors';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Sidebar from '../components/Sidebar';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { fetchTasks } from '../utils/fetchTasks';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Home = ({ navigation }) => {

    const userDetails = useSelector(state => state.user);
    // console.log('userDetails: ', userDetails);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [tasks, setTasks] = useState(null);

    const [loading, setLoading] = useState(true);

    const [filtereedTasks, setFilteredTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch tasks
    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    setLoading(true);

                    const data = await fetchTasks(userDetails); // Fetch all products
                    setTasks(data.reverse()); // Reverse the array before setting it in state
                    setFilteredTasks(data.reverse())

                } catch (error) {
                    console.log('Error fetching tasks: ', error?.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();

        }, [userDetails]) // Dependency array to refetch if userDetails change
    );

    // Filter clients based on the search query
    const handleSearch = (query) => {
        setSearchQuery(query);

        if (query.trim() === '') {
            setFilteredTasks(tasks); // Reset if the query is empty
        } else {
            const filtered = tasks?.client_name?.filter(client =>
                client.name.toLowerCase().includes(query.toLowerCase()) // Filter based on client name
            );

            setFilteredTasks(filtered);
        }
    };

    // Flatlist component card
    const TaskCard = ({ task }) => {

        const isCompleted = task?.status === "2";
        const statusText = isCompleted ? "Completed" : "Pending";
        const statusColor = isCompleted ? "green" : "#e69500";

        return (
            <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('TaskDetails', { taskId: task?.id })} style={{ elevation: 4 }}>
                <LinearGradient
                    colors={['#fff', '#b8dfa4']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        borderRadius: 15,
                        padding: 5,
                        marginBottom: 15,
                        borderColor: green,
                        borderWidth: 1
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', elevation: 2, marginBottom: 10, backgroundColor: '#4ec176', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 8, borderTopLeftRadius: 12, borderTopRightRadius: 12, borderBottomRightRadius: 3, borderBottomLeftRadius: 3 }}>
                        <Icon name="assignment" size={20} color="#000" />

                        <Text style={{ fontSize: responsiveFontSize(2.1), fontWeight: '600', color: '#000', marginLeft: 5 }}>
                            {task.project_name}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, margin: 6, gap: 3 }}>
                        <View style={{ backgroundColor: '#cee9c0', width: 25, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 6, borderWidth: 1, borderColor: green }}>
                            <Icon name="location-pin" size={16} color="#000" />
                        </View>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', marginLeft: 5, fontWeight: '500' }}>{task.client_address}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, margin: 6, gap: 3 }}>
                        <View style={{ backgroundColor: '#cee9c0', width: 25, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 6, borderWidth: 1, borderColor: green }}>
                            <Icon name="date-range" size={15} color="#000" />
                        </View>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', marginLeft: 5, fontWeight: '500' }}>
                            Deadline: {task.deadline_date}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, margin: 6, gap: 3 }}>
                        <View style={{ backgroundColor: '#cee9c0', width: 25, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 6, borderWidth: 1, borderColor: green }}>
                            <Icon name="account-circle" size={16} color="#000" />
                        </View>
                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', marginLeft: 5, fontWeight: '500' }}>
                            Client name: {task.client_name}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, margin: 6, gap: 3 }}>
                        <View style={{ backgroundColor: '#cee9c0', width: 25, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 6, borderWidth: 1, borderColor: green }}>
                            <Icon
                                name={isCompleted ? "check-circle" : "hourglass-empty"}
                                size={15}
                                color={statusColor}
                            />
                        </View>

                        <Text style={{ fontSize: responsiveFontSize(1.9), color: '#000', marginLeft: 5, fontWeight: '500' }}>
                            {statusText}
                        </Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F5FA', paddingHorizontal: 0 }}>
            <StatusBar
                animated={true}
                backgroundColor={isSidebarOpen ? sidebarBackground : background}
                barStyle="dark-content"
            />

            {/* Search Bar */}
            <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                <TextInput
                    placeholder="Search by a client name"
                    placeholderTextColor={'#a9a9a9'}
                    value={searchQuery}
                    onChangeText={handleSearch}
                    style={{
                        height: 40,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: green,
                        paddingHorizontal: 10,
                        backgroundColor: '#fff',
                        color: '#000',
                        fontWeight: '500'
                    }}
                />
            </View>

            {/* FlatList of Tasks */}
            {loading ? (
                <View style={{ paddingHorizontal: 10 }}>
                    {[...Array(5)].map((_, index) => (
                        <ShimmerPlaceHolder
                            key={index}
                            style={{
                                height: 150,
                                width: '100%',
                                borderRadius: 15,
                                elevation: 4,
                                marginVertical: 5,
                            }}
                        />
                    ))}
                </View>
            ) : (
                <FlatList
                    data={filtereedTasks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <TaskCard task={item} />}
                    contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 1, paddingVertical: 1, marginTop: 10, paddingHorizontal: 10 }}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Image source={require('../assets/notasks.png')} style={{ width: 100, height: 100 }} />
                            <Text style={styles.emptyText}>No tasks available currently</Text>
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    emptyText: {
        fontSize: responsiveFontSize(2.2),
        fontWeight: '500',
        color: '#ababab',
    },
});
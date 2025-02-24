import { useEffect, useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { fetchClients } from '../utils/fetchClients';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sidebar from '../components/Sidebar';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { green } from '../utils/colors';

const Clients = ({ navigation }) => {

    const userDetails = useSelector(state => state.user);

    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    // Fetch clients
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchClients(userDetails); // Fetch all clients
                setClients(data);
                setFilteredClients(data);
            } catch (error) {
                console.log('Error fetching clients: ', error?.message);
            }
        };

        fetchData();
    }, []);

    // Filter clients based on the search query
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setFilteredClients(clients); // Reset if the query is empty
        } else {
            const filtered = clients.filter(client =>
                client.name.toLowerCase().includes(query.toLowerCase()) // Filter based on client name
            );

            setFilteredClients(filtered);
        }
    };

    // Function to render highlighted text
    const renderHighlightedText = (text, highlight) => {
        if (!highlight.trim()) {
            return <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '500', color: '#333' }}>{text}</Text>;
        }

        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

        return (
            <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '500', color: '#333' }}>
                {parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <Text key={index} style={{ backgroundColor: 'yellow', color: '#000' }}>{part}</Text>
                    ) : (
                        part
                    )
                )}
            </Text>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#F4F5FA' }}>
            <StatusBar
                animated={true}
                backgroundColor={isSidebarOpen ? '#ebebeb' : '#F4F5FA'}
                barStyle="dark-content"
            />

            {/* Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} navigation={navigation} activeItem="Clients" />

            {/* Header */}
            <View style={{ paddingHorizontal: 10, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, width: '100%' }}>
                <TouchableOpacity onPress={toggleSidebar} style={{ width: '10%', height: 30, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Icon name="menu" size={22} color="#000" />
                </TouchableOpacity>

                <View style={{ width: '80%' }}>
                    <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '700', color: '#000', textAlign: 'center' }}>Clients</Text>
                </View>

                <View style={{ width: '10%' }} />
            </View>

            {/* Search Bar */}
            <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                <TextInput
                    placeholder="Search clients..."
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

            {/* Clients List */}
            <FlatList
                data={filteredClients}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                        {renderHighlightedText(item.name, searchQuery)}
                    </View>
                )}
                ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#000', marginTop: 20 }}>No clients found</Text>}
                contentContainerStyle={{ paddingHorizontal: 10 }}
            />
        </View>
    );
};

export default Clients;
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

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert(
          'Confirm Exit',
          'Are you sure you want to exit the app?',
          [
            {
              text: 'Cancel',
              onPress: () => null, // Do nothing
              style: 'cancel',
            },
            {
              text: 'Exit',
              onPress: () => BackHandler.exitApp(), // Exit the app
            },
          ],
          { cancelable: false }
        );
        return true; // Prevent default back button behavior
      };

      // Add the event listener
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      // Cleanup the event listener on unmount
      return () => backHandler.remove();
    }, [])
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Fetch tasks
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const data = await fetchTasks(userDetails);
          setTasks(data.reverse());
          setFilteredTasks(data.reverse());
          console.log("Fetched tasks: ", data); // Add this for debugging
        } catch (error) {
          console.log('Error fetching tasks: ', error?.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [userDetails])
  );

  // Filter clients based on the search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks?.filter(task =>
        task.client_name?.toLowerCase().includes(query.toLowerCase())
      );
      console.log("Filtered tasks: ", filtered); // Log filtered results
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
              Client name: {renderHighlightedText(task.client_name, searchQuery)}
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
    <SafeAreaView style={{ flex: 1, backgroundColor: background, paddingHorizontal: 0 }}>
      <StatusBar
        animated={true}
        backgroundColor={isSidebarOpen ? sidebarBackground : background}
        barStyle="dark-content"
      />

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} closeSidebar={closeSidebar} navigation={navigation} activeItem="Home" />

      {/* Header */}
      <View style={{ paddingHorizontal: 15, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, width: '100%' }}>
        <TouchableOpacity onPress={toggleSidebar} style={{ width: '10%', height: 30, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Icon name="menu" size={22} color="#000" />
        </TouchableOpacity>

        <View style={{ width: '80%' }}>
          <Text style={{ fontSize: responsiveFontSize(2.3), fontWeight: '700', color: '#000', textAlign: 'center' }}>Dashboard</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ borderColor: '#000', borderWidth: 0.5, width: 28, elevation: 1, backgroundColor: '#d3ebc6', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 28, borderRadius: 30 }}>
          <Icon3 name="user" size={15} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Add a New Client / Add a New Visit */}
      <View style={{ paddingHorizontal: 10, marginBottom: 20, marginTop: 5, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('NewClientForm')} style={{ marginTop: 0, elevation: 2, backgroundColor: green, width: '49%', alignSelf: 'center', paddingVertical: 13, gap: 5, borderRadius: 11, flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2) }}>Add a New Client</Text>
          <Icon3 name="plussquare" size={18} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('NewTask')} style={{ marginVertical: 0, elevation: 2, backgroundColor: green, width: '49%', alignSelf: 'center', paddingVertical: 13, gap: 5, borderRadius: 11, flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ color: '#000', fontWeight: '600', fontSize: responsiveFontSize(2) }}>Add a New Visit</Text>
          <Icon3 name="plussquare" size={18} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Heading */}
      <LinearGradient
        colors={['#F4F5FA', '#bde1ab', '#F4F5FA']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          paddingVertical: 8,
          paddingHorizontal: 15,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <View style={{ alignSelf: 'center' }}>
          <Text style={{ color: '#000', fontSize: responsiveFontSize(2), fontWeight: '600' }}>
            Clients Visits
          </Text>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={{ paddingHorizontal: 10, marginBottom: 10, marginTop: 15 }}>
        <TextInput
          placeholder="Search by a client name"
          placeholderTextColor={'#a9a9a9'}
          value={searchQuery}
          onChangeText={handleSearch}
          style={{
            height: 42,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: green,
            paddingHorizontal: 15,
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
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import { purple } from '../utils/colors';

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F5FA', padding: 20 }}>
      <StatusBar
        animated={true}
        backgroundColor={'#F4F5FA'}
        barStyle="dark-content"
      />

      <View style={{}}>

        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity>
            <Icon name="menu" size={30} color="#000" />
          </TouchableOpacity>
          <View style={{ position: 'absolute', width: '100%' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', textAlign: 'center' }}>Dashboard</Text>
          </View>
        </View>

        {/* Profile Section */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }} // Replace with actual profile image URL
            style={{ width: 80, height: 80, borderRadius: 40, marginRight: 15 }}
          />
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: purple }}>Delivery Boy</Text>
            <Text style={{ fontSize: 14, color: 'gray' }}>deliveryboy@gmail.com</Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 }}>
          {/* Completed Deliveries */}
          <View style={cardStyle('#E8F9FD')}>
            <Text style={cardTextStyle}>20</Text>
            <Text style={{ fontSize: 14, color: 'gray' }}>Completed Deliveries</Text>
          </View>

          {/* Pending Deliveries */}
          <View style={cardStyle('#FFE3E4')}>
            <Text style={cardTextStyle}>100</Text>
            <Text style={{ fontSize: 14, color: 'gray' }}>Pending Deliveries</Text>
          </View>

          {/* Total Collected */}
          <View style={cardStyle('#EEEFFF')}>
            <Text style={cardTextStyle}>50</Text>
            <Text style={{ fontSize: 14, color: 'gray' }}>Total Collected</Text>
          </View>

          {/* Total Earnings */}
          <View style={cardStyle('#FFEEE2')}>
            <Text style={cardTextStyle}>26</Text>
            <Text style={{ fontSize: 14, color: 'gray' }}>Total Earnings</Text>
          </View>
        </View>

        {/* Cancelled Deliveries */}
        <View style={{ backgroundColor: '#F9D6D7', padding: 15, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FF4D67' }}>20 Deliveries Cancelled</Text>
            <Text style={{ fontSize: 14, color: 'gray' }}>10 Minutes estimated</Text>
          </View>
          <Icon name="cancel" size={30} color="#FF4D67" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const cardStyle = (bgColor) => ({
  backgroundColor: bgColor,
  width: '48%',
  padding: 20,
  borderRadius: 10,
  marginBottom: 20,
  alignItems: 'center',
});

const cardTextStyle = {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 5,
};

export default Home;
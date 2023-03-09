import MapView from 'react-native-maps';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import Footer from '../components/Footer';
import Header from '../components/Header';
import {useSelector} from 'react-redux';
const Map = () => {
  const navigation = useNavigation();
  const theme = useSelector(state => state.theme.theme);
  useEffect(() => {
    navigation.setOptions({headerShown: false});
  });
  return (
    <View style={{flex: 1}}>
      <Header type={2} pageTitle={'Map'} />
      <MapView
        style={{flex: 1}}
        userInterfaceStyle={theme}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <Footer page={'Map'} />
    </View>
  );
};
export default Map;

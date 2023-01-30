import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {ImageBackground, View, Image, Text, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import texts from '../assets/language.json';
import congratulationsCover from '../assets/congratulations.png';
import logo from '../assets/logo.png';
const Congratulations = () => {
  const navigation = useNavigation();
  const language = useSelector(state => state.language.language);
  const text = texts[language];
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const finish = () => {
    navigation.navigate('Login');
  };
  return (
    <View
      style={{
        backgroundColor: '#007236',
        flex: 1,
      }}>
      <ImageBackground
        source={congratulationsCover}
        style={{flex: 10, paddingTop: 50}}
        imageStyle={{resizeMode: 'contain', paddingTop: 1000}}>
        <View
          style={[
            {flex: 1, paddingHorizontal: 30},
            language === 'english'
              ? {alignItems: 'flex-end'}
              : {alignItems: 'flex-start'},
          ]}>
          <Image source={logo} />
        </View>
        <View style={{flex: 9, paddingHorizontal: 20}}>
          <Text style={{color: '#F7F7F7', fontSize: 30}}>
            {text['congratulations-title']}
          </Text>
          <Text style={{color: '#F7F7F7', fontSize: 16}}>
            {text['congratulations-subtitle']}
          </Text>
        </View>
        <Pressable
          style={{
            flex: 0.8,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            width: '80%',
            marginBottom: 30,
          }}
          onPress={finish}>
          <Text style={{color: '#007236'}}>
            {text['congratulations-button']}
          </Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
};
export default Congratulations;

import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import texts from '../assets/language.json';
import Header from '../components/Header';
const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const language = useSelector(state => state.language.language);
  const theme = useSelector(state => state.theme.theme);
  const text = texts[language];
  const user = useSelector(state => state.user.user);
  const backgroundColor = theme === 'light' ? '#E5E5E5' : '#1c2125';
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 50,
        flex: 1,
        backgroundColor: backgroundColor,
      }}>
      <Header type={2} />
    </View>
  );
};
export default Home;

import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import texts from '../assets/language.json';
import balanceImage from '../assets/balance.png';
import fingerprintLogo from '../assets/fingerprint.png';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import {useState} from 'react';
import FingerprintModal from '../components/FingerprintModal';
const Home = () => {
  const navigation = useNavigation();
  const language = useSelector(state => state.language.language);
  const theme = useSelector(state => state.theme.theme);
  const text = texts[language];
  const user = useSelector(state => state.user.user);
  const rowStyle =
    language === 'english'
      ? {flexDirection: 'row'}
      : {flexDirection: 'row-reverse'};
  const backgroundColor = theme === 'light' ? '#E5E5E5' : '#1c2125';
  const [fingerprintVisability, setFingerprintVisibilty] = useState(false);
  const [balanceText, setBalanceText] = useState(text['balance-hidden']);
  const [balanceFont, setBalanceFont] = useState(20);
  const onFingerprintApproval = () => {
    setBalanceText(`$${user.balance}`);
    setBalanceFont(35);
    setFingerprintVisibilty(false);
  };
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
      <ImageBackground
        source={balanceImage}
        style={{
          backgroundColor: 'green',
          borderRadius: 20,
          marginTop: 30,
        }}>
        <View
          style={[
            rowStyle,
            {
              justifyContent: 'space-between',
              marginHorizontal: 20,
              marginVertical: 5,
            },
          ]}>
          <Text style={{color: '#F7F7F7', alignSelf: 'center'}}>
            {text['balance']}
          </Text>
          <CustomButton
            onPress={setFingerprintVisibilty.bind(this, balanceFont === 20)}
            icon={fingerprintLogo}
            style={styles.fingerprintButton}
          />
        </View>
        <Text style={[styles.balance, {fontSize: balanceFont}]}>
          {balanceText}
        </Text>
      </ImageBackground>
      <FingerprintModal
        modalVisibility={fingerprintVisability}
        toggleModalVisible={setFingerprintVisibilty.bind(this, false)}
        onApproval={onFingerprintApproval}
        subtitle={text['show-balance-subtitle']}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  fingerprintButton: {
    borderWidth: 2,
    borderColor: '#F6A721',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balance: {
    alignSelf: 'center',
    marginBottom: 40,
    color: '#F7F7F7',
    fontWeight: 'bold',
  },
});
export default Home;

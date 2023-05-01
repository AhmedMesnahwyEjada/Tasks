import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';
import {useQuery} from 'react-query';
import texts from '../assets/language.json';
import fingerprintLogo from '../assets/fingerprint.png';
import Header from '../components/Header';
import {useState} from 'react';
import FingerprintModal from '../components/FingerprintModal';
import CustomButton from '../components/CustomButton';
import Card from '../components/Card';
import History from './History';
import BeneficiariesMini from '../components/BeneficiariesMini';
import Footer from '../components/Footer';
import cash from '../assets/cash.png';
import utilities from '../assets/utilities.png';
import history from '../assets/history.png';
import cards from '../assets/cards.png';
import {getCards} from '../axios/Cards';
const Home = () => {
  const navigation = useNavigation();
  const language = useSelector(state => state.language.language);
  const theme = useSelector(state => state.theme.theme);
  const text = texts[language];
  const user = useSelector(state => state.user.user);
  const rowStyle =
    language === 'english' ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'};
  const backgroundColor = theme === 'light' ? '#E5E5E5' : '#1c2125';
  const fontColor = theme === 'light' ? {color: '#1C2437'} : {color: '#F7F7F7'};
  const [fingerprintVisability, setFingerprintVisibilty] = useState(false);
  const [balanceText, setBalanceText] = useState(text['balance-hidden']);
  const [balanceFont, setBalanceFont] = useState(20);
  const [refreshing, setRefreshing] = useState(false);
  const onFingerprintApproval = () => {
    setBalanceText(balance);
    setBalanceFont(35);
    setFingerprintVisibilty(false);
  };
  const onRefreshing = async () => {
    setRefreshing(true);
    fetchBalance();
    setRefreshing(false);
  };
  const {data: balance, refetch: fetchBalance} = useQuery(
    ['cards', user.id],
    prop => getCards(prop.queryKey[1]),
    {
      select: data => {
        return `$${
          data?.reduce((accumulator, value) => value.balance + accumulator, 0) || 0
        }`;
      },
    },
  );
  useEffect(() => {
    navigation.setOptions({headerShown: false});
    const unsubscribe = navigation.addListener('focus', e => {
      fetchBalance();
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    if (balanceText[0] !== '$') setBalanceText(text['balance-hidden']);
    else if (balanceText !== text['balance-hidden']) setBalanceText(balance);
  }, [language, balance]);
  return (
    <View style={{flex: 1, backgroundColor: backgroundColor}}>
      <Header type={2} pageTitle={text['account-summary']} />
      <ScrollView
        style={{paddingHorizontal: 10, flex: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefreshing} />
        }>
        <Card>
          <View
            style={[
              rowStyle,
              {
                justifyContent: 'space-between',
                marginHorizontal: 20,
                marginVertical: 5,
              },
            ]}>
            <Text style={{color: '#F7F7F7', alignSelf: 'center'}}>{text['balance']}</Text>
            <CustomButton
              onPress={setFingerprintVisibilty.bind(this, balanceFont === 20)}
              icon={fingerprintLogo}
              style={styles.fingerprintButton}
            />
          </View>
          <Text style={[styles.balance, {fontSize: balanceFont}]}>{balanceText}</Text>
        </Card>
        <View style={[rowStyle, {marginTop: 30, justifyContent: 'space-between'}]}>
          <CustomButton
            icon={cash}
            title={text['accounts']}
            iconStyle={[
              styles.midButton,
              {
                backgroundColor: 'rgba(0, 201, 116, 0.15)',
              },
            ]}
            style={{flexDirection: 'column-reverse'}}
            titleStyle={[fontColor, {alignSelf: 'center'}]}
          />
          <CustomButton
            icon={cards}
            title={text['cards']}
            onPress={() => navigation.navigate('Cards')}
            iconStyle={[
              styles.midButton,
              {
                backgroundColor: 'rgba(0, 173, 248, 0.15)',
              },
            ]}
            style={{flexDirection: 'column-reverse'}}
            titleStyle={[fontColor, {alignSelf: 'center'}]}
          />
          <CustomButton
            icon={utilities}
            title={text['utilities']}
            iconStyle={[
              styles.midButton,
              {
                backgroundColor: 'rgba(246, 167, 33, 0.15)',
              },
            ]}
            style={{flexDirection: 'column-reverse'}}
            titleStyle={[fontColor, {alignSelf: 'center'}]}
          />
          <CustomButton
            icon={history}
            title={text['history']}
            onPress={() => navigation.navigate('History')}
            iconStyle={[
              styles.midButton,
              {
                backgroundColor: 'rgba(255, 0, 46, 0.15)',
              },
            ]}
            style={{flexDirection: 'column-reverse'}}
            titleStyle={[fontColor, {alignSelf: 'center'}]}
          />
        </View>
        <BeneficiariesMini />
        <History type={'mini'} />
        <FingerprintModal
          modalVisibility={fingerprintVisability}
          toggleModalVisible={setFingerprintVisibilty.bind(this, false)}
          onApproval={onFingerprintApproval}
          subtitle={text['show-balance-subtitle']}
        />
      </ScrollView>
      <Footer page={'home'} />
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
  midButton: {
    padding: 15,
    borderRadius: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
export default Home;

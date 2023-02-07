import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import texts from '../assets/language.json';
import {getCards} from '../axios/Cards';
import {addTransaction} from '../axios/History';
import CustomButton from '../components/CustomButton';
import Footer from '../components/Footer';
import Header from '../components/Header';
import InputField from '../components/InputField';
const Transfer = ({route}) => {
  const beneficiary = route.params;
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user);
  const language = useSelector(state => state.language.language);
  const theme = useSelector(state => state.theme.theme);
  const backgroundColor = theme === 'light' ? '#E5E5E5' : '#1c2125';
  const fontColor = theme === 'light' ? {color: '#1C2437'} : {color: '#F7F7F7'};
  const text = texts[language];
  const [cards, setCards] = useState([]);
  const [amount, setAmount] = useState(0);
  const [details, setDetails] = useState('');
  const getCardsData = async () => {
    setCards(await getCards(user.id));
  };
  const doTransaction = async () => {
    const date = new Date();
    await addTransaction(
      {
        amount: amount,
        beneficiaryID: beneficiary.id,
        date: `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`,
        details: details,
      },
      user.id,
    );
    navigation.navigate('Home');
  };
  useEffect(() => {
    navigation.setOptions({headerShown: false});
    getCardsData();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 50,
        backgroundColor: backgroundColor,
      }}>
      <Header type={1} pageTitle={'transfer'} />
      <ScrollView style={{flex: 1}}>
        <Text style={[fontColor, {fontSize: 30, marginTop: 20, marginHorizontal: 20}]}>
          {text['transfer']}
        </Text>
        <View style={styles.box}>
          <Text style={styles.title}>Type of Transfer</Text>
          <Text style={styles.subtitle}>Between accounts</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>Transfer from</Text>
          <Text style={styles.subtitle}>{cards[0]?.number}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>Transfer to</Text>
          <Text style={styles.subtitle}>{beneficiary.accountNumber}</Text>
        </View>
        <InputField
          value={amount}
          type={'numeric'}
          style={styles.box}
          titleStyle={[fontColor, styles.title]}
          title={'Amount to Transfer'}
          onValueChange={setAmount}
          language={language}
        />
        <InputField
          value={details}
          style={styles.box}
          titleStyle={[fontColor, styles.title]}
          title={'Reason to Transfer'}
          type={'text'}
          onValueChange={setDetails}
          language={language}
        />
        <CustomButton
          style={{
            backgroundColor: 'green',
            margin: 20,
            borderRadius: 20,
            height: 50,
            justifyContent: 'center',
          }}
          title={text['transfer']}
          titleStyle={{fontSize: 20, textAlign: 'center', color: '#FFF'}}
          onPress={doTransaction}
        />
      </ScrollView>

      <Footer page={'transfer'} />
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 30,
    marginVertical: 5,
    borderRadius: 10,
  },
  title: {fontSize: 15, color: '#1C2437'},
  subtitle: {fontSize: 10, color: '#1C2437', marginTop: 5},
});
export default Transfer;

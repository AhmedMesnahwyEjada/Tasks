import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {useSelector} from 'react-redux';
import texts from '../assets/language.json';
import {getBeneficiaries} from '../axios/Beneficiaries';
import {getCards, updateCard} from '../axios/Cards';
import {addTransaction} from '../axios/History';
import CustomButton from '../components/CustomButton';
import Footer from '../components/Footer';
import Header from '../components/Header';
import InputField from '../components/InputField';
const Transfer = ({route}) => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user);
  const language = useSelector(state => state.language.language);
  const theme = useSelector(state => state.theme.theme);
  const backgroundColor = theme === 'light' ? '#E5E5E5' : '#1c2125';
  const fontColor = theme === 'light' ? {color: '#1C2437'} : {color: '#F7F7F7'};
  const text = texts[language];
  const [cards, setCards] = useState([]);
  const [cardsFiltered, setCardsFiltered] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [amount, setAmount] = useState(0);
  const [details, setDetails] = useState('');
  const [cardSelected, setCardSelected] = useState(cards[0]);
  const [beneficiarySelected, setBeneficiarySelected] = useState(route.params);
  const typeData = [
    {key: 1, value: 'Between Accounts'},
    {key: 2, value: 'To beneficiary'},
  ];
  const [typeOfTransfer, setTypeOfTransfer] = useState(typeData[0]);
  const getCardsData = async () => {
    const cardsData = await getCards(user.id);
    setCards(
      cardsData.map(card => {
        return {key: card.number, value: `${card.number} - $${card.balance}`, ...card};
      }),
    );
  };
  const getBeneficiariesData = async () => {
    const beneficiariesData = await getBeneficiaries(user.id);
    setBeneficiaries(
      beneficiariesData.map(bene => {
        const id = Object.keys(bene)[0];
        return {key: id, value: bene[id].fName};
      }),
    );
  };
  const doTransaction = async (
    cards,
    id,
    amount,
    beneficiarySelected,
    details,
    typeOfTransfer,
  ) => {
    const date = new Date();
    const {key, value, ...cardValues} = cards.filter(
      card => card.number === cardSelected,
    )[0];
    await updateCard(key, id, {
      ...cardValues,
      balance: cardValues.balance - parseFloat(amount),
    });
    if (typeOfTransfer === 1) {
      const {key, value, ...newCardValues} = cards.filter(
        card => card.number === beneficiarySelected,
      )[0];
      await updateCard(key, id, {
        ...newCardValues,
        balance: newCardValues.balance + parseFloat(amount),
      });
      return;
    }

    await addTransaction(
      {
        amount: amount,
        beneficiaryID: beneficiarySelected,
        date: `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`,
        details: details,
      },
      id,
    );
  };
  const onClickSubmit = () => {
    navigation.navigate('SignupVerification', {
      type: 2,
      transaction: doTransaction.bind(
        this,
        cards,
        user.id,
        amount,
        beneficiarySelected,
        details,
        typeOfTransfer,
      ),
    });
  };
  useEffect(() => {
    navigation.setOptions({headerShown: false});
    getCardsData();
    getBeneficiariesData();
  }, []);
  useEffect(() => {
    setCardsFiltered(
      cards.filter(card => {
        return card.number !== cardSelected;
      }),
    );
  }, [cardSelected]);
  useEffect(() => {
    setBeneficiarySelected(undefined);
  }, [typeOfTransfer]);
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
          <Text style={styles.title}>{text['type-of-transfer']}</Text>
          <SelectList
            setSelected={val => setTypeOfTransfer(val)}
            data={typeData}
            boxStyles={{borderWidth: 0, marginHorizontal: -10}}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>{text['transfer-from']}</Text>
          <SelectList
            setSelected={val => setCardSelected(val)}
            data={cards}
            boxStyles={{borderWidth: 0, marginHorizontal: -10}}
          />
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>{text['transfer-to']}</Text>
          {typeOfTransfer === typeData[0].key ? (
            <SelectList
              setSelected={val => setBeneficiarySelected(val)}
              data={cardsFiltered}
              boxStyles={{borderWidth: 0, marginHorizontal: -10}}
            />
          ) : (
            <SelectList
              setSelected={val => setBeneficiarySelected(val)}
              data={beneficiaries}
              boxStyles={{borderWidth: 0, marginHorizontal: -10}}
            />
          )}
        </View>
        <InputField
          value={amount}
          type={'numeric'}
          style={styles.box}
          titleStyle={[fontColor, styles.title]}
          title={text['amount-to-transfer']}
          onValueChange={setAmount}
          language={language}
        />
        <InputField
          value={details}
          style={styles.box}
          titleStyle={[fontColor, styles.title]}
          title={text['reason-to-transfer']}
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
          onPress={onClickSubmit}
          disabled={
            !beneficiarySelected ||
            !typeOfTransfer ||
            !cardSelected ||
            !parseFloat(amount)
          }
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
  title: {fontSize: 15, color: '#1C2437', marginHorizontal: 10},
  subtitle: {fontSize: 10, color: '#1C2437', marginTop: 5},
});
export default Transfer;

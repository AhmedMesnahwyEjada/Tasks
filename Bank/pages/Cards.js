import {useNavigation} from '@react-navigation/native';
import {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  StyleSheet,
  Animated,
  PanResponder,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getCards, updateCard} from '../axios/Cards';
import {addTransaction} from '../axios/History';
import texts from '../assets/language.json';
import Header from '../components/Header';
import Footer from '../components/Footer';
import History from './History';
import Card from '../components/Card';
import visa from '../assets/visa.png';
import simCard from '../assets/simCard.png';
import transmitIcon from '../assets/transmitIcon.png';
import CustomButton from '../components/CustomButton';
import FingerprintModal from '../components/FingerprintModal';
const Cards = ({type}) => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user);
  const language = useSelector(state => state.language.language);
  const theme = useSelector(state => state.theme.theme);
  const text = texts[language];
  const backgroundColor = theme === 'light' ? '#E5E5E5' : '#1c2125';
  const fontColor = theme === 'light' ? {color: '#1C2437'} : {color: '#F7F7F7'};
  const WINDOW_WIDTH = Dimensions.get('screen').width;
  const WINDOW_HEIGHT = Dimensions.get('screen').height;
  const [cards, setCards] = useState([]);
  const pans = useRef([]).current;
  const panResponders = useRef([]).current;
  const [selected, setSelected] = useState(-1);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const createResponder = index => {
    const pan = new Animated.ValueXY({x: 0, y: 0});
    return [
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          pan.setOffset({x: pan.x._value, y: pan.y._value});
        },
        onPanResponderMove: (_, gesture) => {
          pan.setValue({x: gesture.dx, y: gesture.dy});
        },
        onPanResponderRelease: () => {
          pan.flattenOffset();
          if (pan.y._value >= WINDOW_HEIGHT * 0.2) {
            Animated.spring(pan, {
              toValue: {x: WINDOW_WIDTH * 0.1 * !index, y: WINDOW_HEIGHT * 0.3},
              duration: 100,
              useNativeDriver: true,
            }).start();
            setSelected(index);
          } else {
            Animated.spring(pan, {
              toValue: {x: 0, y: 0},
              duration: 100,
              useNativeDriver: true,
            }).start();
            setSelected(-1);
          }
        },
      }),
      pan,
    ];
  };
  const getData = async () => {
    const cardData = await getCards(user.id);
    setCards(
      cardData.map(card => {
        return {key: card.number, value: `${card.number} - $${card.balance}`, ...card};
      }),
    );
    for ([index, _] of cardData.entries()) {
      const [responder, pan] = createResponder(index);
      pans.push(pan);
      panResponders.push(responder);
    }
  };
  useEffect(() => {
    setButtonEnabled(selected === -1 ? false : true);
  }, [selected]);
  useEffect(() => {
    navigation.setOptions({headerShown: false});
    getData();
  }, []);
  const AirPay = () => {
    const [modalVisibility, setModalVisibility] = useState(false);
    const toggleModalVisible = () => {
      setModalVisibility(modalVisibility => {
        return !modalVisibility;
      });
    };
    const doTransaction = async (cards, id, amount, beneficiarySelected, details) => {
      const date = new Date();
      const {key, value, ...cardValues} = cards.filter(
        card => card.number === cards[selected].number,
      )[0];
      await updateCard(key, id, {
        ...cardValues,
        balance: cardValues.balance - parseFloat(amount),
      });
      await addTransaction(
        {
          amount: amount,
          beneficiaryID: beneficiarySelected,
          date: `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`,
          details: details,
        },
        id,
      );
      navigation.navigate('Home');
    };
    return (
      <View
        style={{
          marginTop: 10,
          position: 'absolute',
          width: WINDOW_WIDTH * 0.9,
          top: WINDOW_HEIGHT * 0.35,
          left: WINDOW_WIDTH * 0.05,
        }}>
        <View
          style={{
            elevation: -1,
            zIndex: -1,
            borderRadius: 20,
            borderWidth: 2,
            borderStyle: 'dashed',
            height: 200,
            borderColor: 'green',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[fontColor, {fontSize: 15}]}>{text['pick-card']}</Text>
        </View>
        <CustomButton
          title={text['pay-now']}
          style={{
            backgroundColor: '#007236',
            height: 40,
            borderRadius: 20,
            margin: 15,
            justifyContent: 'center',
          }}
          disabled={!buttonEnabled}
          titleStyle={{color: 'white', alignSelf: 'center'}}
          onPress={toggleModalVisible}
        />
        <FingerprintModal
          modalVisibility={modalVisibility}
          toggleModalVisible={toggleModalVisible}
          subtitle={text['air-payment']}
          onApproval={doTransaction.bind(
            this,
            cards,
            user.id,
            1000,
            '-NNH3M1s2n2hXFIUVBI1',
            'Air Pay',
          )}
        />
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: backgroundColor}}>
      <Header type={2} pageTitle={text['cards-services']} />
      <View style={{flex: 1, paddingHorizontal: 10}}>
        <Text style={[{fontSize: 25}, fontColor]}>{text['cards']}</Text>
        <FlatList
          horizontal={true}
          data={cards}
          onScroll={() => {
            pans.forEach(pan => {
              pan.setValue({x: 0, y: 0});
            });
            setSelected(-1);
          }}
          ItemSeparatorComponent={() => <View style={{width: 5}}></View>}
          renderItem={({item, index}) => {
            return (
              <View
                key={index}
                style={{
                  width: WINDOW_WIDTH * 0.85,
                  height: WINDOW_HEIGHT * 0.27,
                }}>
                <Card
                  height={180}
                  pan={type ? pans[index] : null}
                  panResponder={type ? panResponders[index] : null}>
                  <View
                    style={[
                      {
                        justifyContent: 'space-between',
                        padding: 20,
                        flex: 1,
                      },
                    ]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.text}>${item.balance}</Text>
                      <Image source={visa} />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text style={styles.text}>
                        {'****  ****  ****  '}
                        {item.number.toString().slice(-4)}
                      </Text>
                      <Image source={simCard} />
                      <Image source={transmitIcon} />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text style={{color: '#848484'}}>CARD HOLDER</Text>
                        <Text style={{color: '#FFF'}}>{user.Name}</Text>
                      </View>
                      <View>
                        <Text style={{color: '#848484'}}>EXPIRES</Text>
                        <Text style={{color: '#FFF'}}>
                          {item.expiryMonth}/{item.expiryYear}
                        </Text>
                      </View>
                      <View>
                        <Text style={{color: '#848484'}}>CVV</Text>
                        <Text style={{color: '#FFF'}}>{item.secretCode}</Text>
                      </View>
                    </View>
                  </View>
                </Card>
              </View>
            );
          }}
        />
        {!type && <History type={'mini'} />}
        {type && <AirPay />}
      </View>
      <Footer page={!type ? 'home' : 'air'} />
    </View>
  );
};
styles = StyleSheet.create({
  text: {
    color: '#F7F7F7',
    fontSize: 25,
  },
});
export default Cards;

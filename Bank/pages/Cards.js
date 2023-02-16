import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {View, Text, FlatList, Dimensions, Image, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {getCards} from '../axios/Cards';
import texts from '../assets/language.json';
import Header from '../components/Header';
import Footer from '../components/Footer';
import History from './History';
import Card from '../components/Card';
import visa from '../assets/visa.png';
import simCard from '../assets/simCard.png';
import transmitIcon from '../assets/transmitIcon.png';
import CustomButton from '../components/CustomButton';
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
  const getData = async () => {
    setCards(await getCards(user.id));
  };
  useEffect(() => {
    navigation.setOptions({headerShown: false});
    getData();
  });
  const AirPay = () => {
    return (
      <View style={{marginTop: 10}}>
        <View
          style={{
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
          disabled={true}
          titleStyle={{color: 'white', alignSelf: 'center'}}
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
          renderItem={({item, index}) => {
            return (
              <View
                key={index}
                style={{
                  width: WINDOW_WIDTH * 0.85,
                  height: WINDOW_HEIGHT * 0.27,
                  marginRight: 10,
                }}>
                <Card height={180}>
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

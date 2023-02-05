import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {BackHandler, View} from 'react-native';
import {useSelector} from 'react-redux';
import {addCard, getCards} from '../axios/Cards';

const Cards = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user);
  const [cards, setCards] = useState([]);
  const getData = async () => {
    setCards(await getCards(user.id));
  };
  useEffect(() => {
    navigation.setOptions({headerShown: false});
    getData();
  });
  return (
    <View style={{flex: 1}}>
      <View></View>
    </View>
  );
};
export default Cards;

import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {getBeneficiary} from '../axios/Beneficiaries';

const HistoryItem = ({beneficiaryID, date, amount}) => {
  const navigation = useNavigation();
  const language = useSelector(state => state.language.language);
  const theme = useSelector(state => state.theme.theme);
  const user = useSelector(state => state.user.user);
  const fontColor = theme === 'light' ? {color: '#000'} : {color: '#F7F7F7'};
  const horizontalMargin = language === 'english' ? {marginLeft: 10} : {marginRight: 10};
  const rowStyle =
    language === 'english' ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'};
  const [beneficiary, setBeneficiary] = useState({fName: null, imageUrl: null});
  const getData = async () => {
    const data = await getBeneficiary(beneficiaryID, user.id);
    setBeneficiary(data);
  };
  const onPress = () => {
    navigation.navigate('TransactionHistory', beneficiaryID);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Pressable
      onPress={onPress}
      style={[rowStyle, {justifyContent: 'space-between', marginTop: 10, flex: 1}]}>
      <View style={rowStyle}>
        <View
          style={{
            width: 50,
            height: 50,
            padding: 10,
            backgroundColor: '#FFF',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: beneficiary.imageUrl}}
            style={{
              resizeMode: 'contain',
              width: 40,
              height: 40,
            }}
          />
        </View>
        <View style={horizontalMargin}>
          <Text style={[fontColor, {fontWeight: 'bold', fontSize: 20}]}>
            {beneficiary.fName}
          </Text>
          <Text style={fontColor}>{date}</Text>
        </View>
      </View>
      <Text style={[fontColor, {alignSelf: 'center', fontSize: 25, fontWeight: '500'}]}>
        ${amount}
      </Text>
    </Pressable>
  );
};
export default HistoryItem;

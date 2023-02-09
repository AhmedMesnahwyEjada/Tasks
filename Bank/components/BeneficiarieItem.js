import {useEffect, useState} from 'react';
import {View, Image, Text, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {getTransactionHistory} from '../axios/History';
import CustomButton from './CustomButton';
import dollarSign from '../assets/dollarSign.png';
import phoneIcon from '../assets/phoneIcon.png';
const BeneficiariesItem = ({type, item, id, onPress}) => {
  const language = useSelector(state => state.language.language);
  const user = useSelector(state => state.user.user);
  const rowStyle =
    language === 'english' ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'};
  const rowStyleReversed =
    language === 'arabic' ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'};
  const justifyContent =
    language === 'english'
      ? {justifyContent: 'flex-end'}
      : {justifyContent: 'flex-start'};
  const RowType = () => {
    const [totalSent, setTotalSent] = useState(0);
    const getTotalSent = async () => {
      const history = await getTransactionHistory(user.id, id);
      let sum = 0;
      for (historyItem of history) sum += parseFloat(historyItem['amount']);
      setTotalSent(sum);
    };
    useEffect(() => {
      getTotalSent();
    }, []);
    return (
      <Pressable
        onPress={onPress}
        style={[
          {flex: 1, backgroundColor: '#FFF', padding: 10, margin: 10, borderRadius: 15},
          rowStyle,
        ]}>
        <Image
          source={{uri: item.imageUrl}}
          style={{resizeMode: 'contain', width: 50, height: 50, marginHorizontal: 10}}
        />
        <View style={{justifyContent: 'center'}}>
          <Text style={{color: '#1C2437', marginBottom: 5}}>{item.fName}</Text>
          <CustomButton
            icon={phoneIcon}
            iconStyle={{alignSelf: 'center'}}
            title={item.mobileNumber}
            titleStyle={{marginHorizontal: 5, color: '#B7B7B7'}}
            style={[rowStyleReversed, justifyContent]}
          />
          <CustomButton
            icon={dollarSign}
            iconStyle={{alignSelf: 'center'}}
            title={`$${totalSent}`}
            titleStyle={{marginHorizontal: 5, color: '#B7B7B7'}}
            style={[rowStyleReversed, justifyContent]}
          />
        </View>
      </Pressable>
    );
  };
  const SquareType = () => {
    return (
      <Pressable
        onPress={onPress}
        style={{
          backgroundColor: '#FFF',
          margin: 5,
          borderRadius: 15,
          width: 80,
          maxWidth: 80,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <View
          style={{
            padding: 10,
            backgroundColor: '#FFF',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: item.imageUrl}}
            style={{resizeMode: 'contain', width: 50, height: 50}}
          />
        </View>
        <Text style={{marginBottom: 10}}>{item.fName}</Text>
      </Pressable>
    );
  };
  return <>{type === 1 ? <SquareType /> : <RowType />}</>;
};
export default BeneficiariesItem;

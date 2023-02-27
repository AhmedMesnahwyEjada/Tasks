import {useEffect, useState} from 'react';
import {FlatList, View, Image, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {getBeneficiaries} from '../axios/Beneficiaries';
import texts from '../assets/language.json';
import CustomButton from './CustomButton';
import BeneficiariesItem from './BeneficiarieItem';
import {useNavigation} from '@react-navigation/native';

const BeneficiariesMini = () => {
  const navigation = useNavigation();
  const language = useSelector(state => state.language.language);
  const theme = useSelector(state => state.theme.theme);
  const user = useSelector(state => state.user.user);
  const text = texts[language];
  const fontColor = theme === 'light' ? {color: '#000'} : {color: '#F7F7F7'};
  const rowStyle =
    language === 'english' ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'};
  const [beneficiaries, setBeneficiaries] = useState([
    {key: {imageUrl: undefined, fName: undefined}},
  ]);
  const getData = async () => {
    setBeneficiaries(await getBeneficiaries(user.id));
  };
  const navigateToTransaction = id => {
    navigation.navigate(`TransactionHistory`, id);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={{width: '100%', marginTop: 15}}>
      <View style={[rowStyle, {justifyContent: 'space-between'}]}>
        <Text style={[fontColor, {fontSize: 25, fontWeight: 'bold'}]}>
          {text['send-money']}
        </Text>
        <CustomButton title={text['view-all']} titleStyle={fontColor} />
      </View>
      <FlatList
        horizontal={true}
        data={beneficiaries.slice(0, 5)}
        renderItem={({item, index}) => {
          const id = Object.keys(item)[0];
          return (
            <BeneficiariesItem
              item={item[id]}
              id={id}
              index={index}
              type={1}
              onPress={navigateToTransaction.bind(this, id)}
            />
          );
        }}
      />
    </View>
  );
};
export default BeneficiariesMini;

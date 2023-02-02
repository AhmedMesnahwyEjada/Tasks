import {useEffect, useState} from 'react';
import {FlatList, View, Image, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {getBeneficiaries} from '../axios/Beneficiaries';
import texts from '../assets/language.json';
import CustomButton from './CustomButton';

const BeneficiariesMini = () => {
  const language = useSelector(state => state.language.language);
  const theme = useSelector(state => state.theme.theme);
  const user = useSelector(state => state.user.user);
  const text = texts[language];
  const fontColor = theme === 'light' ? {color: '#000'} : {color: '#F7F7F7'};
  const rowStyle =
    language === 'english'
      ? {flexDirection: 'row'}
      : {flexDirection: 'row-reverse'};
  const [beneficiaries, setBeneficiaries] = useState([
    {imageUrl: undefined, fName: undefined},
  ]);
  const getData = async () => {
    const data = await getBeneficiaries(user.id);
    setBeneficiaries(data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={{width: '100%', marginTop: 20}}>
      <View style={[rowStyle, {justifyContent: 'space-between'}]}>
        <Text style={[fontColor, {fontSize: 25, fontWeight: 'bold'}]}>
          {text['send-money']}
        </Text>
        <CustomButton title={text['view-all']} titleStyle={fontColor} />
      </View>
      <FlatList
        horizontal={true}
        data={beneficiaries}
        renderItem={({item, index}) => {
          return (
            <View
              key={index}
              style={{
                backgroundColor: '#FFF',
                margin: 5,
                borderRadius: 15,
                width: 90,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  padding: 10,
                  backgroundColor: '#FFF',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: item.imageUrl}}
                  style={{
                    resizeMode: 'contain',
                    width: 40,
                    height: 40,
                  }}
                />
              </View>
              <Text style={{marginBottom: 10}}>{item.fName}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};
export default BeneficiariesMini;

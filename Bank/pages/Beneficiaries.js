import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {View, Text, Image, FlatList, Pressable, RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';
import {getBeneficiaries} from '../axios/Beneficiaries';
import texts from '../assets/language.json';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CustomButton from '../components/CustomButton';
import windowIcon from '../assets/window.png';
import menuDotted from '../assets/menuDotted.png';
import addIcon from '../assets/addIcon.png';
import emptyBeneficiaries from '../assets/emptyBeneficiaries.png';
import BeneficiariesItem from '../components/BeneficiarieItem';
const Beneficiaries = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user);
  const language = useSelector(state => state.language.language);
  const theme = useSelector(state => state.theme.theme);
  const text = texts[language];
  const backgroundColor = theme === 'light' ? '#E5E5E5' : '#1c2125';
  const buttonsbackgroundColor = theme === 'light' ? '#FFFFFF' : '#000';
  const backgroundColorHovered = '#007236';
  const rowStyle =
    language === 'english' ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'};
  const fontColor = theme === 'light' ? {color: '#1C2437'} : {color: '#F7F7F7'};
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [showType, setShowType] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const getData = async () => {
    setRefreshing(true);
    setBeneficiaries(await getBeneficiaries(user.id));
    setRefreshing(false);
  };
  const navigateToTransaction = id => {
    navigation.navigate(`TransactionHistory`, id);
  };
  useEffect(() => {
    navigation.setOptions({headerShown: false});
    getData();
  }, []);
  const EmptyBeneficiaries = () => {
    return (
      <Pressable
        onPress={() => navigation.navigate('AddBeneficiar')}
        style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100}}>
        <Image source={emptyBeneficiaries} />
        <Text style={[fontColor, {fontSize: 25, marginVertical: 10}]}>
          {text['no-beneficiaries']}
        </Text>
        <Text style={[fontColor, {fontSize: 15, width: 250, textAlign: 'center'}]}>
          {text['no-beneficiaries-subtitle']}
        </Text>
      </Pressable>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: backgroundColor}}>
      <Header type={2} />
      <View style={{flex: 1, padding: 15}}>
        <View style={[rowStyle, {justifyContent: 'space-between', alignItems: 'center'}]}>
          <Text style={[fontColor, {fontSize: 25}]}>{text['beneficiaries']}</Text>
          <View style={[rowStyle, {alignItems: 'center'}]}>
            <View
              style={{
                flexDirection: 'row',
                borderRadius: 30,
                backgroundColor: buttonsbackgroundColor,
                marginRight: language === 'english' ? 5 : 0,
                padding: 5,
              }}>
              <CustomButton
                style={{
                  padding: 5,
                  borderRadius: 15,
                  marginHorizontal: 5,
                  backgroundColor: showType ? backgroundColorHovered : backgroundColor,
                }}
                icon={windowIcon}
                onPress={setShowType.bind(this, 1)}
              />
              <CustomButton
                style={{
                  padding: 5,
                  borderRadius: 15,
                  marginHorizontal: 5,
                  backgroundColor: !showType
                    ? backgroundColorHovered
                    : buttonsbackgroundColor,
                }}
                icon={menuDotted}
                onPress={setShowType.bind(this, 0)}
              />
            </View>
            <CustomButton
              title={text['add']}
              icon={addIcon}
              titleStyle={[{marginLeft: 10}, fontColor]}
              onPress={() => navigation.navigate('AddBeneficiar')}
              style={{
                marginRight: language === 'arabic' ? 5 : 0,
                flexDirection: 'row-reverse',
                borderRadius: 30,
                backgroundColor: buttonsbackgroundColor,
                padding: 7,
                alignItems: 'center',
              }}
            />
          </View>
        </View>
        <FlatList
          key={showType ? 4 : 1}
          data={beneficiaries}
          numColumns={showType ? 4 : 1}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getData} />}
          ListEmptyComponent={<EmptyBeneficiaries />}
          renderItem={({item, index}) => {
            const id = Object.keys(item)[0];
            return (
              <BeneficiariesItem
                item={item[id]}
                id={id}
                key={index}
                type={showType}
                onPress={navigateToTransaction.bind(this, id)}
              />
            );
          }}
        />
      </View>
      <Footer page={'beneficiaries'} />
    </View>
  );
};
export default Beneficiaries;

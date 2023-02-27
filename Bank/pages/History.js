import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import texts from '../assets/language.json';
import {getHistory} from '../axios/History';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import HistoryItem from '../components/HistoryItem';
import Footer from '../components/Footer';
const History = ({type}) => {
  const navigation = useNavigation();
  const language = useSelector(state => state.language.language);
  const theme = useSelector(state => state.theme.theme);
  const user = useSelector(state => state.user.user);
  const text = texts[language];
  const fontColor = theme === 'light' ? {color: '#000'} : {color: '#F7F7F7'};
  const rowStyle =
    language === 'english' ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'};
  const backgroundColor = theme === 'light' ? '#E5E5E5' : '#1c2125';
  const [history, setHistory] = useState([]);
  const getHistoryData = async () => {
    const historyData = await getHistory(user.id);
    setHistory(historyData.reverse());
  };
  useEffect(() => {
    navigation.setOptions({headerShown: false});
    getHistoryData();
  }, []);
  return (
    <View style={{flex: 10}}>
      {type !== 'mini' && <Header type={2} />}
      <View
        style={
          type !== 'mini'
            ? {
                flex: 1,
                paddingHorizontal: 20,
                backgroundColor: backgroundColor,
              }
            : {flex: 1}
        }>
        <View
          style={[
            rowStyle,
            {
              marginTop: 20,
              paddingHorizontal: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}>
          <Text style={[fontColor, {fontSize: 25, fontWeight: 'bold'}]}>
            {text['history']}
          </Text>
          {type === 'mini' && (
            <CustomButton
              title={text['view-all']}
              titleStyle={fontColor}
              onPress={navigation.navigate.bind(navigation.navigate, 'History')}
            />
          )}
        </View>
        <FlatList
          data={type === 'mini' ? history.slice(0, 5) : history}
          renderItem={({item, index}) => {
            return (
              <>
                <HistoryItem
                  beneficiaryID={item.beneficiaryID}
                  amount={item.amount}
                  date={item.date}
                  key={index}
                />
                <View
                  style={{
                    marginTop: 10,
                    borderBottomColor: '#bec0c9',
                    borderBottomWidth: 2,
                  }}
                />
              </>
            );
          }}
        />
      </View>
      {type !== 'mini' && <Footer page={'home'} />}
    </View>
  );
};
6;
export default History;

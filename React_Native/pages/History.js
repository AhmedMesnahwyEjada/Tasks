import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import globalStyle from '../assets/styles';
import texts from '../assets/texts';
import Header from '../components/Header';

const backgroundColorMid = globalStyle.backgroundColorMid;
const backgroundColorLight = globalStyle.backgroundColorLight;
const History = ({route}) => {
  const language = useSelector(state => state.language.language);
  const text = texts[language];
  const history =
    useSelector(state => state.months.histories).filter(
      history => history.id === route.params.id,
    )[0] || [];
  return (
    <View style={{flex: 1, backgroundColor: backgroundColorMid}}>
      <Header title={text['history']} />
      <Text style={{fontSize: 30, color: '#FFF', alignSelf: 'center'}}>
        Expense : {route.params.title}
      </Text>
      <FlatList
        data={[...(history?.history || [])].reverse()}
        renderItem={({item}) => {
          return (
            <View
              style={{
                flex: 1,
                marginTop: 20,
                marginBottom: 10,
                padding: 10,
                marginHorizontal: 10,
                backgroundColor: backgroundColorLight,
                borderRadius: 10,
              }}>
              <Text style={{fontSize: 25, color: '#FFF', marginBottom: 10}}>
                {text['amount']} : {item.amount}
              </Text>
              <Text style={{fontSize: 15, color: '#FFF'}}>
                {text['date']} : {item.date}
              </Text>
              <Text style={{fontSize: 15, color: '#FFF'}}>
                {text['details']} : {item.details}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};
export default History;

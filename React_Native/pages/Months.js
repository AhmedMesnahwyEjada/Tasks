import {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addMonth, removeMonth} from '../redux/months';
import {useNavigation} from '@react-navigation/native';
import {toggleLanguage} from '../redux/language';
import CustomButton from '../components/CustomButton';
import textsFile from '../assets/texts.json';
import AddForm from '../components/AddForm';
import Header from '../components/Header';
import globalStyle from '../assets/styles';

const backgroundColorDark = globalStyle.backgroundColorDark;
const backgroundColorMid = globalStyle.backgroundColorMid;
const backgroundColorLight = globalStyle.backgroundColorLight;
const Months = () => {
  const [alertVisable, setAlertVisable] = useState(false);
  const [newMonth, setNewMonth] = useState(
    (parseInt(new Date().getMonth()) + 1).toString(),
  );
  const [newYear, setNewYear] = useState(new Date().getFullYear().toString());
  const months = useSelector(state => state.months.months);
  const dispatch = useDispatch();
  const language = useSelector(state => state.language.language);
  const rowStyle =
    language === 'english'
      ? {flexDirection: 'row'}
      : {flexDirection: 'row-reverse'};
  const texts = language === 'english' ? textsFile.english : textsFile.arabic;
  const navigation = useNavigation();
  const navigate = id => {
    navigation.navigate('monthDetails', {id});
  };
  const handleAddMonth = () => {
    if (newMonth < 1 || newMonth > 12 || newYear < 2000) {
      Alert.alert(texts['invalid-month'], '', [{text: texts['ok']}]);
    } else if (
      months.filter(month => {
        return month.month == newMonth && month.year == newYear;
      }).length !== 0
    ) {
      const monthID = months.filter(month => {
        return month.month == newMonth && month.year == newYear;
      })[0].id;
      navigate(monthID);
    } else dispatch(addMonth({month: newMonth, year: newYear}));
    handleCancle();
  };
  const handleCancle = () => {
    setNewMonth('1');
    setNewYear('2023');
    setAlertVisable(false);
  };
  const onRemovePress = id => {
    Alert.alert(texts['remove-month-alert'], '', [
      {text: texts['yes'], onPress: handleRemoveMonth.bind(this, id)},
      {text: texts['no']},
    ]);
  };
  const handleRemoveMonth = id => {
    dispatch(removeMonth({id}));
  };
  const changeLanguage = () => dispatch(toggleLanguage());

  const buttons = [
    {index: 1, text: texts['add'], handleOnPress: handleAddMonth},
    {index: 2, text: texts['cancel'], handleOnPress: handleCancle},
  ];
  const textInputs = [
    {
      index: 1,
      placeholder: texts['month-place-holder'],
      keyboardType: 'numeric',
      value: newMonth,
      onChangeText: setNewMonth,
      maxLength: 2,
    },
    {
      index: 2,
      placeholder: texts['year-place-holder'],
      keyboardType: 'numeric',
      value: newYear,
      onChangeText: setNewYear,
      maxLength: 4,
    },
  ];
  return (
    <View
      style={{backgroundColor: backgroundColorMid, flex: 1, paddingBottom: 10}}>
      <Header title={texts['months-title']} />
      <FlatList
        style={{marginBottom: 'auto', padding: 10}}
        data={months}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Pressable
            onPress={() => navigate(item.id)}
            style={[
              {
                alignItems: 'center',
                padding: 10,
                justifyContent: 'space-between',
                backgroundColor: backgroundColorLight,
                marginTop: 10,
                borderRadius: 10,
              },
              rowStyle,
            ]}>
            <Text
              style={{
                fontSize: 18,
                color: '#ffffff',
              }}>{`${texts['month-title']}: ${item.month}/${item.year}     ${texts['total-spent']}: ${item.totalSpent}`}</Text>
            <CustomButton
              buttonStyle={styles.deleteButton}
              textStyle={styles.deletButtonText}
              title={texts['remove-month']}
              onPress={onRemovePress.bind(this, item.id)}
            />
          </Pressable>
        )}></FlatList>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 15,
          padding: 20,
          backgroundColor: backgroundColorDark,
        }}>
        <CustomButton
          buttonStyle={styles.customButton}
          textStyle={styles.customButtonText}
          title={texts['add-month']}
          onPress={() => setAlertVisable(true)}
        />
        <CustomButton
          buttonStyle={styles.customButton}
          textStyle={styles.customButtonText}
          title={texts['change-language']}
          onPress={changeLanguage}
        />
      </View>
      <Modal
        transparent={true}
        visible={alertVisable}
        animationType="fade"
        onRequestClose={() => setAlertVisable(false)}>
        <Pressable
          style={{flex: 0.8, backgroundColor: '#000000c2'}}
          onPress={() => setAlertVisable(false)}></Pressable>
        <AddForm
          title={texts['add-month']}
          buttons={buttons}
          textInputs={textInputs}
        />
        <Pressable
          style={{flex: 0.8, backgroundColor: '#000000c2'}}
          onPress={() => setAlertVisable(false)}></Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  newExpenseInput: {
    borderWidth: 2,
    borderColor: 'gray',
    margin: 5,
    width: 200,
    textAlign: 'center',
  },
  customButton: {
    backgroundColor: backgroundColorLight,
    padding: 10,
    borderRadius: 7,
  },
  customButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: backgroundColorDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deletButtonText: {
    fontSize: 20,
    color: 'white',
  },
});

export default Months;

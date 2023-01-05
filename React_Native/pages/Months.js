import {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addMonth, removeMonth} from '../redux/months';
import {useNavigation} from '@react-navigation/native';
import {toggleLanguage} from '../redux/language';
import CustomButton from '../components/CustomButton';
import textsFile from '../assets/texts.json';
import AddForm from '../components/AddForm';
const Months = () => {
  const [alertVisable, setAlertVisable] = useState(false);
  const [newMonth, setNewMonth] = useState(
    (parseInt(new Date().getMonth()) + 1).toString(),
  );
  const [newYear, setNewYear] = useState(new Date().getFullYear().toString());
  const months = useSelector(state => state.months.months);
  const language = useSelector(state => state.language.language);
  const texts = language === 'english' ? textsFile.english : textsFile.arabic;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      title: `Months`,
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#045858',
        justifyContent: 'center',
        alignItems: 'center',
      },
    });
  }, []);
  const navigate = id => {
    navigation.navigate('monthDetails', {id});
  };
  const handleAddMonth = () => {
    if (newMonth < 1 || newMonth > 12 || newYear < 2023) {
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
    Alert.alert(texts['remove-month'], '', [
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
      placeholder: texts['value-place-holder'],
      keyboardType: 'numeric',
      value: newYear,
      onChangeText: setNewYear,
      maxLength: 4,
    },
  ];
  return (
    <View style={{backgroundColor: '#ecdca7ab', flex: 1, paddingBottom: 10}}>
      <FlatList
        style={{marginBottom: 'auto'}}
        data={months}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Pressable onPress={() => navigate(item.id)}>
            <View
              style={{
                alignItems: 'center',
                padding: 10,
                height: 100,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#3C2A21',
                }}>{`${texts['month-title']}: ${item.month}/${item.year}      ${texts['total-spent']}: ${item.totalSpent}`}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '80%',
                }}>
                <CustomButton
                  buttonStyle={styles.customButton}
                  textStyle={styles.customButtonText}
                  title={texts['navigate']}
                  onPress={navigate.bind(this, item.id)}
                />
                <CustomButton
                  buttonStyle={styles.customButton}
                  textStyle={styles.customButtonText}
                  title={texts['remove-month']}
                  onPress={onRemovePress.bind(this, item.id)}
                />
              </View>
              <View
                style={{
                  marginTop: 5,
                  borderBottomColor: 'black',
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  alignSelf: 'stretch',
                }}
              />
            </View>
          </Pressable>
        )}></FlatList>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 5,
          alignSelf: 'stretch',
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 15,
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
        visible={alertVisable}
        animationType="fade"
        onRequestClose={() => setAlertVisable(false)}>
        <AddForm
          title={texts['add-month']}
          buttons={buttons}
          textInputs={textInputs}
        />
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
    backgroundColor: '#43435f',
    padding: 10,
    borderRadius: 7,
  },
  customButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Months;

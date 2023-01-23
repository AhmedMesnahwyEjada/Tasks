import {useEffect, useState} from 'react';
import {
  TextInput,
  Text,
  View,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import CustomButton from './CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {updateExpenses, updateTotalSpent} from '../redux/months';
import textsFile from '../assets/texts.json';
import AddForm from './AddForm';
import ExpensesFooter from './ExpensesFooter';
import Header from './Header';

const backgroundColorDark = '#232F34';
const backgroundColorMid = '#344955';
const backgroundColorLight = '#4A6572';
const ExpensesList = ({route}) => {
  const dispatch = useDispatch();
  const monthID = route.params.id;
  const language = useSelector(state => state.language.language);
  const texts = language === 'english' ? textsFile.english : textsFile.arabic;
  const month = useSelector(state => state.months.months).filter(month => {
    return month.id === monthID;
  })[0];
  const expenses = month.expenses || [];
  const totalSpent = month.totalSpent || 0;
  const navigation = useNavigation();
  const [shownExpenses, setShownExpenses] = useState([]);
  useEffect(() => {
    const dummyValues = expenses.map(v => {
      return {id: v.id, value: 0};
    });
    setValues(dummyValues);
    setShownExpenses(expenses);
    calculateTotalSpent(expenses);
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const onExpensesChange = updatedExpenses => {
    dispatch(updateExpenses({id: monthID, expenses: updatedExpenses}));
    calculateTotalSpent(updatedExpenses);
    setShownExpenses(shownExpenses =>
      [...shownExpenses].map(expense => {
        for (const element of updatedExpenses)
          if (element.id === expense.id) return element;
        return expense;
      }),
    );
  };

  const [values, setValues] = useState([]);
  const handleValueChange = (newValue, id) => {
    const updatedValues = values.map(value => {
      if (value.id === id) {
        return {
          ...value,
          value: newValue,
        };
      }
      return value;
    });
    setValues(updatedValues);
  };

  const updateMoney = (id, type) => {
    let value = parseFloat(values.find(v => v.id === id).value) || 0;
    value = type === 'spend' ? value : -value;
    const updatedExpenses = expenses.map(e => {
      if (e.id === id) {
        return {
          ...e,
          totalPrice: Math.max(e.totalPrice + value, 0),
        };
      }
      return e;
    });
    onExpensesChange(updatedExpenses);
    handleValueChange(0, id);
  };
  const calculateTotalSpent = ex => {
    dispatch(
      updateTotalSpent({
        id: monthID,
        totalSpent: ex.reduce((accumulator, expense) => {
          return accumulator + parseFloat(expense.totalPrice);
        }, 0),
      }),
    );
  };

  const [alertVisable, setAlertVisable] = useState(false);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expensePrice, setExpensePrice] = useState(0);
  const handleCancle = () => {
    setExpenseTitle('');
    setExpensePrice(0);
    setAlertVisable(false);
  };
  const handleAdd = () => {
    if (expenseTitle === '') {
      handleCancle();
      return;
    } else if (
      expenses.filter(expense => {
        return expense.title === expenseTitle;
      })[0]
    ) {
      Alert.alert(texts['dublicate-item'], '', [
        {text: texts['ok'], onPress: handleCancle},
      ]);
      return;
    }
    const maxID = Math.max(
      ...expenses.map(expense => {
        return expense.id;
      }),
      0,
    );
    const defalutValue = expensePrice >= 0 ? expensePrice : 0;
    const newExpense = {
      id: maxID + 1,
      title: expenseTitle,
      totalPrice: parseFloat(defalutValue),
    };
    const updatedExpenses = [...expenses, newExpense];
    const updatedValues = [...values, {id: maxID + 1, value: 0}];
    setShownExpenses(shownExpenses => [...shownExpenses, newExpense]);
    onExpensesChange(updatedExpenses);
    setValues(updatedValues);
    handleCancle();
  };
  const onRemovePress = id => {
    Alert.alert(texts['remove-item-alert'], '', [
      {text: texts['yes'], onPress: handleRemove.bind(this, id)},
      {text: texts['no']},
    ]);
  };
  const handleRemove = id => {
    const updatedExpenses = [...expenses].filter(expense => {
      return expense.id !== id;
    });
    const updatedValues = values.filter(value => {
      return value.id !== id;
    });
    onExpensesChange(updatedExpenses);
    setValues(updatedValues);
  };

  const search = keyword => {
    setShownExpenses(() => {
      return [...expenses].filter(ex => {
        return ex.title.toLowerCase().includes(keyword.toLowerCase());
      });
    });
  };

  const buttons = [
    {index: 1, text: texts['add'], handleOnPress: handleAdd},
    {index: 2, text: texts['cancel'], handleOnPress: handleCancle},
  ];
  const textInputs = [
    {
      index: 1,
      placeholder: texts['expense-place-holder'],
      keyboardType: 'default',
      value: expenseTitle,
      onChangeText: setExpenseTitle,
      maxLength: 50,
    },
    {
      index: 2,
      placeholder: texts['value-place-holder'],
      keyboardType: 'numeric',
      value: expensePrice,
      onChangeText: setExpensePrice,
      maxLength: 6,
    },
  ];
  return (
    <View
      style={{backgroundColor: backgroundColorMid, flex: 1, paddingBottom: 10}}>
      <Header
        search={search}
        title={`${month.month}/${month.year}`}
        onBack={() => navigation.goBack()}
      />
      <Text style={styles.title}>{texts['list-of-expenses']}</Text>
      <FlatList
        keyboardShouldPersistTaps="always"
        style={{marginBottom: 'auto'}}
        data={shownExpenses}
        renderItem={({item}) => (
          <View
            style={{
              alignItems: 'flex-start',
              padding: 15,
              margin: 10,
              backgroundColor: backgroundColorLight,
              borderRadius: 20,
            }}>
            <Text style={{fontSize: 25, color: '#FFFFFF', fontWeight: 'bold'}}>
              {`${item.title}          ${item.totalPrice}`}
            </Text>
            <View
              style={{
                flex: 1,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TextInput
                value={values?.find(v => v.id === item.id)?.value || null}
                onChangeText={value => handleValueChange(value, item.id)}
                placeholder={texts['money-place-holder']}
                style={styles.newExpenseInput}
                placeholderTextColor={'#FFFFFF'}
                keyboardType="numeric"
                maxLength={5}
                cursorColor={backgroundColorDark}
                onSubmitEditing={updateMoney.bind(this, item.id, 'spend')}
              />
              <CustomButton
                buttonStyle={styles.customButton}
                textStyle={styles.customButtonText}
                title={texts['spend-money']}
                onPress={updateMoney.bind(this, item.id, 'spend')}
              />
              <CustomButton
                buttonStyle={styles.customButton}
                textStyle={styles.customButtonText}
                title={texts['save-money']}
                onPress={updateMoney.bind(this, item.id, 'save')}
              />
              <CustomButton
                buttonStyle={styles.customButton}
                textStyle={styles.customButtonText}
                title={texts['remove-item']}
                onPress={onRemovePress.bind(this, item.id)}
              />
            </View>
          </View>
        )}></FlatList>
      <ExpensesFooter
        totalSpentText={texts['total-spent']}
        totalSpent={totalSpent}
        addExpenseButtonText={texts['add-expense']}
        setAlertVisable={setAlertVisable}
      />
      <Modal
        visible={alertVisable}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setAlertVisable(false)}>
        <Pressable
          style={{flex: 0.8, backgroundColor: '#000000c2'}}
          onPress={() => setAlertVisable(false)}></Pressable>
        <AddForm
          title={texts['add-expense']}
          textInputs={textInputs}
          buttons={buttons}
        />
        <Pressable
          style={{flex: 0.8, backgroundColor: '#000000c2'}}
          onPress={() => setAlertVisable(false)}></Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    margin: 'auto',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  newExpenseInput: {
    borderWidth: 2,
    borderColor: backgroundColorDark,
    color: '#FFFFFF',
    margin: 5,
    width: 150,
    textAlign: 'center',
  },
  customButton: {
    backgroundColor: backgroundColorDark,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButtonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
});
export default ExpensesList;

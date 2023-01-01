import {useEffect, useState} from 'react';
import {
  TextInput,
  Text,
  View,
  FlatList,
  Button,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const App = () => {
  const storeExpeneses = async ex => {
    await AsyncStorage.setItem('expenses', JSON.stringify(ex));
  };
  const retrieveExpenses = async () => {
    const jsonValue = await AsyncStorage.getItem('expenses');
    if (jsonValue !== undefined) {
      const e = JSON.parse(jsonValue);
      const v = e.map(v => {
        return {id: v.id, value: 0};
      });
      setValues(v);
      setExpenses(e);
      calculateTotalSpent(e);
    }
  };
  useEffect(() => {
    retrieveExpenses();
  }, []);

  const [values, setValues] = useState([]);
  const handelValueChange = (newValue, id) => {
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

  const [expenses, setExpenses] = useState([]);
  const addMoney = id => {
    const value = parseFloat(values.find(v => v.id === id).value) || 0;
    console.log(value);
    const updatedExpenses = expenses.map(e => {
      if (e.id === id) {
        return {
          ...e,
          totalPrice: e.totalPrice + value,
        };
      }
      return e;
    });
    setExpenses(updatedExpenses);
    storeExpeneses(updatedExpenses);
    calculateTotalSpent(updatedExpenses);
    handelValueChange(0, id);
  };
  const [totalSpent, setTotalSpent] = useState(0);
  const calculateTotalSpent = ex => {
    setTotalSpent(
      ex.reduce((accumulator, expense) => {
        return accumulator + parseFloat(expense.totalPrice);
      }, 0),
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
  const handelAdd = () => {
    const maxID = Math.max(
      ...expenses.map(expense => {
        return expense.id;
      }),
    );
    if (expenseTitle === '') {
      handleCancle();
      return;
    }
    const defalutValue = expensePrice >= 0 ? expensePrice : 0;
    const updatedExpenses = [
      ...expenses,
      {
        id: maxID + 1,
        title: expenseTitle,
        totalPrice: parseFloat(defalutValue),
      },
    ];
    const updatedValues = [...values, {id: maxID + 1, value: 0}];
    setExpenses(updatedExpenses);
    storeExpeneses(updatedExpenses);
    setValues(updatedValues);
    calculateTotalSpent(updatedExpenses);
    handleCancle();
  };
  const handleRemove = id => {
    const updatedExpenses = expenses.filter(expense => {
      return expense.id !== id;
    });
    const updatedValues = values.filter(value => {
      return value.id !== id;
    });
    setExpenses(updatedExpenses);
    setValues(updatedValues);
    calculateTotalSpent(updatedExpenses);
    storeExpeneses(updatedExpenses);
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 30,
          margin: 'auto',
          textAlign: 'center',
          marginTop: 30,
          color: 'black',
          backgroundColor: '#fff',
        }}>
        List of Expenses
      </Text>
      <Modal visible={alertVisable} animationType="slide">
        <View
          style={{
            padding: 16,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            backgroundColor: '#eeeeee',
          }}>
          <Text style={{fontWeight: 'bold'}}>Add Expense</Text>
          <TextInput
            style={styles.newExpenseInput}
            placeholder="new Expense"
            value={expenseTitle}
            onChangeText={setExpenseTitle}
          />
          <TextInput
            style={styles.newExpenseInput}
            placeholder="value"
            keyboardType="numeric"
            maxLength={5}
            value={expensePrice}
            onChangeText={setExpensePrice}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 100,
              marginTop: 15,
            }}>
            <Pressable onPress={handelAdd} style={styles.customButton}>
              <Text style={styles.customButtonText}>Add</Text>
            </Pressable>
            <Pressable onPress={handleCancle} style={styles.customButton}>
              <Text style={styles.customButtonText}>Cancle</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <FlatList
        style={{marginBottom: 'auto'}}
        data={expenses}
        renderItem={({item}) => (
          <View
            style={{
              alignItems: 'center',
              padding: 10,
              backgroundColor: '#fAf8f1',
            }}>
            <Text style={{fontSize: 20, color: '#3C2A21'}}> {item.title} </Text>
            <Text style={{fontSize: 20, color: '#46C2CB'}}>
              {item.totalPrice}
            </Text>
            <TextInput
              value={values?.find(v => v.id === item.id)?.value || null}
              onChangeText={value => handelValueChange(value, item.id)}
              placeholder="add money"
              style={styles.newExpenseInput}
              keyboardType="numeric"
              maxLength={5}
              onSubmitEditing={addMoney.bind(this, item.id)}
            />
            <View
              style={{
                flex: 1,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Button
                title="Add Money"
                onPress={addMoney.bind(this, item.id)}
              />
              <Button
                title="Remove item"
                onPress={handleRemove.bind(this, item.id)}
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
        )}></FlatList>
      <Text
        style={{
          alignSelf: 'center',
          padding: 10,
          backgroundColor: '#fAf8f1',
        }}>
        {'Total Spent : ' + totalSpent}
      </Text>
      <Button title="Add expense" onPress={setAlertVisable.bind(this, true)} />
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
    backgroundColor: 'skyblue',
    padding: 10,
  },
  customButtonText: {
    color: 'white',
  },
});
export default App;

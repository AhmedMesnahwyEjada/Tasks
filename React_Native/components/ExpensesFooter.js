import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomButton from './CustomButton';
const ExpensesFooter = ({
  totalSpentText,
  totalSpent,
  setAlertVisable,
  addExpenseButtonText,
  monthPageButtonText,
}) => {
  const navigation = useNavigation();
  return (
    <>
      <Text style={styles.totalSpent}>
        {`${totalSpentText} : ${totalSpent}`}
      </Text>
      <View style={styles.buttonsView}>
        <CustomButton
          buttonStyle={styles.customButton}
          textStyle={styles.customButtonText}
          title={addExpenseButtonText}
          onPress={setAlertVisable.bind(this, true)}
        />
        <CustomButton
          buttonStyle={styles.customButton}
          textStyle={styles.customButtonText}
          title={monthPageButtonText}
          onPress={() => navigation.navigate('months')}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  totalSpent: {
    fontSize: 25,
    alignSelf: 'center',
    padding: 10,
    color: '#350c0c',
    fontWeight: 'bold',
  },
  buttonsView: {flexDirection: 'row', justifyContent: 'space-evenly'},
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
export default ExpensesFooter;

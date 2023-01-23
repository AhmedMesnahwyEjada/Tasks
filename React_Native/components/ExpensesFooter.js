import {View, Text, StyleSheet} from 'react-native';
import CustomButton from './CustomButton';
import globalStyle from '../assets/styles';
const backgroundColorDark = globalStyle.backgroundColorDark;
const backgroundColorLight = globalStyle.backgroundColorLight;
const ExpensesFooter = ({
  totalSpentText,
  totalSpent,
  setAlertVisable,
  addExpenseButtonText,
}) => {
  return (
    <View style={{marginVertical: 10}}>
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
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  totalSpent: {
    fontSize: 25,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: backgroundColorDark,
    width: '100%',
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsView: {
    backgroundColor: backgroundColorDark,
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  customButton: {
    backgroundColor: backgroundColorLight,
    padding: 10,
    borderRadius: 7,
  },
  customButtonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});
export default ExpensesFooter;

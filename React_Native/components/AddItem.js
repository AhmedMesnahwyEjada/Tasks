import {Modal, View, Text, TextInput, Pressable} from 'react-native';
const AddItem = ({
  alertVisable,
  expenseTitle,
  setExpenseTitle,
  expensePrice,
  setExpensePrice,
  handleAdd,
  handleCancle,
  newExpenseInputStyle,
  customButtonStyle,
  customButtonTextStyle,
  setAlertVisable,
  texts,
}) => {
  return (
    <Modal
      visible={alertVisable}
      animationType="slide"
      onRequestClose={() => setAlertVisable(false)}>
      <View
        style={{
          padding: 16,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: '#f4f7df',
        }}>
        <Text style={{fontWeight: 'bold'}}>{texts['add-expense']}</Text>
        <TextInput
          style={newExpenseInputStyle}
          placeholder={texts['expense-place-holder']}
          value={expenseTitle}
          onChangeText={setExpenseTitle}
        />
        <TextInput
          style={newExpenseInputStyle}
          placeholder={texts['value-place-holder']}
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
          <Pressable onPress={handleAdd} style={customButtonStyle}>
            <Text style={customButtonTextStyle}>{texts['add']}</Text>
          </Pressable>
          <Pressable onPress={handleCancle} style={customButtonStyle}>
            <Text style={customButtonTextStyle}>{texts['cancel']}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default AddItem;

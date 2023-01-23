import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
const AddForm = ({title, textInputs, buttons}) => {
  return (
    <View style={styles.textInputsView}>
      <Text style={styles.title}>{title}</Text>
      {textInputs.map(textInput => {
        return (
          <TextInput
            key={textInput.index}
            style={styles.customeInput}
            placeholder={textInput.placeholder}
            keyboardType={textInput.keyboardType}
            value={textInput.value}
            onChangeText={textInput.onChangeText}
            maxLength={textInput.maxLength}
          />
        );
      })}
      <View style={styles.buttonsView}>
        {buttons.map(button => {
          return (
            <Pressable
              key={button.index}
              onPress={button.handleOnPress}
              style={styles.customButton}>
              <Text style={styles.customButtonText}>{button.text}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {fontWeight: 'bold', color: '#442c2e'},
  textInputsView: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FEEAE6',
  },
  customeInput: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#442c2e',
    margin: 5,
    width: 200,
    textAlign: 'center',
    color: '#442c2e',
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 100,
    marginTop: 15,
  },
  customButton: {
    backgroundColor: '#FEDBD0',
    padding: 10,
    borderRadius: 7,
  },
  customButtonText: {
    fontWeight: 'bold',
    color: '#442c2e',
  },
});

export default AddForm;

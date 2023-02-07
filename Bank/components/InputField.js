import {TextInput, View, Text, Image} from 'react-native';
const InputField = ({
  style,
  titleStyle,
  inputStyle,
  title,
  icon,
  type,
  language,
  theme,
  value,
  onValueChange,
  maxLength,
  onSubmit,
}) => {
  return (
    <View style={style}>
      <View style={{flexDirection: language === 'english' ? 'row' : 'row-reverse'}}>
        {icon && (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={icon} />
          </View>
        )}
        <View style={{flex: 4}}>
          <Text style={titleStyle}>{title}</Text>
          <TextInput
            keyboardAppearance={theme}
            keyboardType={type}
            style={[
              inputStyle,
              language === 'english' ? {textAlign: 'left'} : {textAlign: 'right'},
            ]}
            secureTextEntry={type == 'password' ? true : false}
            value={value}
            onChangeText={onValueChange}
            onSubmitEditing={onSubmit}
            maxLength={maxLength}
          />
        </View>
      </View>
    </View>
  );
};

export default InputField;

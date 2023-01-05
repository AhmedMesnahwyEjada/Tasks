import {Pressable, Text} from 'react-native';

const CustomButton = ({buttonStyle, title, textStyle, onPress}) => {
  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
};
export default CustomButton;

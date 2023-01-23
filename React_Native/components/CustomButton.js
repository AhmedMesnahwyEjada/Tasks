import {Pressable, Text, Image} from 'react-native';

const CustomButton = ({
  buttonStyle,
  title,
  textStyle,
  onPress,
  icon,
  iconStyle,
}) => {
  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      {icon && <Image source={icon} style={iconStyle} />}
      {title && <Text style={textStyle}>{title}</Text>}
    </Pressable>
  );
};
export default CustomButton;

import {Pressable, Text, Image, View} from 'react-native';

const CustomButton = ({
  style,
  title,
  titleStyle,
  icon,
  onPress,
  disabled,
  iconStyle,
}) => {
  return (
    <Pressable
      style={[style, disabled ? {backgroundColor: 'gray'} : {}]}
      onPress={onPress}
      disabled={disabled}>
      {title !== undefined ? (
        <Text style={titleStyle}>{title}</Text>
      ) : undefined}
      {icon !== undefined ? (
        <View style={iconStyle}>
          <Image source={icon} />
        </View>
      ) : undefined}
    </Pressable>
  );
};

export default CustomButton;

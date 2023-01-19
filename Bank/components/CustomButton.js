import {Pressable, Text, Image} from 'react-native';

const CustomButton = ({style, title, titleStyle, icon, onPress, disabled}) => {
  return (
    <Pressable
      style={[style, disabled ? {backgroundColor: 'gray'} : {}]}
      onPress={onPress}
      disabled={disabled}>
      {title !== undefined ? (
        <Text style={titleStyle}>{title}</Text>
      ) : undefined}
      {icon !== undefined ? <Image source={icon} /> : undefined}
    </Pressable>
  );
};

export default CustomButton;

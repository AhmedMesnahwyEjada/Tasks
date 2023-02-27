import {Pressable, Text, Image, View} from 'react-native';
import {useSelector} from 'react-redux';

const MenuItem = ({children, icon, title, onPress, hovered}) => {
  const language = useSelector(state => state.language.language);
  const theme = useSelector(state => state.theme.theme);
  const textColor = theme === 'light' ? '#000' : '#FFF';
  const textColorHovered = theme === 'light' ? '#FFF' : '#000';
  const backgroundColorHover = theme === 'light' ? '#007236' : '#FFFFFF';
  const imageBackgroundColor = theme === 'light' ? '#c3c5cb' : '#1e4833';
  const rowStyle = language === 'english' ? 'row' : 'row-reverse';
  return (
    <Pressable
      style={{
        flexDirection: rowStyle,
        width: '100%',
        borderRadius: 20,
        marginVertical: 5,
        backgroundColor: hovered ? backgroundColorHover : '',
      }}
      onPress={onPress}>
      <View
        style={{
          backgroundColor: hovered ? '' : imageBackgroundColor,
          margin: 10,
          padding: 5,
          borderRadius: 5,
        }}>
        <Image source={icon} />
      </View>
      <Text
        style={{
          fontSize: 15,
          margin: 10,
          color: hovered ? textColorHovered : textColor,
        }}>
        {title}
      </Text>
      {children}
    </Pressable>
  );
};
export default MenuItem;

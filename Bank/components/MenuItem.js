import {Pressable, Text, Image, View} from 'react-native';
import {useSelector} from 'react-redux';

const MenuItem = ({icon, title, onPress}) => {
  const language = useSelector(state => state.language.language);
  const theme = useSelector(state => state.theme.theme);
  const textColor = theme === 'light' ? '#000' : '#FFF';
  const imageBackgroundColor = theme === 'light' ? '#c3c5cb' : '#1e4833';
  const rowStyle = language === 'english' ? 'row' : 'row-reverse';
  return (
    <Pressable
      style={{
        flexDirection: rowStyle,
        width: '100%',
        borderRadius: 20,
        borderWidth: 3,
        marginVertical: 10,
      }}
      onPress={onPress}>
      <View
        style={{
          backgroundColor: imageBackgroundColor,
          margin: 10,
          padding: 5,
          borderRadius: 5,
        }}>
        <Image source={icon} />
      </View>
      <Text style={{margin: 10, color: textColor}}>{title}</Text>
    </Pressable>
  );
};
export default MenuItem;

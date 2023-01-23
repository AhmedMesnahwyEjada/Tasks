import {View, Text} from 'react-native';
import SearchBar from './SearchBar';
import {useSelector} from 'react-redux';
import CustomButton from './CustomButton';
import globalStyle from '../assets/styles';

const backgroundColorDark = globalStyle.backgroundColorDark;
const Header = ({search, title, onBack}) => {
  const language = useSelector(state => state.language.language);
  return (
    <View
      style={[
        {
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          height: '8%',
          backgroundColor: backgroundColorDark,
        },
        {flexDirection: language === 'english' ? 'row' : 'row-reverse'},
      ]}>
      {onBack && (
        <CustomButton
          title={language === 'english' ? '<' : '>'}
          buttonStyle={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          textStyle={{
            color: '#FFFFFF',
            flex: 1,
            fontSize: 50,
            marginBottom: 10,
            textAlign: 'center',
          }}
          onPress={onBack}
        />
      )}
      <Text
        style={{
          fontSize: 30,
          color: '#FFFFFF',
          alignSelf: 'center',
          textAlign: 'center',
          flex: 2,
        }}>
        {title}
      </Text>
      {search && <SearchBar search={search} />}
    </View>
  );
};
export default Header;

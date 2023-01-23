import {TextInput, View} from 'react-native';
import CustomButton from './CustomButton';
import searchIcon from '../assets/search.png';
import {useSelector} from 'react-redux';
import {useState} from 'react';
const SearchBar = ({search}) => {
  const language = useSelector(state => state.language.language);
  const [value, setValue] = useState('');
  const onValueChange = value => {
    setValue(value);
    search(value);
  };
  const englishStyle = {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    textAlign: 'left',
    marginLeft: 10,
  };
  const arabicStyle = {
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    textAlign: 'right',
    marginRight: 10,
  };
  return (
    <View
      style={{
        flexDirection: language === 'english' ? 'row' : 'row-reverse',
        flex: 4,
        alignItems: 'stretch',
        paddingVertical: 10,
        paddingRight: '5%',
      }}>
      <TextInput
        value={value}
        onChangeText={onValueChange}
        style={[
          {
            flex: 7,
            color: '#ffffff',
            backgroundColor: '#4A6572',
            padding: 5,
            fontSize: 25,
          },
          language === 'english' ? englishStyle : arabicStyle,
        ]}
      />
      <CustomButton
        buttonStyle={{
          alignItems: 'stretch',
          justifyContent: 'center',
          padding: 5,
          flex: 1,
          backgroundColor: '#4A6572',
        }}
        icon={searchIcon}
        iconStyle={{height: 20, width: 20}}
      />
    </View>
  );
};
export default SearchBar;

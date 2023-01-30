import {Modal, View, Pressable} from 'react-native';
import texts from '../assets/language.json';
import {useNavigation} from '@react-navigation/native';
import {logout} from '../redux/user';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from './CustomButton';
import MenuItem from './MenuItem';
import darkMode from '../assets/darkMode.png';
import {toggleTheme} from '../redux/theme';
const MenuModal = ({toggleMenu, menuVisability, children}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const language = useSelector(state => state.language.language);
  const theme = useSelector(state => state.theme.theme);
  const backgroundColor =
    theme === 'light' ? '#F1F3FB' : 'rgba(0, 50, 24, 0.91)';
  const rowStyle = language === 'english' ? 'row' : 'row-reverse';
  const text = texts[language];
  const logOut = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };
  const changeTheme = () => {
    dispatch(toggleTheme());
  };
  return (
    <Modal
      visible={menuVisability}
      animationType={'fade'}
      onRequestClose={toggleMenu}
      transparent={true}>
      <View
        style={{
          flexDirection: rowStyle,
          flex: 1,
          backgroundColor: 'rgba(28, 36, 55, 0.77)',
        }}>
        <View
          style={[
            {
              flex: 5,
              backgroundColor: backgroundColor,
              padding: 30,
            },
            language === 'english'
              ? {borderTopEndRadius: 40}
              : {borderTopStartRadius: 40},
          ]}>
          {children}
          <MenuItem
            title={text['dark-mode']}
            icon={darkMode}
            onPress={changeTheme}
          />
          <CustomButton
            title={text['logout']}
            titleStyle={{color: 'red'}}
            onPress={logOut}
          />
        </View>
        <Pressable onPress={toggleMenu} style={{flex: 1}}></Pressable>
      </View>
    </Modal>
  );
};
export default MenuModal;

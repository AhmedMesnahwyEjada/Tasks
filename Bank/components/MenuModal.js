import {Modal, View, Pressable, Image, Text} from 'react-native';
import texts from '../assets/language.json';
import {useNavigation} from '@react-navigation/native';
import {logout} from '../redux/user';
import {useDispatch, useSelector} from 'react-redux';
import MenuItem from './MenuItem';
import menu1 from '../assets/menu1.png';
import menu2 from '../assets/menu2.png';
import menu3 from '../assets/menu3.png';
import menu4 from '../assets/menu4.png';
import menu5 from '../assets/menu5.png';
import menu6 from '../assets/menu6.png';
import menu7 from '../assets/menu7.png';
import menu8 from '../assets/menu8.png';
import menu9 from '../assets/menu9.png';
import darkMode from '../assets/darkMode.png';
import userImage from '../assets/userImage.png';

import {toggleTheme} from '../redux/theme';
const MenuModal = ({toggleMenu, menuVisability, children, pageTitle}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const language = useSelector(state => state.language.language);
  const theme = useSelector(state => state.theme.theme);
  const user = useSelector(state => state.user.user);
  const backgroundColor =
    theme === 'light' ? '#F1F3FB' : 'rgba(0, 50, 24, 0.91)';
  const fontColor = theme === 'light' ? '#000' : '#fff';
  const rowStyle = language === 'english' ? 'row' : 'row-reverse';
  const text = texts[language];
  const logOut = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };
  const changeTheme = () => {
    dispatch(toggleTheme());
  };
  const items = [
    {
      id: 1,
      title: text['account-summary'],
      icon: menu1,
      onPress: navigation.navigate.bind(navigation.navigate, 'Home'),
    },
    {id: 2, title: text['open-deposits'], icon: menu2, onPress: null},
    {
      id: 3,
      title: text['payment-services'],
      icon: menu3,
      onPress: changeTheme,
    },
    {
      id: 4,
      title: text['cards-services'],
      icon: menu4,
      onPress: navigation.navigate.bind(navigation.navigate, 'Cards'),
    },
    {id: 5, title: text['hard-token'], icon: menu5, onPress: changeTheme},
    {id: 6, title: text['offers'], icon: menu6, onPress: changeTheme},
    {
      id: 7,
      title: text['customer-service'],
      icon: menu7,
      onPress: changeTheme,
    },
    {id: 8, title: text['calculators'], icon: menu8, onPress: changeTheme},
    {id: 9, title: text['dark-mode'], icon: darkMode, onPress: changeTheme},
  ];

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
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View>
              {items.map(item => {
                return (
                  <MenuItem
                    key={item.id}
                    title={item.title}
                    icon={item.icon}
                    onPress={item.onPress}
                    hovered={item.title === pageTitle}
                  />
                );
              })}
            </View>
            <View>
              <MenuItem onPress={logOut} title={text['logout']} icon={menu9} />
              <View
                style={{
                  borderRadius: 20,
                  padding: 10,
                  backgroundColor:
                    theme === 'light' ? '#FFF' : 'rgba(0, 102, 49, 0.91)',
                  flexDirection: rowStyle,
                }}>
                <Image source={userImage} />
                <View style={{marginHorizontal: 10}}>
                  <Text style={{color: fontColor}}>{user.Name}</Text>
                  <Text style={{color: fontColor}}>{user.mobileNumber}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Pressable onPress={toggleMenu} style={{flex: 1}}></Pressable>
      </View>
    </Modal>
  );
};
export default MenuModal;

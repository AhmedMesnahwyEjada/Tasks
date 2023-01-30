import {View, StyleSheet, Image, Pressable, Modal, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from './CustomButton';
import logo from '../assets/logo.png';
import logoGreen from '../assets/logoGreen.png';
import userImage from '../assets/userImage.png';
import bell from '../assets/bell.png';
import menu from '../assets/menu.png';
import {useState} from 'react';
import texts from '../assets/language.json';
import {toggleLanguage} from '../redux/language';
import {useNavigation, useNavigationBuilder} from '@react-navigation/native';
import MenuModal from './MenuModal';

const Header = ({type}) => {
  const dispatch = useDispatch();
  const language = useSelector(state => state.language.language);
  const theme = useSelector(state => state.theme.theme);
  const rowStyle = language === 'english' ? 'row' : 'row-reverse';
  const text = texts[language];
  const BackHeader = () => {
    const navigation = useNavigation();
    const backButton = () => {
      navigation.goBack();
    };
    return (
      <>
        <CustomButton
          onPress={backButton}
          title={language === 'english' ? '<' : '>'}
          titleStyle={[
            styles.backButtonText,
            theme === 'light' ? {color: '#FFFFFF'} : {color: '#007236'},
          ]}
          style={[
            styles.backButton,
            theme === 'dark'
              ? {backgroundColor: '#FFFFFF'}
              : {backgroundColor: '#007236'},
          ]}
        />
        <Image source={theme === 'light' ? logoGreen : logo} />
      </>
    );
  };
  const Menu = () => {
    const [menuVisability, setModalVisability] = useState(false);
    const user = useSelector(state => state.user.user);
    const toggleMenu = () => {
      setModalVisability(modalVisability => {
        return !modalVisability;
      });
    };
    return (
      <>
        <View style={{flexDirection: rowStyle}}>
          <Pressable onPress={toggleMenu}>
            <Image source={menu} style={styles.backButton} />
          </Pressable>
          <Image
            source={userImage}
            style={[
              styles.backButton,
              language === 'english' ? {marginRight: 10} : {marginLeft: 10},
            ]}
          />
          <View style={{flexDirection: 'column'}}>
            <Text>{text['good-morning']}</Text>
            <Text>{user.Name}</Text>
          </View>
        </View>
        <Image
          source={bell}
          style={[styles.backButton, {backgroundColor: '#FFFFFF'}]}
        />
        <MenuModal toggleMenu={toggleMenu} menuVisability={menuVisability}>
          <BasicHeader />
        </MenuModal>
      </>
    );
  };
  const BasicHeader = () => {
    const changeLanguage = () => {
      dispatch(toggleLanguage());
    };
    return (
      <View
        style={{
          flexDirection: rowStyle,
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <CustomButton
          title={text['language']}
          style={styles.languageButton}
          titleStyle={styles.languageButtonTitle}
          onPress={changeLanguage}
        />
        <Image source={theme === 'light' ? logoGreen : logo} />
      </View>
    );
  };
  return (
    <View
      style={{
        flexDirection: rowStyle,
        justifyContent: 'space-between',
        alignItems: 'stretch',
      }}>
      {type === 1 ? <BackHeader /> : type === 2 ? <Menu /> : <BasicHeader />}
    </View>
  );
};
const styles = StyleSheet.create({
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  backButtonText: {
    fontSize: 20,
  },
  languageButton: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  languageButtonTitle: {
    color: 'green',
    fontWeight: 'bold',
  },
});
export default Header;

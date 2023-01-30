import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import background from '../assets/background.png';
import lockImage from '../assets/lock.png';
import atImage from '../assets/at.png';
import logo from '../assets/logo.png';
import fingerprintLogo from '../assets/fingerprint.png';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import CheckBox from '@react-native-community/checkbox';
import {useEffect, useState} from 'react';
import FingerprintModal from '../components/FingerprintModal';
import {useNavigation} from '@react-navigation/native';
import {getUser} from '../axios/Users';
const Login = ({language, setLanguage, theme, text}) => {
  const [rememberMe, setRememberMe] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const rowStyle = language === 'english' ? 'row' : 'row-reverse';
  const navigation = useNavigation();
  const toggleModalVisible = () => {
    setModalVisibility(modalVisibility => {
      return !modalVisibility;
    });
  };
  const toggleLanguage = () => {
    setLanguage(language => {
      return language === 'english' ? 'arabic' : 'english';
    });
  };
  const signupNavigation = () => {
    navigation.navigate('Signup');
  };
  const login = async () => {
    const userData = {mobileNumber: mobileNumber, password: password};
    const loggedIn = await getUser(userData);
    if (loggedIn) navigation.navigate('Home', userData);
    else Alert.alert('Invalid Mobile or Password');
  };
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <ImageBackground source={background} style={styles.image}>
        <View style={styles.mainView}>
          <View style={styles.header}>
            <CustomButton
              title={text['language']}
              style={styles.languageButton}
              titleStyle={styles.languageButtonTitle}
              onPress={toggleLanguage}
            />
            <Image source={logo} />
          </View>
          <Text style={styles.mainText}>{text['main-text']}</Text>
          <InputField
            value={mobileNumber}
            onValueChange={setMobileNumber}
            style={styles.usernameView}
            titleStyle={styles.usernameText}
            inputStyle={styles.usernameInput}
            title={text['username']}
            type="name"
            language={language}
            theme={theme}
            icon={atImage}
          />
          <InputField
            value={password}
            onValueChange={setPassword}
            style={styles.passwordView}
            titleStyle={styles.passwordText}
            inputStyle={styles.passwordInput}
            title={text['password']}
            type="password"
            language={language}
            theme={theme}
            icon={lockImage}
          />
          <View
            style={{flexDirection: rowStyle, justifyContent: 'space-between'}}>
            <View
              style={{
                flexDirection: rowStyle,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <CheckBox
                value={rememberMe}
                onValueChange={setRememberMe}
                tintColors={{true: 'gray', false: ''}}
              />
              <Text style={{color: 'white'}}>{text['remember-me']}</Text>
            </View>
            <CustomButton
              title={text['forgot-password']}
              titleStyle={{color: 'white'}}
              style={{justifyContent: 'center'}}
            />
          </View>
          <View
            style={{
              height: 50,
              flexDirection: rowStyle,
              alignItems: 'stretch',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <CustomButton
              title={text['login']}
              onPress={login}
              style={[
                styles.loginButton,
                language === 'english' ? {marginEnd: 30} : {marginStart: 30},
              ]}
              titleStyle={{color: 'white', fontWeight: 'bold'}}
            />
            <CustomButton
              onPress={toggleModalVisible}
              icon={fingerprintLogo}
              style={styles.fingerprintButton}
            />
          </View>
          <View
            style={{
              flexDirection: rowStyle,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              {text['dont-have-account']}
            </Text>
            <CustomButton
              title={text['signup']}
              onPress={signupNavigation}
              titleStyle={{
                color: '#F6A721',
                textDecorationLine: 'underline',
                fontWeight: 'bold',
              }}
              style={
                language === 'english' ? {marginLeft: 10} : {marginRight: 10}
              }
            />
          </View>
        </View>
        <View style={styles.footer}>
          <View style={{flexDirection: rowStyle, justifyContent: 'center'}}>
            <CustomButton
              title={text['contact-us']}
              titleStyle={{color: '#F6A721', fontWeight: 'bold'}}
            />
            <Text style={{color: 'white'}}> - </Text>
            <CustomButton
              title={text['FAQs']}
              titleStyle={{color: '#F6A721', fontWeight: 'bold'}}
            />
            <Text style={{color: 'white'}}> - </Text>
            <CustomButton
              title={text['help']}
              titleStyle={{color: '#F6A721', fontWeight: 'bold'}}
            />
          </View>
          <Text style={{color: 'white', alignSelf: 'center', fontSize: 10}}>
            {text['copyright']}
          </Text>
        </View>
      </ImageBackground>
      <FingerprintModal
        theme={theme}
        language={language}
        modalVisibility={modalVisibility}
        toggleModalVisible={toggleModalVisible}
        text={text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    padding: 20,
    paddingTop: 50,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  footer: {
    paddingVertical: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  usernameView: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255, 0.5)',
    marginVertical: 10,
    height: 65,
  },
  usernameText: {
    color: 'white',
    fontWeight: 'bold',
  },
  usernameInput: {
    color: 'white',
    fontWeight: 'bold',
  },
  passwordView: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 10,
    marginVertical: 10,
    height: 65,
  },
  passwordText: {
    color: 'rgba(0, 114, 54, 1)',
  },
  passwordInput: {
    color: 'black',
  },
  mainText: {
    marginTop: 100,
    color: 'white',
    fontSize: 40,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#007236',
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  fingerprintButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#F6A721',
    borderRadius: 10,
    paddingVer: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Login;

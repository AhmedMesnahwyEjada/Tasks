import {useEffect, useState} from 'react';
import InputField from '../components/InputField';
import PageWrapper from '../components/PageWrapper';
import lockIcon from '../assets/lock.png';
import showPasswordIcon from '../assets/showPassword.png';
import {View, StyleSheet, Text, Pressable, Image, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {createUser} from '../axios/Users';
import {login} from '../redux/user';
import texts from '../assets/language.json';
const SetPassword = ({route}) => {
  const navigation = useNavigation();
  const language = useSelector(state => state.language.language);
  const theme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();
  const text = texts[language];
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [circlesEnabled, setCirclesEnabled] = useState(Array(5).fill(false));
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const {mobileNumber} = route.params;
  const checks = [
    {text: text['lower-case'], index: 0, regex: /([a-z])/},
    {text: text['upper-case'], index: 1, regex: /([A-Z])/},
    {text: text['min-charchters'], index: 2, regex: /(?=.{8,})/},
    {text: text['number-charchter'], index: 3, regex: /([0-9])/},
    {
      text: text['special-charchter'],
      index: 4,
      regex: /([@#$%^&+!=])/,
    },
  ];
  useEffect(() => {
    setCirclesEnabled(circlesEnabled => {
      return circlesEnabled.map((circleEnabled, index) => {
        if (checks[index].regex.test(password)) return true;
        else return false;
      });
    });
  }, [password, confirmPassword]);
  useEffect(() => {
    if (
      circlesEnabled.every(circleEnabled => circleEnabled === true) &&
      confirmPassword === password
    )
      setSubmitButtonDisabled(false);
    else setSubmitButtonDisabled(true);
  }, [circlesEnabled]);
  const toggleShowPassword = () => {
    setPasswordType(passwordType =>
      passwordType === 'password' ? 'text' : 'password',
    );
  };
  const toggleShowConfirmPassword = () => {
    setConfirmPasswordType(confirmPasswordType =>
      confirmPasswordType === 'password' ? 'text' : 'password',
    );
  };
  const submit = async () => {
    try {
      const user = {
        mobileNumber: mobileNumber,
        password: password,
      };
      await createUser(user);
      dispatch(login(user));
      navigation.navigate('Congratulations');
    } catch (err) {
      Alert.alert('user not created please try again later');
    }
  };
  const rowStyle =
    language === 'english'
      ? {flexDirection: 'row'}
      : {flexDirection: 'row-reverse'};
  return (
    <PageWrapper
      theme={theme}
      language={language}
      title={text['set-password-title']}
      subtitle={text['set-password-subtitle']}
      buttonDisabled={submitButtonDisabled}
      buttonText={text['set-password-button']}
      onButtonClick={submit}>
      <View style={[styles.textInput, rowStyle]}>
        <InputField
          title={text['set-password-input']}
          inputStyle={[theme === 'light' ? {color: 'black'} : {color: 'white'}]}
          titleStyle={{color: '#007236', fontWeight: 'bold'}}
          icon={lockIcon}
          style={{
            flex: 10,
          }}
          type={passwordType}
          language={language}
          theme={theme}
          value={password}
          onValueChange={setPassword}
        />
        <Pressable
          style={[
            {flex: 1, marginTop: 30},
            language === 'english' ? {marginRight: 10} : {marginLeft: 10},
          ]}
          onPress={toggleShowPassword}>
          <Image source={showPasswordIcon} />
        </Pressable>
      </View>
      <View style={[styles.textInput, rowStyle]}>
        <InputField
          title={text['confirm-password-input']}
          inputStyle={theme === 'light' ? {color: 'black'} : {color: 'white'}}
          titleStyle={{color: '#007236', fontWeight: 'bold'}}
          icon={lockIcon}
          style={{flex: 10}}
          type={confirmPasswordType}
          language={language}
          theme={theme}
          value={confirmPassword}
          onValueChange={setConfirmPassword}
        />
        <Pressable
          style={[
            {flex: 1, marginTop: 30},
            language === 'english' ? {marginRight: 10} : {marginLeft: 10},
          ]}
          onPress={toggleShowConfirmPassword}>
          <Image source={showPasswordIcon} />
        </Pressable>
      </View>
      <View style={[rowStyle, {flexWrap: 'wrap'}]}>
        {checks.map(check => {
          return (
            <View
              key={check.index}
              style={[
                rowStyle,
                {marginTop: 30, width: '45%'},
                check.index % 2 === 0 &&
                  (language === 'english'
                    ? {marginRight: '10%'}
                    : {marginLeftL: '10%'}),
              ]}>
              <View
                style={[
                  styles.circle,
                  circlesEnabled[check.index]
                    ? styles.circleEnabled
                    : styles.circleDisabled,
                  language === 'english' ? {marginRight: 10} : {marginLeft: 10},
                ]}></View>
              <Text
                style={
                  theme === 'dark' ? {color: '#FFFFFF'} : {color: '#1C2437'}
                }>
                {check.text}
              </Text>
            </View>
          );
        })}
      </View>
    </PageWrapper>
  );
};
const styles = StyleSheet.create({
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  circleEnabled: {
    backgroundColor: '#007236',
  },
  circleDisabled: {
    backgroundColor: '#B7B7B7',
  },
  textInput: {
    borderRadius: 10,
    borderColor: '#007236',
    borderWidth: 2,
    marginTop: 30,
  },
});
export default SetPassword;

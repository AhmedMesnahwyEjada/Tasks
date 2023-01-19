import React from 'react';
import Login from './pages/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useState} from 'react';
import MobileNumber from './pages/MobileNumber';
import MobileVerification from './pages/MobileVerification';
import texts from './assets/language.json';
import SetPassword from './pages/SetPassword';
import Congratulations from './pages/Congratulations';

const App = () => {
  const Stack = createNativeStackNavigator();
  const [language, setLanguage] = useState('english');
  const [theme, setTheme] = useState('dark');
  const text = texts[language];
  const LoginWrapper = () => (
    <Login
      text={text}
      language={language}
      theme={theme}
      setLanguage={setLanguage}
    />
  );
  const MobileNumberWrapper = () => (
    <MobileNumber text={text} language={language} theme={theme} />
  );
  const MobileVerificationWrapper = ({route}) => (
    <MobileVerification
      text={text}
      language={language}
      theme={theme}
      route={route}
    />
  );
  const SetPasswordWrapper = () => (
    <SetPassword text={text} language={language} theme={theme} />
  );
  const CongratulationsWrapper = () => (
    <Congratulations text={text} language={language} />
  );
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginWrapper} />
        <Stack.Screen name="Signup" component={MobileNumberWrapper} />
        <Stack.Screen name="SetPassword" component={SetPasswordWrapper} />
        <Stack.Screen
          name="SignupVerification"
          component={MobileVerificationWrapper}
        />
        <Stack.Screen
          name="Congratulations"
          component={CongratulationsWrapper}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

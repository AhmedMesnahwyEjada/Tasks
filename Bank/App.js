import React from 'react';
import {store} from './redux/store';
import {Provider} from 'react-redux';
import Login from './pages/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MobileNumber from './pages/MobileNumber';
import MobileVerification from './pages/MobileVerification';
import SetPassword from './pages/SetPassword';
import Congratulations from './pages/Congratulations';
import Home from './pages/Home';

const App = () => {
  const Stack = createNativeStackNavigator();
  const MobileVerificationWrapper = ({route}) => (
    <MobileVerification route={route} />
  );
  const SetPasswordWrapper = ({route}) => <SetPassword route={route} />;
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={MobileNumber} />
          <Stack.Screen name="SetPassword" component={SetPasswordWrapper} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="SignupVerification"
            component={MobileVerificationWrapper}
          />
          <Stack.Screen name="Congratulations" component={Congratulations} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

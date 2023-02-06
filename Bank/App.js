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
import Cards from './pages/Cards';
import History from './pages/History';
import Beneficiaries from './pages/Beneficiaries';
import TransactionHistory from './pages/TransactionHistory';

const App = () => {
  const Stack = createNativeStackNavigator();
  const MobileVerificationWrapper = ({route}) => <MobileVerification route={route} />;
  const SetPasswordWrapper = ({route}) => <SetPassword route={route} />;
  const TransactionHistoryWrapper = ({route}) => <TransactionHistory route={route} />;
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={MobileNumber} />
          <Stack.Screen name="SetPassword" component={SetPasswordWrapper} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Cards" component={Cards} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="TransactionHistory" component={TransactionHistoryWrapper} />
          <Stack.Screen name="Beneficiaries" component={Beneficiaries} />
          <Stack.Screen name="SignupVerification" component={MobileVerificationWrapper} />
          <Stack.Screen name="Congratulations" component={Congratulations} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

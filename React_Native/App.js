import {store} from './redux/store';
import {Provider} from 'react-redux';
import ExpensesList from './components/ExpensesList';
import Months from './pages/Months';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const App = () => {
  const Stack = createNativeStackNavigator();
  const backgroundColorDark = '#232F34';
  const backgroundColorMid = '#344955';
  const backgroundColorLight = '#4A6572';
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: backgroundColorDark,
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}>
          <Stack.Screen name="months" component={Months} />
          <Stack.Screen name="monthDetails" component={ExpensesList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;

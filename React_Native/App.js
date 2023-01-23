import {store} from './redux/store';
import {Provider} from 'react-redux';
import ExpensesList from './components/ExpensesList';
import Months from './pages/Months';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import globalStyle from './assets/styles';
const App = () => {
  const Stack = createNativeStackNavigator();
  const backgroundColorDark = globalStyle.backgroundColorDark;
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="months" component={Months} />
          <Stack.Screen name="monthDetails" component={ExpensesList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;

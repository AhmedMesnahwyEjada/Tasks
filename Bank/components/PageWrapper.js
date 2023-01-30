import {useEffect} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import CustomButton from './CustomButton';
import Header from './Header';
import {useNavigation} from '@react-navigation/native';
const PageWrapper = ({
  theme,
  language,
  title,
  subtitle,
  buttonText,
  footerText,
  children,
  onButtonClick,
  buttonDisabled,
}) => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View
      style={[
        styles.mainView,
        theme === 'light'
          ? {backgroundColor: '#E5E5E5'}
          : {backgroundColor: '#1c2125'},
      ]}>
      <Header type={1} />
      <ScrollView style={styles.body}>
        <Text
          style={[
            styles.title,
            theme === 'dark' ? {color: '#FFFFFF'} : {color: '#1C2437'},
          ]}>
          {title}
        </Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        {children}
      </ScrollView>
      <CustomButton
        title={buttonText}
        style={styles.button}
        titleStyle={{color: '#FFFFFF', fontWeight: 'bold'}}
        onPress={onButtonClick}
        disabled={buttonDisabled}
      />
      <Text style={styles.footer}>{footerText}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {
    padding: 20,
    paddingTop: 50,
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#B7B7B7',
    fontSize: 20,
  },
  body: {
    flex: 10,
    padding: 10,
  },
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
  button: {
    width: '100%',
    height: '7%',
    backgroundColor: '#007236',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    color: '#808080',
    alignSelf: 'center',
    marginTop: 20,
  },
});
export default PageWrapper;

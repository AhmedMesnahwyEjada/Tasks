import {View, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import CustomButton from './CustomButton';
import texts from '../assets/language.json';
import home from '../assets/home.png';
import airPay from '../assets/airPay.png';
import atm from '../assets/atm.png';
import transfer from '../assets/transfer.png';
import benefictaries from '../assets/benefictaries.png';
const Footer = ({page}) => {
  const navigation = useNavigation();
  const language = useSelector(state => state.language.language);
  const theme = useSelector(state => state.theme.theme);
  const text = texts[language];
  const rowStyle =
    language === 'english'
      ? {flexDirection: 'row'}
      : {flexDirection: 'row-reverse'};
  const backgroundColorBottom = theme === 'light' ? '#FFFFFF' : '#151A21';
  const backgroundColor = theme === 'light' ? '#E5E5E5' : '#1c2125';
  const backgroundColorHoverd = 'rgba(0, 114, 54, 1)';
  const fontColor = theme === 'light' ? {color: '#000'} : {color: '#F7F7F7'};
  return (
    <View
      style={[
        {
          paddingVertical: 10,
          backgroundColor: backgroundColorBottom,
          width: '100%',
          borderTopStartRadius: 15,
          borderTopEndRadius: 15,
          justifyContent: 'space-between',
        },
        rowStyle,
      ]}>
      <CustomButton
        style={[
          styles.bottomButton,
          {
            backgroundColor:
              page === 'home' ? backgroundColorHoverd : backgroundColor,
          },
        ]}
        title={text['home']}
        onPress={() => navigation.navigate('Home')}
        titleStyle={[fontColor, {fontSize: 10}]}
        icon={home}
        iconStyle={[
          styles.bottomButtonIcon,
          {
            backgroundColor:
              page === 'home' ? backgroundColorHoverd : backgroundColor,
          },
        ]}
      />
      <CustomButton
        style={[styles.bottomButton, {backgroundColor: backgroundColor}]}
        title={text['transfer']}
        titleStyle={[fontColor, {fontSize: 10}]}
        icon={transfer}
        iconStyle={styles.bottomButtonIcon}
      />
      <CustomButton
        style={[
          styles.bottomButton,
          {
            backgroundColor:
              page === 'beneficiaries'
                ? backgroundColorHoverd
                : backgroundColor,
          },
        ]}
        title={text['beneficiaries']}
        titleStyle={[fontColor, {fontSize: 10}]}
        onPress={() => navigation.navigate('Beneficiaries')}
        icon={benefictaries}
        iconStyle={styles.bottomButtonIcon}
      />
      <CustomButton
        style={[styles.bottomButton, {backgroundColor: backgroundColor}]}
        title={text['atm']}
        titleStyle={[fontColor, {fontSize: 10}]}
        icon={atm}
        iconStyle={styles.bottomButtonIcon}
      />
      <CustomButton
        style={[styles.bottomButton, {backgroundColor: backgroundColor}]}
        title={text['air-pay']}
        titleStyle={[fontColor, {fontSize: 10}]}
        icon={airPay}
        iconStyle={styles.bottomButtonIcon}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column-reverse',
    padding: 5,
    borderRadius: 10,
    margin: 5,
  },
  bottomButtonIcon: {
    padding: 5,
  },
});
export default Footer;

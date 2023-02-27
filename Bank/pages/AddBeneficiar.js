import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {Image, ScrollView, View, Pressable, StyleSheet} from 'react-native';
import {addBeneficiary} from '../axios/Beneficiaries';
import cameraIcon from '../assets/cameraIcon.png';
import texts from '../assets/language.json';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import InputField from '../components/InputField';
import Footer from '../components/Footer';
const AddBeneficiar = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user);
  const language = useSelector(state => state.language.language);
  const theme = useSelector(state => state.theme.theme);
  const text = texts[language];
  const inputBackgroundColor = theme === 'light' ? '#FFF' : '#323F4B';
  const backgroundColor = theme === 'light' ? '#E5E5E5' : '#1c2125';
  const fontColor = theme === 'light' ? {color: '#1C2437'} : {color: '#F7F7F7'};
  const rowStyle =
    language === 'english' ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'};
  const [buttonAvaliability, setButtonAvaliability] = useState(false);
  const [image, setImage] = useState(null);
  const [fName, setFname] = useState('');
  const [lName, setLname] = useState('');
  const [bankBranch, setBankBranch] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const getImage = async () => {
    try {
      const result = await launchImageLibrary({mediaType: 'photo'});
      setImage(result['assets'][0]);
      const {uri} = result['assets'][0];
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const response = await uploadBytes(ref(storage, filename), uploadUri);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitClick = () => {
    navigation.navigate('SignupVerification', {
      type: 2,
      operation: add.bind(
        this,
        fName,
        lName,
        bankBranch,
        accountNumber,
        phoneNumber,
        email,
        image,
        user.id,
      ),
    });
  };
  const add = async (
    fName,
    lName,
    bankBranch,
    accountNumber,
    phoneNumber,
    email,
    image,
    userID,
  ) => {
    await addBeneficiary(
      {
        fName: fName,
        lName: lName,
        bankBranch: bankBranch,
        accountNumber: accountNumber,
        phoneNumber: phoneNumber,
        email: email,
        imageUrl: image?.uri,
      },
      userID,
    );
  };
  useEffect(() => {
    navigation.setOptions({headerShown: false});
  }, []);
  useEffect(() => {
    if (fName !== '' && accountNumber !== '') setButtonAvaliability(true);
  }, [fName, accountNumber]);
  const styles = StyleSheet.create({
    inputField: {
      backgroundColor: inputBackgroundColor,
      height: 70,
      padding: 10,
      borderRadius: 20,
    },
  });
  return (
    <View style={{flex: 1, paddingTop: 50, backgroundColor: backgroundColor}}>
      <Header type={1} />
      <ScrollView
        style={{flex: 1, backgroundColor: backgroundColor, paddingHorizontal: 20}}>
        <Pressable
          onPress={getImage}
          style={{
            backgroundColor: inputBackgroundColor,
            width: 100,
            height: 100,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginVertical: 10,
          }}>
          {image ? (
            <Image
              style={{width: 100, height: 100, borderRadius: 5}}
              source={{uri: image?.uri}}
            />
          ) : (
            <Image style={{resizeMode: 'center'}} source={cameraIcon} />
          )}
        </Pressable>
        <View
          style={[
            rowStyle,
            {justifyContent: 'space-between', alignItems: 'center', marginBottom: 10},
          ]}>
          <InputField
            style={[styles.inputField, {width: 150}]}
            theme={theme}
            language={language}
            title={text['first-name']}
            titleStyle={fontColor}
            inputStyle={fontColor}
            onValueChange={setFname}
          />
          <InputField
            style={[styles.inputField, {width: 150}]}
            theme={theme}
            language={language}
            title={text['last-name']}
            titleStyle={fontColor}
            inputStyle={fontColor}
            onValueChange={setLname}
          />
        </View>
        <InputField
          style={[styles.inputField, {marginBottom: 10}]}
          theme={theme}
          language={language}
          title={text['bank-branch']}
          titleStyle={fontColor}
          inputStyle={fontColor}
          onValueChange={setBankBranch}
        />
        <InputField
          style={[styles.inputField, {marginBottom: 10}]}
          theme={theme}
          language={language}
          title={text['account-number']}
          type={'numeric'}
          titleStyle={fontColor}
          inputStyle={fontColor}
          onValueChange={setAccountNumber}
        />
        <InputField
          style={[styles.inputField, {marginBottom: 10}]}
          theme={theme}
          language={language}
          title={text['phone-number']}
          type={'numeric'}
          titleStyle={fontColor}
          inputStyle={fontColor}
          onValueChange={setPhoneNumber}
        />
        <InputField
          style={[styles.inputField, {marginBottom: 10}]}
          theme={theme}
          language={language}
          title={text['email']}
          titleStyle={fontColor}
          inputStyle={fontColor}
          onValueChange={setEmail}
        />
        <CustomButton
          onPress={onSubmitClick}
          disabled={!buttonAvaliability}
          style={{
            backgroundColor: '#007236',
            borderRadius: 10,
            height: 40,
            justifyContent: 'center',
            marginBottom: 20,
          }}
          title={text['add-beneficiar']}
          titleStyle={{color: '#FFFFFF', alignSelf: 'center'}}
        />
      </ScrollView>
      <Footer page={'beneficiaries'} />
    </View>
  );
};
export default AddBeneficiar;

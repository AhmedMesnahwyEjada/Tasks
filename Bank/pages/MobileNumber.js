import InputField from '../components/InputField';
import PageWrapper from '../components/PageWrapper';
import mobileIcon from '../assets/mobile.png';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import texts from '../assets/language.json';

const MobileNumber = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const language = useSelector(state => state.language.language);
  const theme = useSelector(state => state.theme.theme);
  const text = texts[language];
  const navigation = useNavigation();
  useEffect(() => {
    if (mobileNumber.length === 11 && mobileNumber.slice(0, 2) === '01')
      setNextButtonDisabled(false);
    else setNextButtonDisabled(true);
  }, [mobileNumber]);
  const navigateToVerification = () => {
    if (!nextButtonDisabled)
      navigation.navigate('SignupVerification', {mobileNumber: mobileNumber, type: 1});
  };
  return (
    <PageWrapper
      language={language}
      theme={theme}
      title={text['mobile-title']}
      subtitle={text['mobile-subtitle']}
      buttonText={text['mobile-button']}
      footerText={text['mobile-footer']}
      onButtonClick={navigateToVerification}
      buttonDisabled={nextButtonDisabled}>
      <InputField
        icon={mobileIcon}
        language={language}
        theme={theme}
        title={text['mobile-title']}
        style={{
          borderRadius: 10,
          borderColor: '#007236',
          borderWidth: 2,
          marginTop: 30,
        }}
        inputStyle={theme === 'light' ? {color: 'black'} : {color: 'white'}}
        titleStyle={{color: '#007236', fontWeight: 'bold'}}
        type="numeric"
        maxLength={11}
        value={mobileNumber}
        onValueChange={setMobileNumber}
        onSubmit={navigateToVerification}
      />
    </PageWrapper>
  );
};
export default MobileNumber;

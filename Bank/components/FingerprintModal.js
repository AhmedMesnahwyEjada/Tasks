import {Modal, View, Image, StyleSheet, Text, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import texts from '../assets/language.json';
import fingerprintCircle from '../assets/fingerprintCircle.png';
import CustomButton from './CustomButton';
import TouchID from 'react-native-touch-id';
const FingerprintModal = ({
  modalVisibility,
  toggleModalVisible,
  subtitle,
  onApproval,
}) => {
  const language = useSelector(state => state.language.language);
  const theme = useSelector(state => state.theme.theme);
  const text = texts[language];
  const [fingerPrintAllowed, setFingerprintAllowed] = useState(false);
  useEffect(() => {
    if (modalVisibility && fingerPrintAllowed) {
      TouchID.authenticate(subtitle, {
        title: text['fingerprint-title'],
        cancelText: text['cancle'],
        sensorDescription: text['touch-sensor'],
        sensorErrorDescription: text['fingerprint-error'],
      })
        .then(() => {
          onApproval();
        })
        .catch(err => toggleModalVisible());
    }
  }, [modalVisibility]);
  useEffect(() => {
    TouchID.isSupported()
      .then(() => setFingerprintAllowed(true))
      .catch(() => setFingerprintAllowed(false));
  }, []);
  return (
    <View style={{flex: 1}}>
      {!fingerPrintAllowed && (
        <Modal
          statusBarTranslucent={true}
          visible={modalVisibility}
          transparent={true}
          animationType={'fade'}
          onRequestClose={toggleModalVisible}>
          <Pressable
            style={{flex: 2, backgroundColor: 'rgba(28, 36, 55, 0.77)'}}
            onPress={onApproval}></Pressable>
          <View
            style={[
              styles.fingerprintModal,
              theme === 'light'
                ? {backgroundColor: '#ffffff'}
                : {backgroundColor: '#111111'},
            ]}>
            <Text
              style={[
                styles.modalText,
                theme === 'light' ? {color: '#1C2437'} : {color: '#ffffff'},
              ]}>
              {text['fingerprint-title']}
            </Text>
            <Text
              style={[
                {marginHorizontal: 20, marginBottom: 10},
                theme === 'light' ? {color: '#1C2437'} : {color: '#ffffff'},
              ]}>
              {subtitle}
            </Text>
            <Image source={fingerprintCircle} style={{alignSelf: 'center'}} />
            <Text style={{alignSelf: 'center', marginTop: 10, color: '#B7B7B7'}}>
              {text['touch-fingerprint']}
            </Text>
            <CustomButton
              title={text['cancle']}
              onPress={toggleModalVisible}
              titleStyle={[
                {
                  color: '#007236',
                  marginTop: 15,
                },
                language === 'english'
                  ? {marginRight: 50, alignSelf: 'flex-end'}
                  : {marginLeft: 50, alignSelf: 'flex-start'},
              ]}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fingerprintModal: {
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    flex: 1.2,
  },
  modalText: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 15,
  },
});
export default FingerprintModal;

import {Modal, View, Image, StyleSheet, Text, Pressable} from 'react-native';
import fingerprintCircle from '../assets/fingerprintCircle.png';
import CustomButton from './CustomButton';
const FingerprintModal = ({
  modalVisibility,
  toggleModalVisible,
  text,
  theme,
  language,
}) => {
  return (
    <Modal
      statusBarTranslucent={true}
      visible={modalVisibility}
      transparent={true}
      animationType={'fade'}
      onDismiss={toggleModalVisible}>
      <Pressable
        style={{flex: 2, backgroundColor: 'rgba(28, 36, 55, 0.77)'}}
        onPress={toggleModalVisible}></Pressable>
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
          {text['fingerprint-subtitle']}
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

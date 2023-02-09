import {Modal, View, Image, StyleSheet, Text, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import texts from '../assets/language.json';
import CustomButton from './CustomButton';
import BeneficiariesItem from './BeneficiarieItem';
import transferIcon from '../assets/transferIcon.png';
import editIcon from '../assets/edit.png';
import deleteIcon from '../assets/delete.png';

const BeneficiaryModal = ({
  modalVisibility,
  toggleModalVisible,
  beneficiary,
  id,
  transferPressed,
  editPressed,
  deletePressed,
}) => {
  const language = useSelector(state => state.language.language);
  const theme = useSelector(state => state.theme.theme);
  const rowStyle =
    language === 'arabic' ? {flexDirection: 'row'} : {flexDirection: 'row-reverse'};
  const fontColor = theme === 'light' ? {color: '#1C2437'} : {color: '#F7F7F7'};
  const text = texts[language];
  return (
    <Modal
      statusBarTranslucent={true}
      visible={modalVisibility}
      transparent={true}
      animationType={'fade'}
      onRequestClose={toggleModalVisible}>
      <Pressable
        style={{flex: 2, backgroundColor: 'rgba(28, 36, 55, 0.77)'}}
        onPress={toggleModalVisible}></Pressable>
      <View
        style={[
          styles.fingerprintModal,
          theme === 'light' ? {backgroundColor: '#ffffff'} : {backgroundColor: '#111111'},
        ]}>
        <BeneficiariesItem type={2} item={beneficiary} id={id} />
        <View style={{flex: 3, paddingHorizontal: 20, marginBottom: 40}}>
          <CustomButton
            icon={transferIcon}
            titleStyle={[{marginHorizontal: 20}, fontColor]}
            title={text['transfer']}
            style={[rowStyle, styles.button]}
            onPress={transferPressed}
          />
          <CustomButton
            icon={editIcon}
            title={text['edit']}
            titleStyle={[{marginHorizontal: 20}, fontColor]}
            style={[rowStyle, styles.button]}
            onPress={editPressed}
          />
          <CustomButton
            icon={deleteIcon}
            titleStyle={[{marginHorizontal: 20}, fontColor]}
            title={`${text['delete']} ${beneficiary.fName}`}
            style={[rowStyle, styles.button]}
            onPress={deletePressed}
          />
        </View>
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
  button: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 5,
  },
});
export default BeneficiaryModal;

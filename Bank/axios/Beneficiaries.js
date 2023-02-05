import axios from 'axios';
import {Alert} from 'react-native';

const baseUrl = 'https://cardashboard-9db0c-default-rtdb.firebaseio.com/';
const getBeneficiary = async (id, userID) => {
  try {
    const response = await axios.get(
      `${baseUrl}/beneficiaries/${userID}/${id}.json`,
    );
    return response.data;
  } catch {
    Alert.alert('error in getting the beneficiary');
  }
};
const addBeneficiary = async (beneficiary, userID) => {
  try {
    await axios.post(`${baseUrl}/beneficiaries/${userID}.json`, beneficiary);
  } catch {
    Alert.alert('error in adding the beneficiary');
  }
};
const getBeneficiaries = async userID => {
  try {
    const response = await axios.get(`${baseUrl}/beneficiaries/${userID}.json`);
    return response.data ? Object.values(response.data) : [];
  } catch {
    Alert.alert('error in getting the beneficiaries');
  }
};
export {addBeneficiary, getBeneficiary, getBeneficiaries};

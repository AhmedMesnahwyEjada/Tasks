import axios from 'axios';
import {Alert} from 'react-native';

const baseUrl = 'https://cardashboard-9db0c-default-rtdb.firebaseio.com/';

const addTransaction = async (transaction, userID) => {
  try {
    await axios.post(`${baseUrl}/history/${userID}.json`, transaction);
  } catch {
    Alert.alert('error in making the transaction please try again later');
  }
};

const getHistory = async userID => {
  try {
    const response = await axios.get(`${baseUrl}/history/${userID}.json`);
    return response.data ? Object.values(response.data) : [];
  } catch {
    Alert.alert('error in getting the history');
  }
};
const getTransactionHistory = async (userID, beneficiaryID) => {
  try {
    const history = await getHistory(userID);
    const response = [];
    for (historyItem of history)
      historyItem.beneficiaryID === beneficiaryID ? response.push(historyItem) : null;
    return response;
  } catch {
    Alert.alert('error in getting transaction history');
  }
};

export {addTransaction, getHistory, getTransactionHistory};

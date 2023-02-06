import axios from 'axios';
import {Alert} from 'react-native';

const baseUrl = 'https://cardashboard-9db0c-default-rtdb.firebaseio.com/';
const getCard = async (id, userID) => {
  try {
    const response = await axios.get(`${baseUrl}/cards/${userID}/${id}.json`);
    return response.data;
  } catch {
    Alert.alert('error in getting the card');
  }
};
const getCards = async userID => {
  try {
    const response = await axios.get(`${baseUrl}/cards/${userID}.json`);
    return response.data ? Object.values(response.data) : [];
  } catch {
    Alert.alert('error in getting the cards');
  }
};
export {getCard, getCards};

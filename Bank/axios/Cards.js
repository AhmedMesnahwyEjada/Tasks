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
const updateCard = async (cardNumber, userID, card) => {
  try {
    const cards = await axios.get(`${baseUrl}/cards/${userID}.json`);
    for ([id, value] of Object.entries(cards.data)) {
      if (value.number === cardNumber) {
        const response = await axios.put(`${baseUrl}/cards/${userID}/${id}.json`, card);
        return response;
      }
    }
    return null;
  } catch (err) {
    console.log(err);
    Alert.alert('error in updating the card');
  }
};
export {getCard, getCards, updateCard};

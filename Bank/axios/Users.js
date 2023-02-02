import axios from 'axios';
import {Alert} from 'react-native';

const baseUrl = 'https://cardashboard-9db0c-default-rtdb.firebaseio.com/';

const createUser = async userData => {
  try {
    await axios.post(`${baseUrl}/users.json`, userData);
  } catch {
    Alert.alert('error in creating a user please try again later');
  }
};
const getUser = async userData => {
  try {
    const response = await axios.get(`${baseUrl}/users.json`);
    for (const key in response.data) {
      if (
        response.data[key].mobileNumber === userData.mobileNumber &&
        response.data[key].password === userData.password
      )
        return {id: key, ...response.data[key]};
    }
    return null;
  } catch {
    Alert.alert('error in getting your data');
  }
};

const getUserByID = async id => {
  try {
    const response = await axios.get(`${baseUrl}/users/${id}.json`);
    if (response.data) return {id: id, ...response.data};
    return null;
  } catch {
    Alert.alert('error in getting your data');
  }
};

export {createUser, getUser, getUserByID};

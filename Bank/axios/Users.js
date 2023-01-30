import axios from 'axios';

const baseUrl = 'https://cardashboard-9db0c-default-rtdb.firebaseio.com/';

const createUser = async userData => {
  await axios.post(`${baseUrl}/users.json`, userData);
};
const getUser = async userData => {
  const response = await axios.get(`${baseUrl}/users.json`);
  for (const key in response.data) {
    if (
      response.data[key].mobileNumber === userData.mobileNumber &&
      response.data[key].password === userData.password
    )
      return response.data[key];
  }
  return null;
};

export {createUser, getUser};

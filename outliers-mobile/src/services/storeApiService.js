import config from '@src/config';
import { create } from 'apisauce';

// Base API Init
const api = create({
  baseURL: config.apiURL
});

// Functions list init
let func = {};

func.getPaymentInfo = async (token) => {
  try {
    api.setHeader('Authorization', token);
    const response = await api.get('/payment');
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

func.setPaymentInfo = async (token, data) => {
  try {
    api.setHeader('Authorization', token);
    const response = await api.post('/payment', data);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.updatePaymentInfo = async (token, data) => {
  try {
    api.setHeader('Authorization', token);
    const response = await api.put('/payment', data);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export default func;

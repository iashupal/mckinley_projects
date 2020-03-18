import axios from 'axios';

const instance = axios.create({
//   baseURL: 'https://outlier.mckinleyrice.com',
  baseURL: 'https://api.globaloutliers.com',
});


export default instance;

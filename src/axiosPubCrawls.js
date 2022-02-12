import axios from 'axios';

const axiosPubCrawlsInstance = axios.create({
  baseURL: `${process.env.REACT_APP_DATABASE_URL}/pubCrawls`
});

export default axiosPubCrawlsInstance;

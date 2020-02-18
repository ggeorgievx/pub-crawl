import axios from 'axios';

const axiosPubCrawlsInstance = axios.create({
  baseURL: 'https://pub-crawl-267516.firebaseio.com/pubCrawls'
});

export default axiosPubCrawlsInstance;

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.100.6:3999',
});

export default api;
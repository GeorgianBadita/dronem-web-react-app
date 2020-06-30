import axios from 'axios';
import AuthStore from './auth/authStore';

const ADDR = '0.0.0.0:8000';
//const ADDR = '104.248.23.5:80'

const baseURL = 'http://' + ADDR + '/api';

const instance = axios.create({
    baseURL: baseURL
});


const token = AuthStore.getToken();
instance.defaults.headers.common.Authorization = "Token " + token;


export default instance;
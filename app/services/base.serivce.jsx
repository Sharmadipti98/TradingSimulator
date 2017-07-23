import axios from 'axios';
class BaseService {
    constructor() {
        this.baseUrl = "/chevak/api";
        this.fullHostName = "http://www.gadgetclues.com";
    }

    getQueryParam() {
        return `_t=${RW_BCC_KEY}&_u=${UID}&_c=${visitorCountry}`;
    }

    getData(url) {
        return axios.get(`${url}`);
    }

    getDataWithQueryParams(url, queryParams) {
        let params = this.getParams(queryParams);
        return axios.get(`${url}?${params}`);
    }

    postData(url, data) {
        return axios.post(`${url}}`, data);
    }

    getParams(params) {
        let str = "";
        for (let key in params) {
            if (str == "") {
                str = `${key}=${params[key]}`;
            } else {
                str = `${str}&${key}=${params[key]}`;
            }
        }
        return str.length > 1 ? str : '';
    }
}

export default (new BaseService());
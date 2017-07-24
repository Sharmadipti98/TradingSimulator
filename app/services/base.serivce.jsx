import axios from 'axios';
class BaseService {
    constructor() {
        this.baseUrl = "/api";
        this.fullHostName = "http://www.netpract.com";
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
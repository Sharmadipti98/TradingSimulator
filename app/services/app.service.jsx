import React from 'react';
import axios from 'axios';
import BaseService from './base.serivce.jsx';
class GadgetsService {

    constructor() {

    }

    getAllApps() {
        let url = `${BaseService.baseUrl}/all-apps`;
        return BaseService.getData(url);
    }

    getAppInfoByLink(appLink, age, gender) {
        let url = `${BaseService.baseUrl}/app-by-link`;
        let param = {
            appLink: appLink,
            age: age,
            gender: gender
        };
        return BaseService.getDataWithQueryParams(url, param);
    }
}

export default (new GadgetsService());
import React from 'react';
import axios from 'axios';
import BaseService from './base.serivce.jsx';
class GadgetsService {

    constructor() {

    }

    getSearchItems(companyName, exchange) {
        let url = `${BaseService.baseUrl}/search`;
        let queryParams = {
            companyName: companyName,
            exchange: exchange
        };
        return BaseService.getDataWithQueryParams(url, queryParams);
    }
}

export default (new GadgetsService());
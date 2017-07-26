import React from 'react';
import axios from 'axios';
import BaseService from './base.serivce.jsx';
class GadgetsService {

    constructor() {
        this.quadlBase = `https://www.quandl.com/api/v3/datasets`;
        this.apiKey = `&api_key=C-XysK9CA5RzYN7f2oMk`;
    }

    getSearchItems(companyName, exchange) {
        let url = `${BaseService.baseUrl}/search`;
        let queryParams = {
            companyName: companyName,
            exchange: exchange
        };
        return BaseService.getDataWithQueryParams(url, queryParams);
    }

    getPrice(exchange, tickerId, noOfDays) {
        let url = `${this.quadlBase}/${exchange}/${tickerId}/data.json?limit=${noOfDays}${this.apiKey}`;
        return BaseService.getData(url);
    }

    getMonthlyPrice(exchange, tickerId, noOfMonths) {
        let url = `${this.quadlBase}/${exchange}/${tickerId}/data.json?limit=${noOfMonths}${this.apiKey}`;
        return BaseService.getData(url);
    }
}

export default (new GadgetsService());
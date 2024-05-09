import axios from 'axios';

const API_BASE_URL = 'https://api-public.sandbox.exchange.coinbase.com';

export const getTradingPairs = async () => {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
};

export const getProductCandles = async (pair, granularity, start) => {
    let response;
    let candleQuantity = 250;
    let candleWindow = granularity*1000*candleQuantity;
    if (start !== 0 && !(new Date() - start < candleWindow)) {
        let end = new Date(start + candleWindow);
        start = new Date(start);
        response = await axios.get(`${API_BASE_URL}/products/${pair}/candles?granularity=${granularity}&start=${start.toISOString()}&end=${end.toISOString()}`);
    } else {
        response = await axios.get(`${API_BASE_URL}/products/${pair}/candles?granularity=${granularity}`);
    }
    return response.data;
};
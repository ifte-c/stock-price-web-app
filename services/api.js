import axios from 'axios';

const API_BASE_URL = 'https://api-public.sandbox.exchange.coinbase.com';

export const getTradingPairs = async () => {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
};

export const getProductCandles = async (pair, granularity) => {
    const response = await axios.get(`${API_BASE_URL}/products/${pair}/candles?granularity=${granularity}`);
    return response.data;
};
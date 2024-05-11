'use server';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

function signatureGenerator(secret, timestamp, method, path, body="") {
    const message = timestamp + method + path + body;
    const key = Buffer.from(secret, "base64");
    const hmac = crypto.createHmac("sha256", key);
    const signature = hmac.update(message).digest("base64");
    return signature;
}

const BASE_URL = 'https://api-public.sandbox.exchange.coinbase.com';
const axiosInstance = axios.create({baseURL: BASE_URL});

axios.defaults.headers.common['CB-ACCESS-KEY'] = process.env.API_KEY;
axios.defaults.headers.common['CB-ACCESS-PASSPHRASE'] = process.env.API_PASSPHRASE;

axiosRetry(axiosInstance, { 
    retries: 3,
    retryDelay: (...arg) => axiosRetry.exponentialDelay(...arg, 1000),
    retryCondition: (error) => axiosRetry.isRetryableError(error),
    onRetry: (retryCount, error, requestConfig) => {
        console.log('retry count: ', retryCount);
    }
 });

export const getTradingPairs = async () => {
    const method = "GET";
    const requestPath = '/products';
    const timestamp = Date.now() / 1000;

    const response = await axiosInstance.get(requestPath, {
        headers: {
            'CB-ACCESS-TIMESTAMP': timestamp,
            'CB-ACCESS-SIGN': signatureGenerator(process.env.API_SECRET, timestamp, method, requestPath)
        }
    });

    return response.data;
};

export const getProductCandles = async (pair, granularity, start) => {
    const method = "GET";
    let requestPath = `/products/${pair}/candles?granularity=${granularity}`;
    const timestamp = Date.now() / 1000;
    const candleQuantity = 250;
    const candleWindow = granularity*candleQuantity*1000;

    if (start !== 0 && !(new Date() - start < candleWindow)) {
        let end = new Date(start + candleWindow);
        start = new Date(start);
        requestPath += `&start=${start.toISOString()}&end=${end.toISOString()}`;
    }
    
    const response = await axiosInstance.get(requestPath, {
        headers: {
            'CB-ACCESS-TIMESTAMP': timestamp,
            'CB-ACCESS-SIGN': signatureGenerator(process.env.API_SECRET, timestamp, method, requestPath)
        }
    })
    
    return response.data;
};
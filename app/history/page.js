'use client';
import React, { useState, useEffect } from 'react';
import { getTradingPairs, getProductCandles } from '@/services/api';
import HistoryPage from '@/components/HistoryPage';
import dayjs from 'dayjs';

export default function HistoricalPricesPage() {
    const [tradingPairs, setTradingPairs] = useState([]);
    const [selectedPair, setSelectedPair] = useState('');
    const [selectedGranularity, setSelectedGranularity] = useState(21600);
    const [selectedDate, setSelectedDate] = useState(Math.floor(dayjs().valueOf() / 300000) * 300000);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        getTradingPairs().then(data => {
            data.sort((a,b) => a.id.toUpperCase().localeCompare(b.id.toUpperCase()))
            return setTradingPairs(data);
        }).catch(error => console.error('Failed to fetch trading pairs:', error));
    }, []);

    const handleOptionsChange = (pair = selectedPair, granularity = selectedGranularity, date = selectedDate) => {
        if (pair !== selectedPair) setSelectedPair(pair);
        if (granularity !== selectedGranularity) setSelectedGranularity(granularity);
        if (date !== selectedDate) setSelectedDate(date);
        
        if (pair && granularity) {
            getProductCandles(pair, granularity, date)
                .then(data => {
                    console.log(data);
                    setChartData(data);
                })
                .catch(error => console.error('Failed to fetch product candles:', error));
        }
    };

    return (
            <HistoryPage tradingPairs={tradingPairs} handleOptionsChange={handleOptionsChange} chartData={chartData} selectedPair={selectedPair} selectedDate={selectedDate} />
    );
}

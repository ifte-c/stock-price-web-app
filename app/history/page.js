'use client';
import React, { useState, useEffect } from 'react';
import { getTradingPairs, getProductCandles } from '@/services/api';
import ChartComponent from '@/components/ChartComponent';
import TradingPairSelector from '@/components/TradingPairSelector';
import HistoryPage from '@/components/HistoryPage';

export default function HistoricalPricesPage() {
    const [tradingPairs, setTradingPairs] = useState([]);
    const [selectedPair, setSelectedPair] = useState('');
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        getTradingPairs().then(data => {
            data.sort((a,b) => a.id.toUpperCase().localeCompare(b.id.toUpperCase()))
            return setTradingPairs(data);
        }).catch(error => console.error('Failed to fetch trading pairs:', error));
    }, []);

    const handlePairChange = (pair) => {
        setSelectedPair(pair);
        if (pair) {
            getProductCandles(pair, 21600)  // Example granularity
                .then(data => {
                    setChartData(data);
                })
                .catch(error => console.error('Failed to fetch product candles:', error));
        }
    };

    return (
        <div>
            <h2>Historical Stock Prices</h2>
            <HistoryPage/>
            <TradingPairSelector options={tradingPairs} onChange={handlePairChange} />
            {chartData.length > 0 && <ChartComponent data={chartData} pair={selectedPair} />}
        </div>
    );
}

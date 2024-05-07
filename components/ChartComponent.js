import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { enGB } from 'date-fns/locale';
import 'chart.js/auto';

const ChartComponent = ({ data, pair }) => {
    const chartData = {
        labels: data.map(item => new Date(item[0]*1000)), // Convert timestamp to readable date
        datasets: [
            {
                label: pair,
                data: data.map(item => item[4]), // Assuming 'item[4]' is the closing price
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    tooltipFormat: 'dd/MM/yyyy hh:mm',
                },
                title: {
                    display: true,
                    text: 'Date',
                },
                adapters: {
                    date: {
                        locale: enGB
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Price (' + pair.slice(-3) +')',
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, ticks) {
                        return '$' + value;
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            }
        },
        maintainAspectRatio: false
    };

    console.log(chartData);
    return (
        <div style={{ height: '400px', width: '100%' }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default ChartComponent;

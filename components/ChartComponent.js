import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { enGB } from 'date-fns/locale';
import 'chart.js/auto';
import Typography from '@mui/material/Typography';

// Candles schema: [timestamp, price_low, price_high, price_open, price_close]

const ChartComponent = ({ data, pair }) => {
    if (data == null) {
        data = [];
    }
    
    const chartData = {
        labels: data.map(item => new Date(item[0]*1000)),
        datasets: [
            {
                label: pair,
                data: data.map(item => item[4]),
                fill: false,
                backgroundColor: 'rgb(30, 135, 229)',
                borderColor: 'rgba(30, 135, 229, 0.2)',
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
                    text: 'Price (' + pair.split('-')[1] +')',
                },
                ticks: {
                    callback: function(value, index, ticks) {
                        let yVal = parseFloat(value);
                        let fixedVals = [...Array(11).keys()].map(x => parseFloat((x*0.1).toFixed(1)));
                        if (fixedVals.includes(yVal) || yVal > 1) {
                            return yVal.toLocaleString();
                        }
                        else {
                            return yVal.toFixed(7);
                        }
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
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
        
                        if (label) {
                            label += ': ';
                        }
                        
                        let yVal = parseFloat(context.parsed.y)
                        if (yVal === 0 || yVal > 1) {
                            label += yVal;
                        } else {
                            label += yVal.toFixed(7);
                        }
                        return label;
                    }
                }
            },
            hover: {
                mode: 'nearest',
                intersect: true
            }
        },
        maintainAspectRatio: false
    };

    return (
        <div style={{ position: 'relative', height: '440px', width: '100%' }}>
            <Line data={chartData} options={options} />
            {data.length === 0 && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                }}>
                    <Typography
                        variant="h4"
                        textAlign="center"
                        color="text.secondary"
                        sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' }}}
                    >
                    No data to display
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default ChartComponent;

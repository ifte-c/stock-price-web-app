import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function TradingPairSelector({ options, pair, onChange }) {
    return (
        <FormControl fullWidth>
            <InputLabel id="trading-pair-selector-label">Trading Pair</InputLabel>
            <Select
                labelId="trading-pair-selector-label"
                id="trading-pair-selector"
                label="Trading Pair"
                value={pair}
                onChange={(e) => onChange(e.target.value)}
            >

                {options.map((option, index) => (
                <MenuItem key={index} value={option.id}>
                    {option.display_name || option.id}
                </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default TradingPairSelector;

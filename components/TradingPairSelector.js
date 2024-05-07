import React from 'react';

function TradingPairSelector({ options, onChange }) {
    return (
        <div>
            <label htmlFor="trading-pair-selector">Select a Trading Pair:</label>
            <select id="trading-pair-selector" onChange={(e) => onChange(e.target.value)}>
                <option value="">--Please choose an option--</option>
                {options.map((option, index) => (
                    <option key={index} value={option.id}>
                        {option.display_name || option.id}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default TradingPairSelector;

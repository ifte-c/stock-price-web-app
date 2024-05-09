import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function GranularitySelector({ onChange }) {
    return (
        <FormControl fullWidth>
            <InputLabel id="granularity-selector-label">Granularity</InputLabel>
            <Select
                labelId="granularity-selector-label"
                id="granularity-selector"
                label="Granularity"
                defaultValue={21600}
                onChange={(e) => onChange(undefined, e.target.value)}
            >
                <MenuItem key={60} value={60}> 1 minute </MenuItem>
                <MenuItem key={300} value={300}> 5 minutes </MenuItem>
                <MenuItem key={900} value={900}> 15 minutes </MenuItem>
                <MenuItem key={3600} value={3600}> 1 hour </MenuItem>
                <MenuItem key={21600} value={21600}> 6 hours </MenuItem>
                <MenuItem key={86400} value={86400}> 24 hours </MenuItem>
            </Select>
        </FormControl>
    );
}

export default GranularitySelector;

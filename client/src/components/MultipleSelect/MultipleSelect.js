import React from 'react';
import {
    Checkbox,
    ListItemText,
    Select,
    OutlinedInput,
    FormControl,
    InputLabel,
    Box,
    Chip,
    MenuItem,
} from '@mui/material';

function MultipleSelect({ value, handleChange, options, label }) {
    const renderChips = selected => {
        let renderedValues = [];

        selected.forEach(value => {
            let option = options.find(option => option._id === value);

            if (!option) return;

            renderedValues.push(option.value);
        });

        return (
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 0.5,
                }}
            >
                {renderedValues.map(value => (
                    <Chip key={value} label={value} />
                ))}
            </Box>
        );
    };

    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="label">{label}</InputLabel>
            <Select
                labelId="label"
                id="select"
                multiple
                value={value ? value : []}
                onChange={handleChange}
                input={<OutlinedInput label={label} />}
                renderValue={renderChips}
            >
                {options.map(option => (
                    <MenuItem key={option._id} value={option._id}>
                        <Checkbox checked={value?.indexOf(option._id) > -1} />
                        <ListItemText primary={option.value} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default MultipleSelect;

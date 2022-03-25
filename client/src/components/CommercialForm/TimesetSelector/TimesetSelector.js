import React, { useState } from 'react';
import {
    Button,
    Checkbox,
    Chip,
    ListItemText,
    MenuItem,
    TextField,
} from '@mui/material';

import './TimesetSelector.scss';

const DEFAULT_STATE = {
    startDate: '',
    endDate: '',
    startTime: new Date().toTimeString().split(' ')[0].replaceAll(':', ''),
    endTime: new Date().toTimeString().split(' ')[0].replaceAll(':', ''),
    daysInWeek: [],
};

const WEEKDAYS = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

/*const splitSet = s => {
    let [startDate, startTime] = s.start.split('T');
    let [endDate, endTime] = s.end.split('T');
    startTime = startTime.split('.');
    endTime = endTime.split('.');

    return {
        startDate,
        endDate,
        startTime,
        endTime,
        daysInWeek: s.daysInWeek,
    };
};

const concatSet = s => {
    return {
        start: new Date(s.startDate + ' ' + s.startTime),
        end: new Date(s.endDate + ' ' + s.endTime),
        daysInWeek: s.daysInWeek,
    };
};*/

const reduceTime = t => t.replaceAll(':', '');

const expandTime = t => `${t[0]}${t[1]}:${t[2]}${t[3]}:${t[4]}${t[5]}`;

const reduceDate = d => new Date(d).toJSON().split('T')[0];

const getSetText = t =>
    `${reduceDate(t.startDate)} - ${reduceDate(t.endDate)}, ${expandTime(
        t.startTime,
    )} - ${expandTime(t.endTime)}, ${t.daysInWeek
        .map(d => WEEKDAYS[d])
        .join(', ')}`;

function TimesetSelector({ timesets, onChange }) {
    const [timeset, setTimeset] = useState(DEFAULT_STATE);

    const onAdd = () => {
        onChange([...timesets, timeset]);
        setTimeset(DEFAULT_STATE);
    };

    const onDelete = index => () => {
        onChange([...timesets.slice(0, index), ...timesets.slice(index + 1)]);
    };

    return (
        <div style={{ gridColumn: 'span 4' }}>
            <h3>Time sets</h3>
            <div className="commercial-timesets-edit">
                <TextField
                    label="Start date"
                    type="date"
                    value={timeset.startDate}
                    onChange={e => {
                        setTimeset(prev => ({
                            ...prev,
                            startDate: e.target.value,
                        }));
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="End date"
                    type="date"
                    value={timeset.endDate}
                    onChange={e => {
                        setTimeset(prev => ({
                            ...prev,
                            endDate: e.target.value,
                        }));
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Start time"
                    type="time"
                    value={expandTime(timeset.startTime)}
                    onChange={e => {
                        setTimeset(prev => ({
                            ...prev,
                            startTime: reduceTime(e.target.value),
                        }));
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="End time"
                    type="time"
                    value={expandTime(timeset.endTime)}
                    onChange={e => {
                        setTimeset(prev => ({
                            ...prev,
                            endTime: reduceTime(e.target.value),
                        }));
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    select
                    label="Weekdays"
                    value={timeset.daysInWeek}
                    onChange={e => {
                        setTimeset(prev => ({
                            ...prev,
                            daysInWeek: e.target.value,
                        }));
                    }}
                    SelectProps={{
                        multiple: true,
                        renderValue: selected =>
                            selected.map(d => WEEKDAYS[d]).join(', '),
                    }}
                >
                    {WEEKDAYS.map((d, index) => (
                        <MenuItem key={index} value={index}>
                            <Checkbox
                                checked={timeset.daysInWeek.indexOf(index) > -1}
                            />
                            <ListItemText primary={d} />
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    onClick={onAdd}
                    disabled={
                        !(
                            timeset.startDate &&
                            timeset.endDate &&
                            timeset.startTime &&
                            timeset.endTime
                        )
                    }
                >
                    Add
                </Button>
            </div>
            <div>
                {timesets.map((t, index) => {
                    const text = getSetText(t);
                    return (
                        <Chip
                            key={text}
                            label={text}
                            onDelete={onDelete(index)}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default TimesetSelector;

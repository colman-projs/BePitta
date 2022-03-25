import {
    Button,
    Checkbox,
    InputAdornment,
    ListItemText,
    MenuItem,
    TextField,
} from '@mui/material';
import { useAlert } from 'react-alert';
import React, { useCallback, useEffect, useState } from 'react';

import Loader from '../Loader/Loader';
import {
    deleteCommercial,
    getCommercials,
    upsertCommercial,
} from '../../actions/commercialsActions';
import TimesetSelector from './TimesetSelector/TimesetSelector';

import './CommercialForm.scss';
import { SCREENS } from '../../globals';
import { TEMPLATE_TYPES } from '../Templates';

const INITIAL_STATE = {
    name: '',
    messages: '',
    images: '',
    template: null,
    durationInSeconds: 0,
    screenId: [],
    timeSets: [],
};

function CommercialForm({ isEdit }) {
    const [commercials, setCommercials] = useState([]);
    const [commercial, setCommercial] = useState(null);
    const [selected, setSelected] = useState('');

    const [loading, setLoading] = useState(false);

    const alert = useAlert();

    const fetchCommercials = useCallback(async () => {
        setLoading(true);
        const res = await getCommercials();

        if (res) {
            setCommercials(res);
        } else alert.error('Error while loading commercials');

        setLoading(false);
    }, [alert]);

    useEffect(() => {
        if (isEdit) {
            fetchCommercials();
        } else {
            setCommercial(INITIAL_STATE);
        }
    }, [isEdit, fetchCommercials]);

    const handleChangeScreen = event => {
        const {
            target: { value },
        } = event;
        setCommercial(prev => ({
            ...prev,
            screenId: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const handleChangeField = property => e => {
        setCommercial(prev => ({
            ...prev,
            [property]: e.target.value,
        }));
    };

    const handleChangeTimesets = t => {
        setCommercial(prev => ({
            ...prev,
            timeSets: t,
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);

        const comm = {
            ...commercial,
            messages: commercial.messages.split('\n'),
            images: commercial.images.split('\n'),
        };

        const res = await upsertCommercial(comm);

        if (res) {
            alert.success(
                `The commercial was ${
                    isEdit ? 'Updated' : 'Added'
                } successfuly`,
            );

            !isEdit && setCommercial(INITIAL_STATE);

            await fetchCommercials();
        } else {
            alert.error('Error while updating commercials');
        }

        setLoading(false);
    };

    const onDeleteCommercial = async () => {
        setLoading(true);

        const res = await deleteCommercial(commercial._id);

        if (res) {
            await fetchCommercials();
        } else alert.error('Error while deleting commercial');

        setCommercial(null);

        setLoading(false);
    };

    const fields = commercial && (
        <div className="edit-fields">
            <TextField
                label="Name"
                value={commercial.name}
                onChange={handleChangeField('name')}
                style={{ gridColumn: 'span 2' }}
            />

            <TextField
                select
                label="Template"
                value={commercial.template}
                onChange={handleChangeField('template')}
            >
                {Object.keys(TEMPLATE_TYPES).map(t => (
                    <MenuItem value={TEMPLATE_TYPES[t]}>{t}</MenuItem>
                ))}
            </TextField>

            <TextField
                label="Duration"
                type="number"
                value={commercial.durationInSeconds}
                onChange={handleChangeField('durationInSeconds')}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">s</InputAdornment>
                    ),
                }}
            />
            <TextField
                label="Messages"
                multiline
                maxRows={10}
                value={commercial.messages}
                onChange={handleChangeField('messages')}
                style={{ gridColumn: 'span 2' }}
            />
            <TextField
                label="Images"
                multiline
                value={commercial.images}
                onChange={handleChangeField('images')}
                style={{ gridColumn: 'span 2' }}
            />

            <TextField
                select
                label="Screens"
                value={commercial.screenId}
                onChange={handleChangeScreen}
                SelectProps={{
                    multiple: true,
                    renderValue: selected => selected.join(', '),
                }}
            >
                {SCREENS.map(s => (
                    <MenuItem key={s} value={s}>
                        <Checkbox
                            checked={commercial.screenId.indexOf(s) > -1}
                        />
                        <ListItemText primary={s} />
                    </MenuItem>
                ))}
            </TextField>
            <TimesetSelector
                timesets={commercial.timeSets}
                onChange={handleChangeTimesets}
            />
        </div>
    );

    const changeCommercial = e => {
        let comm = commercials.find(comm => comm._id === e.target.value);
        comm = {
            ...comm,
            messages: comm.messages.join('\n'),
            images: comm.images.join('\n'),
        };

        setCommercial(comm);
        setSelected(comm._id);
    };

    return (
        <form onSubmit={handleSubmit} className="commercial-form center">
            {loading ? (
                <Loader />
            ) : (
                <>
                    {isEdit && (
                        <TextField
                            select
                            className="select-screen"
                            label="Commercial"
                            onChange={changeCommercial}
                            value={selected}
                            SelectProps={{
                                renderValue: comm =>
                                    commercials.find(c => c._id === comm)?.name,
                            }}
                            fullWidth
                        >
                            {commercials.map(comm => (
                                <MenuItem key={comm._id} value={comm._id}>
                                    {comm.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                    {fields}
                    {((isEdit && selected) || !isEdit) && (
                        <div className="actions">
                            <Button
                                variant="contained"
                                onClick={() => setCommercial(INITIAL_STATE)}
                            >
                                Clear
                            </Button>
                            {isEdit && (
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={onDeleteCommercial}
                                >
                                    Delete
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                {isEdit ? 'Save' : 'Create'}
                            </Button>
                        </div>
                    )}
                </>
            )}
        </form>
    );
}

export default CommercialForm;

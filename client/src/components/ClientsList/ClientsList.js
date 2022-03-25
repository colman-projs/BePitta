import React, { useCallback, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import moment from 'moment';
import { getClients } from '../../actions/adminActions';
import Loader from '../Loader/Loader';
import { socket } from '../../socket';

import './ClientsList.scss';

function ClientsList() {
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState([]);

    const alert = useAlert();

    const fetchClients = useCallback(async () => {
        setLoading(true);

        const res = await getClients();
        if (res) {
            setClients(res);
        } else alert.error('Error while loading clients');

        setLoading(false);
    }, [alert]);

    useEffect(() => {
        fetchClients();

        socket.on('updateClients', () => fetchClients());
    }, [fetchClients]);

    return (
        <div className="clients-data center">
            {loading ? (
                <Loader />
            ) : (
                <table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Screen</td>
                            <td>Connect Time</td>
                            <td>Disconnect Time</td>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => {
                            return (
                                <tr>
                                    <td>{client._id}</td>
                                    <td>{client.screenId}</td>
                                    <td>
                                        {moment(
                                            new Date(client.connected),
                                        ).format('DD/MM/YYYY HH:mm')}
                                    </td>
                                    <td>
                                        {client.disconnected
                                            ? moment(
                                                  new Date(client.disconnected),
                                              ).format('DD/MM/YYYY HH:mm')
                                            : ''}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ClientsList;

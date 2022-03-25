import admin from '../api/admin';
import authHeader from '../api/auth-header';

export const authenticate = async (username, password) => {
    try {
        const { data } = await admin.post('/', { username, password });

        if (data.accessToken) {
            localStorage.setItem('admin', JSON.stringify(data));
        }

        return data;
    } catch (e) {
        console.error(e);

        return { message: e?.response?.data?.message };
    }
};

export const updateDetails = async (username, password) => {
    try {
        const adminId = getCurrentAdmin().id;

        if (!adminId) return;

        const { data } = await admin.post(
            '/update',
            { id: adminId, username, password },
            { headers: authHeader() },
        );

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const logout = () => {
    localStorage.removeItem('admin');
};

export const getCurrentAdmin = () => {
    return JSON.parse(localStorage.getItem('admin'));
};

export const getClients = async () => {
    try {
        const { data } = await admin.get('/clients');

        return data;
    } catch (e) {
        console.error(e);
    }
};

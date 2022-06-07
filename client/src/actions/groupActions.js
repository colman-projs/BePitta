import authHeader from '../api/auth-header';
import groups from '../api/groups';
import { cookie } from './cookieActions';

export const getGroupById = async groupId => {
    try {
        const { data } = await groups.get(`/${groupId}`, {
            headers: authHeader(),
        });

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const getGroups = async () => {
    try {
        const { data } = await groups.get('/');

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const createGroup = async (restaurantId, groupName = "New Group") => {
    const userId = cookie.getCookie(cookie.siteCookies.userId);
    try {
        const { data } = await groups.post('/', {
            restaurantId: restaurantId,
            name: groupName,
            users: [userId],
            state: "new"
        });

        return data;
    } catch (e) {
        console.error(e);
    }
}
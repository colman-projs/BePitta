import users from '../api/users';

export const createUser = () => {
    return new Promise(async (res, rej) => {
        try {
            const { data } = await users.post('/', {
                googleId: '',
            });

            res(data);
        } catch (e) {
            console.error(e);
            rej();
        }
    });
};

export const updateUserGoogle = async (userId, googleId) => {
    try {
        const { data } = await users.put(`/${userId}`, {
            _id: userId,
            googleId: googleId,
        });

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const getUserByGoogle = async googleId => {
    try {
        const { data } = await users.get(`/byGoogle/${googleId}`);

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const updateUserTags = async (clientId, tags) => {
    try {
        const { data } = await users.put(`/${clientId}/tags`, {
            tags,
        });

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const getUserById = async userId => {
    try {
        const { data } = await users.get(`/${userId}`);

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const updateUserDishes = async (userId, dishes, prefDone = false) => {
    try {
        const { data } = await users.put(`/${userId}/dishes`, {
            dishes,
            prefDone
        });

        return data;
    } catch (e) {
        console.error(e);
    }
};

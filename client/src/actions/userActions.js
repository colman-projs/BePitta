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
            googleId: googleId,
        });

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const updateUserTags = async (userId, tags) => {
    try {
        const { data } = await users.put(`/${userId}/tags`, {
            tags,
        });

        return data;
    } catch (e) {
        console.error(e);
    }
};

export const getUserById = async id => {
    try {
        const { data } = await users.get(`/${id}`);

        return data;
    } catch (e) {
        console.error(e);
    }
};

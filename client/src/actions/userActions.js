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

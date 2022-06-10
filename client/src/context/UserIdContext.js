import { createContext } from 'react';

let userId = {
    userId: null,
    setUserId: () => { },
};

export const UserIdContext = createContext(userId);

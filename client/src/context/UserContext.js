import { createContext } from 'react';

let user = {
    user: null,
    setUser: () => {},
};

export const UserContext = createContext(user);

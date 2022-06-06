import { createContext } from 'react';

let globalContext = {
    loadingApp: false,
    setIsLoadingApp: () => { },
};

export const GlobalContext = createContext(globalContext);

let user = {
    user: null,
    setUser: () => { }
};
export const User = createContext(user);

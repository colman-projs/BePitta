import { createContext } from 'react';

let globalContext = {
    loadingApp: false,
    setIsLoadingApp: () => {},
};

export const GlobalContext = createContext(globalContext);

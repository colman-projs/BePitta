import { createContext } from 'react';

let adminContext = {
    isAdmin: false,
    setIsAdmin: () => {},
};

export const AdminContext = createContext(adminContext);

import {useState, createContext} from 'react';

export const UserRoleContext = createContext();

export const UserRoleProvider = ({children}) => {
    const [userRole, setUserRole] = useState(null);
    return (
        <UserRoleContext.Provider value ={{userRole, setUserRole}}>
            {children}
        </UserRoleContext.Provider>
    );
};
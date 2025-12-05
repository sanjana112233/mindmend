// import { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(localStorage.getItem('token') || null);
//     const [role, setRole] = useState('admin')
//    //(localStorage.getItem('role') || null);

//     useEffect(() => {
//         if (token) {
//             axios.defaults.headers.common['x-auth-token'] = token;
//             localStorage.setItem('token', token);
//         } else {
//             delete axios.defaults.headers.common['x-auth-token'];
//             localStorage.removeItem('token');
//         }
//     }, [token]);

//     useEffect(() => {
//         if (role) {
//             localStorage.setItem('role', role);
//         } else {
//             localStorage.removeItem('role');
//         }
//     }, [role]);

//     const login = (newToken, newRole) => {
//         setToken(newToken);
//         setRole(newRole);
//     };

//     const logout = () => {
//         setToken(null);
//         setRole(null);
//         setUser(null);
//         localStorage.removeItem('token');
//         localStorage.removeItem('role');
//     };

//     return (
//         <AuthContext.Provider value={{ token, role, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    // 💡 FIX 1: Retrieve role from localStorage on initial load
    const [role, setRole] = useState(localStorage.getItem('role') || null);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['x-auth-token'] = token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common['x-auth-token'];
            localStorage.removeItem('token');
        }
    }, [token]);

    useEffect(() => {
        if (role) {
            localStorage.setItem('role', role);
        } else {
            localStorage.removeItem('role');
        }
    }, [role]);

    const login = (newToken, newRole) => {
        setToken(newToken);
        setRole(newRole);
    };

    const logout = () => {
        setToken(null);
        setRole(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    };

    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
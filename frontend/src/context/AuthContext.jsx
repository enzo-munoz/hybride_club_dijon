import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                localStorage.setItem('token', token);
                try {
                    const response = await axios.get('http://localhost:8000/api/auth/me');
                    setUser(response.data);
                } catch (error) {
                    console.error('Failed to fetch user', error);
                    setToken(null);
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['Authorization'];
                }
            } else {
                delete axios.defaults.headers.common['Authorization'];
                localStorage.removeItem('token');
                setUser(null);
            }
            setLoading(false);
        };

        initAuth();
    }, [token]);

    const login = async (email, password) => {
        const response = await axios.post('http://localhost:8000/api/auth/login', { email, password });
        const newToken = response.data.access_token;
        setToken(newToken);
        return newToken; 
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

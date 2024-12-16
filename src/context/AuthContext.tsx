import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';
import API from '@/api/api';

interface AuthContextType {
    user: any;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token) as any;
                setUser(decoded);
            } catch (error) {
                console.error('Failed to decode token', error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const response = await API.post('/login', { username, password });
            const { token } = response.data;

            localStorage.setItem('token', token);
            const decoded = jwtDecode(token) as any;
            setUser(decoded);

            router.push('/dashboard');
        } catch (error: any) {
            console.error('Login failed:', error.response.data.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
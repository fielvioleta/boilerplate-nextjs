import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';
import GlobalLoading from '@/components/GlobalLoading';

const AuthContext = createContext<any | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

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
        } else {
            router.push('/');
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setIsLoading }}>
            <GlobalLoading isLoading={isLoading} />
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): any => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
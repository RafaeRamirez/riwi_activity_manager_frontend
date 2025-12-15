'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api/apiService';

interface User {
    id: string;
    nombre: string;
    email: string;
    rol: 'coder' | 'organizador' | 'admin';
    sede: string;
    iniciales?: string;
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (token && storedUser) {
                // Verificar si el token sigue siendo válido
                const userData = await authAPI.getCurrentUser(token);
                setUser(userData);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Error verificando autenticación:', error);
            // Token inválido, limpiar storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                await authAPI.logout(token);
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        } finally {
            // Limpiar storage y estado
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            router.push('/login');
        }
    };

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        logout,
        checkAuth
    };
}
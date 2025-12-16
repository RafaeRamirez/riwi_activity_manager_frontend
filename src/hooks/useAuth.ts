'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api/apiService';

interface User {
    id: string;
    email: string;
    nombre: string;
    role: 'coder' | 'organizer' | 'admin';
    sede: string;
    iniciales?: string;
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isHydrated, setIsHydrated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Marcar que el componente está hidratado (en el cliente)
        setIsHydrated(true);
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            // Solo acceder a localStorage después de hidratación
            if (typeof window === 'undefined') {
                console.log('⚠️ Ejecutando en servidor, saltando checkAuth');
                setIsLoading(false);
                return;
            }

            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            console.log('🔍 Verificando auth. Token:', token ? 'EXISTS (' + token.substring(0, 20) + '...)' : 'NO EXISTE', 'User:', storedUser ? 'EXISTS' : 'NO EXISTE');

            if (token && storedUser) {
                // Usar el usuario almacenado en lugar de hacer una llamada al backend
                // esto evita recargas innecesarias durante el login
                try {
                    const userData = JSON.parse(storedUser);
                    console.log('✅ Usuario cargado desde localStorage:', userData);
                    setUser(userData);
                } catch (e) {
                    // Si hay error parseando, limpiar storage
                    console.error('❌ Error parseando usuario:', e);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setUser(null);
                }
            } else {
                console.log('⚠️ No hay token o usuario en localStorage');
                setUser(null);
            }
        } catch (error) {
            console.error('Error verificando autenticación:', error);
            // Token inválido, limpiar storage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
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
        isHydrated,
        isAuthenticated: !!user,
        logout,
        checkAuth
    };
}
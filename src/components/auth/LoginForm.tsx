'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { authAPI } from '@/lib/api/apiService';

export function LoginForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Limpiar error del campo cuando el usuario escribe
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};

        if (!formData.email) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            console.log('🔄 Iniciando sesión...');

            // Llamada al endpoint de login
            const response = await authAPI.login(formData.email, formData.password);

            console.log('✅ Login exitoso:', response);

            // Guardar el token en localStorage
            if (response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
            }

            // Redirigir según el rol del usuario
            const userRole = response.user?.rol || 'coder';

            switch (userRole.toLowerCase()) {
                case 'admin':
                    router.push('/admin');
                    break;
                case 'organizador':
                    router.push('/organizador');
                    break;
                case 'coder':
                default:
                    router.push('/coder');
                    break;
            }

        } catch (error: any) {
            console.error('❌ Error en login:', error);

            // Manejar errores específicos
            if (error.message?.includes('Credenciales')) {
                setErrors({
                    email: 'Email o contraseña incorrectos',
                    password: 'Verifica tus credenciales'
                });
            } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
                setErrors({
                    email: 'Error de conexión. Verifica tu internet.'
                });
            } else {
                setErrors({
                    email: error.message || 'Error al iniciar sesión. Intenta de nuevo.'
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Ingresa tu email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    autoComplete="email"
                />

                <Input
                    label="Contraseña"
                    type="password"
                    name="password"
                    placeholder="Ingresa tu contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    autoComplete="current-password"
                />

                <Button
                    type="submit"
                    fullWidth
                    isLoading={isLoading}
                    className="mt-6 bg-riwi-violet text-white hover:opacity-90 active:scale-95"
                >
                    {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
            </form>

            <div className="text-center">
                <p className="text-sm text-gray-600">
                    ¿No tienes cuenta?{' '}
                    <Link href="/register" className="text-riwi-violet font-medium hover:underline">
                        Regístrate
                    </Link>
                </p>
            </div>

            {/* Opcional: Puedes quitar OAuth si no lo vas a usar */}
            {/* 
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">– O –</span>
                </div>
            </div>
            */}
        </div>
    );
}
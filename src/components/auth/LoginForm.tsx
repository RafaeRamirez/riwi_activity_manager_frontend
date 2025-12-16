'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { authAPI } from '@/lib/api/apiService';
import { mockUsers } from '@/lib/mockData';

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

            // Buscar usuario en datos mock primero
            const mockUser = mockUsers.find(
                u => u.email === formData.email && u.password === formData.password
            );

            let response;
            if (mockUser) {
                console.log('📦 Usuario encontrado en datos mock');
                response = mockUser;
            } else {
                console.log('🌐 Intentando con API...');
                // Llamada al endpoint de login
                response = await authAPI.login(formData.email, formData.password);
            }

            console.log('✅ Login exitoso:', response);

            // Mapear los datos del backend a la estructura esperada del frontend
            if (response.token && response) {
                console.log('💾 Mapeando datos y guardando en localStorage');
                
                // Extraer iniciales del nombre completo
                const getInitials = (fullName: string) => {
                    return fullName
                        .split(' ')
                        .map(word => word[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 2);
                };

                // Mapear respuesta del backend a estructura del frontend
                const mappedUser = {
                    id: String(response.personId || response.id || ''),
                    email: response.email || '',
                    nombre: response.fullName || response.nombre || '',
                    role: (response.role || 'admin').toLowerCase() as 'coder' | 'organizer' | 'admin',
                    sede: response.sede || 'Barranquilla',
                    iniciales: getInitials(response.fullName || response.nombre || '')
                };

                console.log('📦 Usuario mapeado:', mappedUser);

                const tokenToSave = response.token;
                const userToSave = JSON.stringify(mappedUser);
                
                localStorage.setItem('token', tokenToSave);
                localStorage.setItem('user', userToSave);
                
                // Pequeño delay para asegurar que se escribió
                await new Promise(resolve => setTimeout(resolve, 100));
                
                // Verificar que se guardó correctamente
                const savedToken = localStorage.getItem('token');
                const savedUser = localStorage.getItem('user');
                console.log('✅ Token guardado:', savedToken ? 'SI - ' + savedToken.substring(0, 20) + '...' : 'NO');
                console.log('✅ Usuario guardado:', savedUser ? 'SI' : 'NO');
                
                if (!savedToken || !savedUser) {
                    throw new Error('No se pudo guardar la sesión en localStorage');
                }
            }

            // Redirigir según el rol del usuario
            const userRole = response.role?.toLowerCase() || 'admin';
            console.log('🎯 Role del usuario:', userRole);

            // Pequeño delay adicional antes de redirigir
            await new Promise(resolve => setTimeout(resolve, 200));

            switch (userRole) {
                case 'admin':
                    console.log('➡️ Redirigiendo a /admin');
                    router.push('/admin');
                    break;
                case 'organizer':
                    console.log('➡️ Redirigiendo a /organizer');
                    router.push('/organizer');
                    break;
                case 'coder':
                default:
                    console.log('➡️ Redirigiendo a /coder');
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
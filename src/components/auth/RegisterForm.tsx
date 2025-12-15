'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from "@/components/ui/Input";
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { authAPI } from '@/lib/api/apiService';

const locationOptions = [
    { value: 'Barranquilla', label: 'Barranquilla' },
    { value: 'Medellín', label: 'Medellín' }
];

interface FormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    location: string;
    telefono?: string;
    cohorte?: string;
}

interface FormErrors {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    location?: string;
    telefono?: string;
    cohorte?: string;
}

export function RegisterForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        location: '',
        telefono: '',
        cohorte: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Limpiar error del campo cuando el usuario escribe
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Validar nombre completo
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'El nombre completo es requerido';
        } else if (formData.fullName.trim().length < 3) {
            newErrors.fullName = 'El nombre debe tener al menos 3 caracteres';
        }

        // Validar email
        if (!formData.email) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        // Validar contraseña
        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        // Validar confirmación de contraseña
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirma tu contraseña';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }

        // Validar ubicación
        if (!formData.location) {
            newErrors.location = 'Selecciona una sede';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            console.log('🔄 Registrando usuario...');

            // Preparar datos para el backend
            const userData = {
                nombre: formData.fullName,
                email: formData.email,
                password: formData.password,
                sede: formData.location,
                cohorte: formData.cohorte || undefined,
                telefono: formData.telefono || undefined,
            };

            // Llamada al endpoint de registro
            const response = await authAPI.register(userData);

            console.log('✅ Registro exitoso:', response);

            // Mostrar mensaje de éxito
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');

            // Redirigir al login
            router.push('/login');

        } catch (error: any) {
            console.error('❌ Error en registro:', error);

            // Manejar errores específicos
            if (error.message?.includes('email')) {
                setErrors({
                    email: 'Este email ya está registrado'
                });
            } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
                setErrors({
                    email: 'Error de conexión. Verifica tu internet.'
                });
            } else {
                setErrors({
                    email: error.message || 'Error al registrar. Intenta de nuevo.'
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md space-y-2">
            <form onSubmit={handleSubmit} className="space-y-1">
                <Input
                    label="Nombre Completo"
                    type="text"
                    name="fullName"
                    placeholder="Ingresa tu nombre completo"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                    autoComplete="name"
                />

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

                <Select
                    label="Sede"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    options={locationOptions}
                    placeholder="Selecciona tu sede"
                    error={errors.location}
                />

                <Input
                    label="Cohorte (Opcional)"
                    type="text"
                    name="cohorte"
                    placeholder="Ej: Cohorte 15"
                    value={formData.cohorte}
                    onChange={handleChange}
                    error={errors.cohorte}
                />

                <Input
                    label="Teléfono (Opcional)"
                    type="tel"
                    name="telefono"
                    placeholder="Ej: +57 300 123 4567"
                    value={formData.telefono}
                    onChange={handleChange}
                    error={errors.telefono}
                />

                <Input
                    label="Contraseña"
                    type="password"
                    name="password"
                    placeholder="Crea una contraseña segura"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    autoComplete="new-password"
                />

                <Input
                    label="Confirmar Contraseña"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirma tu contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    autoComplete="new-password"
                />

                <Button
                    type="submit"
                    fullWidth
                    isLoading={isLoading}
                    className="mt-6 bg-riwi-violet"
                >
                    {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                </Button>
            </form>

            <div className="text-center">
                <p className="text-sm text-gray-600">
                    ¿Ya tienes cuenta?{' '}
                    <Link href="/login" className="text-riwi-violet font-medium hover:underline">
                        Inicia Sesión
                    </Link>
                </p>
            </div>
        </div>
    );
}
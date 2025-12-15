'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('coder' | 'organizador' | 'admin')[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // Si no hay usuario, redirigir a login
      if (!user) {
        router.push('/login');
        return;
      }

      // Si hay roles permitidos y el usuario no tiene el rol adecuado
      if (allowedRoles && !allowedRoles.includes(user.rol)) {
        // Redirigir según su rol
        switch (user.rol) {
          case 'admin':
            router.push('/admin');
            break;
          case 'organizador':
            router.push('/organizer');
            break;
          case 'coder':
          default:
            router.push('/coder');
            break;
        }
      }
    }
  }, [user, isLoading, allowedRoles, router]);

  // Mostrar loading mientras verifica
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-riwi-violet mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario, no renderizar nada (se está redirigiendo)
  if (!user) {
    return null;
  }

  // Si hay roles permitidos y el usuario no tiene el rol adecuado
  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    return null;
  }

  // Usuario autenticado y con permisos
  return <>{children}</>;
}
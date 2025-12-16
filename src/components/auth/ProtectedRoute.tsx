'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('coder' | 'organizer' | 'admin')[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading, isHydrated } = useAuth();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (isHydrated && !isLoading) {
      // Si no hay usuario, redirigir a login
      if (!user) {
        console.log('❌ No hay usuario, redirigiendo a login');
        router.push('/login');
        setIsCheckingAuth(false);
        return;
      }

      // Si hay roles permitidos y el usuario no tiene el rol adecuado
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirigir según su rol
        console.log('⚠️ Usuario sin rol permitido, redirigiendo. User role:', user.role, 'Allowed roles:', allowedRoles);
        switch (user.role) {
          case 'admin':
            router.push('/admin');
            break;
          case 'organizer':
            router.push('/organizer');
            break;
          case 'coder':
          default:
            router.push('/coder');
            break;
        }
        setIsCheckingAuth(false);
        return;
      }

      // Usuario autenticado y con permisos
      setIsCheckingAuth(false);
    }
  }, [user, isLoading, isHydrated, allowedRoles, router]);

  // Mostrar loading mientras verifica
  if (!isHydrated || isLoading || isCheckingAuth) {
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
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null;
  }

  // Usuario autenticado y con permisos
  return <>{children}</>;
}
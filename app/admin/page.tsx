'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { useAuth } from '@/hooks/useAuth';

export default function AdminPage() {
    const { user } = useAuth();

    return (
        <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard
                userName={user?.nombre || 'Admin'}
                userInitials={user?.iniciales || 'AD'}
                userRole="admin"
            />
        </ProtectedRoute>
    );
}
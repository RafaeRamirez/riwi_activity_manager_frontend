'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { OrganizerDashboard } from '@/components/organizer/OrganizerDashboard';
import { useAuth } from '@/hooks/useAuth';

export default function OrganizadorPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={['organizer']}>
      <OrganizerDashboard
        userName={user?.sede || 'Sede'}
        userInitials={user?.iniciales || 'US'}
        userRole="organizer"
        sede={user?.sede || 'Barranquilla'}
      />
    </ProtectedRoute>
  );
}
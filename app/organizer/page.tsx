// app/organizador/page.tsx

import { OrganizerDashboard } from '@/components/organizer/OrganizerDashboard';

export default function OrganizadorPage() {
  return (
    <OrganizerDashboard
      userName="Barranquilla"
      userInitials="YC"
      userRole="organizer"
      sede="Barranquilla"
    />
  );
}

export const metadata = {
  title: 'Dashboard - Organizador',
  description: 'Panel de control del organizador',
};
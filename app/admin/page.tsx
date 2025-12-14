import { AdminDashboard } from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  return (
    <AdminDashboard
      userName="Admin Riwi"
      userInitials="AR"
      userRole="admin"
    />
  );
}

export const metadata = {
  title: 'Dashboard - Admin',
  description: 'Panel de control del administrador',
};
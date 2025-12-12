import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  
  // Si ya está autenticado, redirigir al dashboard
  if (session) {
    redirect('/dashboard')
  }

  return <>{children}</>
}
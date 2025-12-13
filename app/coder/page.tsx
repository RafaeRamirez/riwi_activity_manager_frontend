import { EventosLayout } from '@/components/events/EventLayout';
import type { Event } from '@/types/event';

// Función para obtener eventos desde tu API
async function getEventos(): Promise<Event[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/eventos`, {
      cache: 'no-store', // Para datos dinámicos
      // O next: { revalidate: 60 } // Revalidar cada 60 segundos
    });

    if (!res.ok) {
      throw new Error('Error al cargar eventos');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching eventos:', error);
    return []; // Retorna array vacío si hay error
  }
}

// O si usas una librería como Prisma
// import { prisma } from '@/lib/prisma';
// async function getEventos(): Promise<Evento[]> {
//   return await prisma.evento.findMany({
//     where: {
//       fecha: {
//         gte: new Date() // Solo eventos futuros
//       }
//     },
//     orderBy: {
//       fecha: 'asc'
//     }
//   });
// }

export default async function CoderPage() {
  const eventos = await getEventos();

  return (
    <EventosLayout
      eventos={eventos}
      userName="Barranquilla"
      userInitials="CD"
      userRole="coder"
    />
  );
}

// Metadata opcional
export const metadata = {
  title: 'Eventos - Coder',
  description: 'Próximos eventos para coders',
};
// app/coder/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { EventosLayout } from '@/components/events/EventLayout';
import { inscripcionesService } from '@/lib/inscripcionesService';
import type { Event } from '@/types/event';

export default function CoderPage() {
  const [eventos, setEventos] = useState<Event[]>([]);
  const [eventosInscritos, setEventosInscritos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [eventosData, inscripcionesData] = await Promise.all([
          inscripcionesService.getEventos(),
          inscripcionesService.getInscripciones()
        ]);
        
        setEventos(eventosData);
        setEventosInscritos(inscripcionesData);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    cargarDatos();
  }, []);

  // Manejar inscripción
  const handleInscribir = async (eventoId: string) => {
    const resultado = await inscripcionesService.inscribirse(eventoId);
    
    if (resultado.success) {
      // Actualizar lista de eventos
      const eventosActualizados = await inscripcionesService.getEventos();
      setEventos(eventosActualizados);
      
      // Mostrar mensaje de éxito (puedes usar un toast aquí)
      console.log('✅', resultado.mensaje);
    } else {
      console.error('❌', resultado.mensaje);
      alert(resultado.mensaje);
    }
  };

  // Manejar desinscripción
  const handleDesinscribir = async (eventoId: string) => {
    const resultado = await inscripcionesService.desinscribirse(eventoId);
    
    if (resultado.success) {
      // Actualizar lista de eventos
      const eventosActualizados = await inscripcionesService.getEventos();
      setEventos(eventosActualizados);
      
      // Mostrar mensaje de éxito
      console.log('✅', resultado.mensaje);
    } else {
      console.error('❌', resultado.mensaje);
      alert(resultado.mensaje);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando eventos...</p>
        </div>
      </div>
    );
  }

  return (
    <EventosLayout
      eventos={eventos}
      userName="Barranquilla"
      userInitials="YC"
      userRole="coder"
      eventosInscritosIniciales={eventosInscritos}
      onInscribir={handleInscribir}
      onDesinscribir={handleDesinscribir}
    />
  );
}





// import { EventosLayout } from '@/components/events/EventLayout';
// import type { Event } from '@/types/event';
// import { mockEventos } from '@/lib/mockEvents';

// // Función para obtener eventos desde tu API
// async function getEventos(): Promise<Event[]> {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/eventos`, {
//       cache: 'no-store', // Para datos dinámicos
//       // O next: { revalidate: 60 } // Revalidar cada 60 segundos
//     });

//     if (!res.ok) {
//       throw new Error('Error al cargar eventos');
//     }

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching eventos:', error);
//     return []; // Retorna array vacío si hay error
//   }
// }

// // O si usas una librería como Prisma
// // import { prisma } from '@/lib/prisma';
// // async function getEventos(): Promise<Evento[]> {
// //   return await prisma.evento.findMany({
// //     where: {
// //       fecha: {
// //         gte: new Date() // Solo eventos futuros
// //       }
// //     },
// //     orderBy: {
// //       fecha: 'asc'
// //     }
// //   });
// // }

// export default async function CoderPage() {
//   const eventos = mockEventos //await getEventos();

//   return (
//     <EventosLayout
//       eventos={eventos}
//       userName="Barranquilla"
//       userInitials="CD"
//       userRole="coder"
//     />
//   );
// }

// // Metadata opcional
// export const metadata = {
//   title: 'Eventos - Coder',
//   description: 'Próximos eventos para coders',
// };
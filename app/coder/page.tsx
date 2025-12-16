// app/coder/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { EventosLayout } from '@/components/events/EventLayout';
import { eventosAPI, codersAPI } from '@/lib/api/apiService';
import type { Event } from '@/types/event';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

import { inscripcionesService } from '@/lib/inscripcionesService';

export default function CoderPage() {
    const [eventos, setEventos] = useState<Event[]>([]);
    const [eventosInscritos, setEventosInscritos] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // TODO: Reemplazar con el ID del usuario autenticado (del contexto/sesión)
    const CURRENT_USER_ID = 'USER_ID_FROM_AUTH'; // Obtener de tu sistema de auth
    const { user } = useAuth();
    // Cargar datos iniciales API
    useEffect(() => {
        cargarDatosIniciales();
    }, []);

    // Cargar datos iniciales prueba
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

    const cargarDatosIniciales = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Cargar eventos y inscripciones en paralelo
            const [eventosData, inscripcionesData] = await Promise.all([
                eventosAPI.getAll(),
                codersAPI.getEventosInscritos(CURRENT_USER_ID)
            ]);

            // Convertir fechas a Date objects para que EventList las procese correctamente
            const eventosConFechas = eventosData.map((evento: any) => ({
                ...evento,
                fecha: new Date(evento.fecha)
            }));

            // Extraer solo los IDs de los eventos inscritos
            const inscritosIds = inscripcionesData.map((evento: Event) => evento.id);

            setEventos(eventosConFechas);
            setEventosInscritos(inscritosIds);

            console.log('✅ Datos cargados exitosamente');
            console.log('Eventos:', eventosData.length);
            console.log('Inscritos:', inscritosIds.length);
        } catch (error) {
            console.error('❌ Error cargando datos:', error);
            setError('Error al cargar los eventos. Por favor, intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    // Manejar inscripción a un evento
    const handleInscribir = async (eventoId: string) => {
        try {
            console.log('🔄 Inscribiendo al evento:', eventoId);

            // Llamada al backend para inscribir
            const resultado = await eventosAPI.inscribir(eventoId, CURRENT_USER_ID);

            if (resultado.success || resultado) {
                // Actualizar lista de eventos para reflejar el cambio en inscritos
                const eventosActualizados = await eventosAPI.getAll();
                setEventos(eventosActualizados);

                console.log('✅ Inscripción exitosa');

                // Mostrar mensaje de éxito (puedes usar un toast aquí)
                alert('¡Te has inscrito exitosamente al evento!');
            }
        } catch (error: any) {
            console.error('❌ Error al inscribir:', error);

            // Manejar diferentes tipos de errores
            if (error.message?.includes('lleno')) {
                alert('Lo sentimos, el evento está lleno.');
            } else if (error.message?.includes('inscrito')) {
                alert('Ya estás inscrito en este evento.');
            } else {
                alert('Error al inscribirse al evento. Por favor, intenta de nuevo.');
            }
        }
    };

    // Manejar desinscripción de un evento
    const handleDesinscribir = async (eventoId: string) => {
        try {
            console.log('🔄 Desinscribiendo del evento:', eventoId);

            // Confirmación antes de desinscribir
            const confirmar = window.confirm(
                '¿Estás seguro que deseas desinscribirte de este evento?'
            );

            if (!confirmar) return;

            // Llamada al backend para desinscribir
            const resultado = await eventosAPI.desinscribir(eventoId, CURRENT_USER_ID);

            if (resultado.success || resultado) {
                // Actualizar lista de eventos para reflejar el cambio en inscritos
                const eventosActualizados = await eventosAPI.getAll();
                setEventos(eventosActualizados);

                console.log('✅ Desinscripción exitosa');

                // Mostrar mensaje de éxito
                alert('Te has desinscrito del evento.');
            }
        } catch (error: any) {
            console.error('❌ Error al desinscribir:', error);
            alert('Error al desinscribirse del evento. Por favor, intenta de nuevo.');
        }
    };

    // Estado de carga
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-riwi-violet mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando eventos...</p>
                </div>
            </div>
        );
    }

    // Estado de error
    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
                        <svg
                            className="w-12 h-12 text-red-500 mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h3 className="text-lg font-bold text-red-900 mb-2">Error al cargar</h3>
                        <p className="text-red-700 mb-4">{error}</p>
                        <button
                            onClick={cargarDatosIniciales}
                            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                        >
                            Reintentar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Renderizado principal
    return (
        <ProtectedRoute allowedRoles={['coder']}>
            <EventosLayout
                eventos={eventos}
                userName={user?.nombre || 'Usuario'}
                userInitials={user?.iniciales || 'US'}
                userRole="coder"
                eventosInscritosIniciales={eventosInscritos}
                onInscribir={handleInscribir}
                onDesinscribir={handleDesinscribir}
            />
        </ProtectedRoute>
    );
}

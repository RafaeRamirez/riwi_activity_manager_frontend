// components/organizador/InscritosModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { eventosAPI } from '@/lib/api/apiService';
import type { Event } from '@/types/event';

interface Inscrito {
    id: string;
    nombre: string;
    email: string;
    cohorte: string;
    fechaInscripcion: Date;
}

interface InscritosModalProps {
    evento: Event;
    onClose: () => void;
}

export function InscritosModal({ evento, onClose }: InscritosModalProps) {
    const [inscritos, setInscritos] = useState<Inscrito[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        cargarInscritos();
    }, [evento.id]);

    const cargarInscritos = async () => {
        try {
            // REEMPLAZAR: datos mock por llamada a API
            const data = await eventosAPI.getInscritos(evento.id);
            setInscritos(data);
        } catch (error) {
            console.error('Error cargando inscritos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDesinscribir = async (inscritoId: string, nombreCoder: string) => {
        if (confirm(`¿Deseas desinscribir a ${nombreCoder} de este evento?`)) {
            try {
                // REEMPLAZAR: filter local por llamada a API
                await eventosAPI.desinscribir(evento.id, inscritoId);

                // Recargar lista
                await cargarInscritos();
                console.log('✅ Coder desinscrito');
            } catch (error) {
                console.error('❌ Error al desinscribir:', error);
                alert('Error al desinscribir');
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="bg-riwi-green p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold">Coders Inscritos</h2>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <h3 className="text-lg font-medium">{evento.titulo}</h3>
                    <p className="text-sm opacity-90 mt-1">
                        {new Date(evento.fecha).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </p>
                </div>

                {/* Contenido */}
                <div className="p-6 flex-1 overflow-y-auto">
                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-riwi-green mx-auto mb-4"></div>
                            <p className="text-gray-600">Cargando inscritos...</p>
                        </div>
                    ) : (
                        <>
                            {/* Estadísticas */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total inscritos</p>
                                    <p className="text-2xl font-bold text-riwi-green">{inscritos.length}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Capacidad</p>
                                    <p className="text-2xl font-bold text-gray-900">{evento.capacidad}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Disponibles</p>
                                    <p className="text-2xl font-bold text-riwi-orange">
                                        {(evento.capacidad || 0) - inscritos.length}
                                    </p>
                                </div>
                            </div>

                            {/* Lista de inscritos */}
                            {inscritos.length > 0 ? (
                                <div className="space-y-3">
                                    {inscritos.map((inscrito) => (
                                        <div
                                            key={inscrito.id}
                                            className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-center gap-3 flex-1">
                                                {/* Avatar */}
                                                <div className="w-12 h-12 rounded-full bg-linear-to-br from-riwi-green to-riwi-yellow flex items-center justify-center text-white font-bold shrink-0">
                                                    {inscrito.nombre.split(' ').map(n => n[0]).join('')}
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-gray-900">{inscrito.nombre}</h4>
                                                    <p className="text-sm text-gray-600">{inscrito.email}</p>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="text-xs bg-riwi-green/10 text-riwi-green px-2 py-1 rounded-full font-medium">
                                                            {inscrito.cohorte}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            Inscrito el {inscrito.fechaInscripcion.toLocaleDateString('es-ES')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Botón desinscribir */}
                                            <button
                                                onClick={() => handleDesinscribir(inscrito.id, inscrito.nombre)}
                                                className="ml-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                                                title="Desinscribir"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <p className="text-gray-500">No hay coders inscritos en este evento</p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
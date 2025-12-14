// components/organizador/EventosManager.tsx
'use client';

import { useState, useEffect } from 'react';
import { mockEventos } from '@/lib/mockEvents';
import { EditarEventoModal } from './EditarEventModal';
import { InscritosModal } from './InscritosModal';
import type { Event } from '@/types/event';

interface EventosManagerProps {
  sede: string;
}

export function EventosManager({ sede }: EventosManagerProps) {
  const [eventos, setEventos] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [eventoEditando, setEventoEditando] = useState<Event | null>(null);
  const [eventoInscritos, setEventoInscritos] = useState<Event | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setEventos(mockEventos);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredEventos = eventos.filter(evento =>
    evento.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evento.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evento.ubicacion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (eventoId: string) => {
    if (confirm('¿Estás seguro de eliminar este evento?')) {
      setEventos(eventos.filter(e => e.id !== eventoId));
      console.log('Evento eliminado:', eventoId);
    }
  };

  const handleSaveEdit = (eventoActualizado: Event) => {
    setEventos(eventos.map(e => e.id === eventoActualizado.id ? eventoActualizado : e));
    setEventoEditando(null);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-riwi-orange mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando eventos...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Gestión de Eventos
          </h2>
          <span className="bg-riwi-orange text-white px-4 py-2 rounded-full font-semibold">
            {eventos.length} eventos
          </span>
        </div>

        {/* Buscador */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por título, descripción o ubicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-orange"
          />
        </div>

        {/* Grid de eventos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto">
          {filteredEventos.map((evento) => {
            const fecha = new Date(evento.fecha);
            const fechaFormato = fecha.toLocaleDateString('es-ES', { 
              day: '2-digit', 
              month: 'long',
              year: 'numeric'
            });

            return (
              <div 
                key={evento.id} 
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative"
              >
                {/* Botones de acción */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => setEventoInscritos(evento)}
                    className="p-2 bg-riwi-green hover:opacity-90 text-white rounded-lg transition-opacity"
                    title="Ver inscritos"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setEventoEditando(evento)}
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    title="Editar evento"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(evento.id)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    title="Eliminar evento"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Contenido de la card */}
                <div className="pr-32">
                  <p className="text-sm text-gray-600 mb-1">{fechaFormato}</p>
                  <h3 className="font-bold text-lg mb-2">{evento.titulo}</h3>
                  
                  {evento.ubicacion && (
                    <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {evento.ubicacion}
                    </p>
                  )}

                  {evento.modalidad && (
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                      evento.modalidad === 'Virtual' ? 'bg-blue-100 text-blue-800' :
                      evento.modalidad === 'Presential' ? 'bg-riwi-green/20 text-riwi-green' :
                      'bg-riwi-purple/20 text-riwi-violet'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {evento.modalidad}
                    </span>
                  )}

                  <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                    {evento.descripcion}
                  </p>

                  {/* Capacidad */}
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-riwi-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="font-semibold text-riwi-violet">
                      {evento.inscritos} / {evento.capacidad}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredEventos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron eventos</p>
          </div>
        )}
      </div>

      {/* Modales */}
      {eventoEditando && (
        <EditarEventoModal
          evento={eventoEditando}
          onClose={() => setEventoEditando(null)}
          onSave={handleSaveEdit}
        />
      )}

      {eventoInscritos && (
        <InscritosModal
          evento={eventoInscritos}
          onClose={() => setEventoInscritos(null)}
        />
      )}
    </>
  );
}
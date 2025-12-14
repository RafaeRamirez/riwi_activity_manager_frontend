// components/admin/AdminEventosList.tsx
'use client';

import { useState, useEffect } from 'react';
import { mockEventos } from '@/lib/mockEvents';
import { EditarEventoModal } from '../organizer/EditarEventModal';
import { InscritosModal } from '../organizer/InscritosModal';
import { CrearEvento } from '../organizer/CreateEvents';
import type { Event } from '@/types/event';

export function AdminEventosList() {
  const [eventos, setEventos] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sedeFilter, setSedeFilter] = useState<string>('todas');
  const [isLoading, setIsLoading] = useState(true);
  const [eventoEditando, setEventoEditando] = useState<Event | null>(null);
  const [eventoInscritos, setEventoInscritos] = useState<Event | null>(null);
  const [showCrearEvento, setShowCrearEvento] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      // Agregar sede a los eventos mock
      const eventosConSede = mockEventos.map((evento, index) => ({
        ...evento,
        sede: index % 2 === 0 ? 'Barranquilla' : 'Medellín'
      }));
      setEventos(eventosConSede as any);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredEventos = eventos.filter((evento: any) => {
    const matchesSearch = evento.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evento.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSede = sedeFilter === 'todas' || evento.sede === sedeFilter;
    return matchesSearch && matchesSede;
  });

  const handleDelete = (eventoId: string) => {
    if (confirm('¿Estás seguro de eliminar este evento?')) {
      setEventos(eventos.filter(e => e.id !== eventoId));
    }
  };

  const handleSaveEdit = (eventoActualizado: Event) => {
    setEventos(eventos.map(e => e.id === eventoActualizado.id ? eventoActualizado : e));
    setEventoEditando(null);
  };

  const eventosBarranquilla = eventos.filter((e: any) => e.sede === 'Barranquilla').length;
  const eventosMedellin = eventos.filter((e: any) => e.sede === 'Medellín').length;

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-riwi-orange mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando eventos...</p>
      </div>
    );
  }

  if (showCrearEvento) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <button
          onClick={() => setShowCrearEvento(false)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a la lista
        </button>
        <CrearEvento onEventoCreado={() => setShowCrearEvento(false)} />
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gestión de Eventos</h2>
            <p className="text-sm text-gray-600 mt-1">
              Barranquilla: {eventosBarranquilla} • Medellín: {eventosMedellin}
            </p>
          </div>
          <button
            onClick={() => setShowCrearEvento(true)}
            className="flex items-center gap-2 bg-riwi-orange hover:opacity-90 text-white font-semibold px-6 py-3 rounded-lg transition-opacity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Crear Evento
          </button>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar por título o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-orange"
          />
          <select
            value={sedeFilter}
            onChange={(e) => setSedeFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-orange"
          >
            <option value="todas">Todas las sedes</option>
            <option value="Barranquilla">Barranquilla</option>
            <option value="Medellín">Medellín</option>
          </select>
        </div>

        {/* Grid de eventos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto">
          {filteredEventos.map((evento: any) => {
            const fecha = new Date(evento.fecha);
            const fechaFormato = fecha.toLocaleDateString('es-ES', { 
              day: '2-digit', 
              month: 'short',
              year: 'numeric'
            });

            return (
              <div 
                key={evento.id} 
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative"
              >
                {/* Sede badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-xs bg-riwi-orange/20 text-riwi-orange px-2 py-1 rounded-full font-medium">
                    {evento.sede}
                  </span>
                </div>

                {/* Botones de acción */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => setEventoInscritos(evento)}
                    className="p-1.5 bg-riwi-green hover:opacity-90 text-white rounded-lg transition-opacity"
                    title="Ver inscritos"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setEventoEditando(evento)}
                    className="p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    title="Editar"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(evento.id)}
                    className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Contenido */}
                <div className="mt-8">
                  <p className="text-sm text-gray-600 mb-1">{fechaFormato}</p>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{evento.titulo}</h3>
                  
                  {evento.modalidad && (
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full mb-2 ${
                      evento.modalidad === 'Virtual' ? 'bg-blue-100 text-blue-800' :
                      evento.modalidad === 'Presencial' ? 'bg-riwi-green/20 text-riwi-green' :
                      'bg-riwi-purple/20 text-riwi-violet'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {evento.modalidad}
                    </span>
                  )}

                  <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                    {evento.descripcion}
                  </p>

                  {/* Capacidad */}
                  <div className="flex items-center gap-2 text-sm">
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
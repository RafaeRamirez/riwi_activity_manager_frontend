// components/admin/AdminEventosList.tsx
'use client';

import { useState, useEffect } from 'react';
import { eventosAPI } from '@/lib/api/apiService';
import { mockEventos } from '@/lib/mockData';
import { EditarEventoModal } from '../organizer/EditarEventModal';
import { InscritosModal } from '../organizer/InscritosModal';
import { CrearEvento } from '../organizer/CreateEvents';
import type { Event } from '@/types/event';

interface EventoConSede extends Event {
  sede?: string;
}

export function AdminEventosList() {
  const [eventos, setEventos] = useState<EventoConSede[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sedeFilter, setSedeFilter] = useState<string>('todas');
  const [isLoading, setIsLoading] = useState(true);
  const [eventoEditando, setEventoEditando] = useState<EventoConSede | null>(null);
  const [eventoInscritos, setEventoInscritos] = useState<EventoConSede | null>(null);
  const [showCrearEvento, setShowCrearEvento] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar eventos al montar el componente
  useEffect(() => {
    cargarEventos();
  }, []);

  // Función para cargar eventos desde la API
  const cargarEventos = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('🔄 Cargando eventos...');

      // Llamada a la API
      let data;
      try {
        data = await eventosAPI.getAll();
      } catch (apiError) {
        console.warn('⚠️ API no disponible, usando datos mock');
        data = mockEventos;
      }
      
      // Convertir fechas de string a Date si es necesario
      const eventosConFechas = data.map((evento: any) => ({
        ...evento,
        fecha: new Date(evento.fecha)
      }));

      setEventos(eventosConFechas);
      console.log('✅ Eventos cargados:', eventosConFechas.length);
    } catch (error: any) {
      console.error('❌ Error cargando eventos:', error);
      setError('Error al cargar los eventos. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrar eventos según búsqueda y sede
  const filteredEventos = eventos.filter((evento) => {
    if (!evento) return false; // Validación de seguridad
    const matchesSearch = (evento.titulo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (evento.descripcion || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (evento.ubicacion || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSede = sedeFilter === 'todas' || evento.sede === sedeFilter;
    return matchesSearch && matchesSede;
  });

  // Manejar eliminación de evento
  const handleDelete = async (eventoId: string, tituloEvento: string) => {
    if (!confirm(`¿Estás seguro de eliminar el evento "${tituloEvento}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      console.log('🔄 Eliminando evento:', eventoId);

      // Llamada a la API para eliminar
      await eventosAPI.delete(eventoId);

      console.log('✅ Evento eliminado exitosamente');
      
      // Recargar lista de eventos
      await cargarEventos();

      alert('Evento eliminado exitosamente');
    } catch (error: any) {
      console.error('❌ Error al eliminar evento:', error);
      
      // Manejar errores específicos
      if (error.message?.includes('inscritos')) {
        alert('No se puede eliminar este evento porque tiene coders inscritos.');
      } else {
        alert('Error al eliminar el evento. Por favor, intenta de nuevo.');
      }
    }
  };

  // Manejar actualización de evento
  const handleSaveEdit = async (eventoActualizado: EventoConSede) => {
    try {
      console.log('🔄 Actualizando evento:', eventoActualizado.id);

      // Llamada a la API para actualizar
      await eventosAPI.update(eventoActualizado.id, eventoActualizado);

      console.log('✅ Evento actualizado exitosamente');
      
      // Recargar lista de eventos
      await cargarEventos();

      // Cerrar modal
      setEventoEditando(null);

      alert('Evento actualizado exitosamente');
    } catch (error: any) {
      console.error('❌ Error al actualizar evento:', error);
      alert('Error al actualizar el evento. Por favor, intenta de nuevo.');
    }
  };

  // Manejar creación de evento
  const handleEventoCreado = async () => {
    console.log('✅ Evento creado, recargando lista...');
    
    // Recargar lista de eventos
    await cargarEventos();
    
    // Cerrar vista de crear evento
    setShowCrearEvento(false);
  };

  // Calcular estadísticas
  const eventosBarranquilla = eventos.filter(e => e.sede === 'Barranquilla').length;
  const eventosMedellin = eventos.filter(e => e.sede === 'Medellín').length;
  const eventosPasados = eventos.filter(e => new Date(e.fecha) < new Date()).length;
  const eventosProximos = eventos.filter(e => new Date(e.fecha) >= new Date()).length;

  // Estado de carga
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-riwi-orange mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando eventos...</p>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
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
            onClick={cargarEventos}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Vista de crear evento
  if (showCrearEvento) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <button
          onClick={() => setShowCrearEvento(false)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a la lista
        </button>
        <CrearEvento onEventoCreado={handleEventoCreado} />
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
              Barranquilla: {eventosBarranquilla} • Medellín: {eventosMedellin} • Próximos: {eventosProximos} • Pasados: {eventosPasados}
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
            placeholder="Buscar por título, descripción o ubicación..."
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
          {filteredEventos.map((evento) => {
            const fecha = new Date(evento.fecha);
            const fechaFormato = fecha.toLocaleDateString('es-ES', { 
              day: '2-digit', 
              month: 'short',
              year: 'numeric'
            });
            const isPasado = fecha < new Date();

            return (
              <div 
                key={evento.id} 
                className={`border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative ${
                  isPasado ? 'opacity-60' : ''
                }`}
              >
                {/* Badges superiores */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {evento.sede && (
                    <span className="text-xs bg-riwi-orange/20 text-riwi-orange px-2 py-1 rounded-full font-medium">
                      {evento.sede}
                    </span>
                  )}
                  {isPasado && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full font-medium">
                      Finalizado
                    </span>
                  )}
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
                    onClick={() => handleDelete(evento.id, evento.titulo)}
                    className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {/* Contenido */}
                <div className="mt-10">
                  <p className="text-sm text-gray-600 mb-1">{fechaFormato}</p>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{evento.titulo}</h3>
                  
                  {evento.ubicacion && (
                    <p className="text-sm text-gray-600 mb-2 flex items-center gap-1 line-clamp-1">
                      <svg className="w-4 h-4 hrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {evento.ubicacion}
                    </p>
                  )}

                  {evento.modalidad && (
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full mb-2 ${
                      evento.modalidad === 'Virtual' ? 'bg-blue-100 text-blue-800' :
                      evento.modalidad === 'Presential' ? 'bg-riwi-green/20 text-riwi-green' :
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-riwi-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="font-semibold text-riwi-violet">
                        {evento.inscritos} / {evento.capacidad}
                      </span>
                    </div>
                    {evento.inscritos === evento.capacidad && (
                      <span className="text-xs text-red-600 font-medium">
                        Lleno
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredEventos.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500">No se encontraron eventos</p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-2 text-riwi-orange hover:underline"
              >
                Limpiar búsqueda
              </button>
            )}
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
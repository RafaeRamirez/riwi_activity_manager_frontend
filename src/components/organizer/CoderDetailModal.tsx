// components/organizador/CoderDetailModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { codersAPI, eventosAPI } from '@/lib/api/apiService';

interface Coder {
  id: string;
  nombre: string;
  email: string;
  sede: string;
  cohorte: string;
  fechaIngreso: Date;
  telefono?: string;
}

interface EventoInscrito {
  id: string;
  titulo: string;
  fecha: Date;
  asistio?: boolean;
}

interface CoderDetailModalProps {
  coder: Coder;
  onClose: () => void;
  onUpdate: (coder: Coder) => void;
}

export function CoderDetailModal({ coder, onClose, onUpdate }: CoderDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(coder);
  const [activeTab, setActiveTab] = useState<'info' | 'eventos' | 'historial'>('info');
  const [eventosInscritos, setEventosInscritos] = useState<EventoInscrito[]>([]);
  const [historial, setHistorial] = useState<EventoInscrito[]>([]);
  const [isLoadingEventos, setIsLoadingEventos] = useState(false);
  const [isLoadingHistorial, setIsLoadingHistorial] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Cargar eventos inscritos cuando se abre el tab
  useEffect(() => {
    if (activeTab === 'eventos') {
      cargarEventosInscritos();
    } else if (activeTab === 'historial') {
      cargarHistorial();
    }
  }, [activeTab]);

  const cargarEventosInscritos = async () => {
    try {
      setIsLoadingEventos(true);

      console.log('🔄 Cargando eventos inscritos del coder:', coder.id);

      const data = await codersAPI.getEventosInscritos(coder.id);
      
      // Convertir fechas y filtrar solo futuros
      const eventosConFechas = data
        .map((evento: any) => ({
          ...evento,
          fecha: new Date(evento.fecha),
          asistio: false
        }))
        .filter((evento: EventoInscrito) => evento.fecha >= new Date());

      setEventosInscritos(eventosConFechas);
      console.log('✅ Eventos inscritos:', eventosConFechas.length);
    } catch (error) {
      console.error('❌ Error cargando eventos inscritos:', error);
    } finally {
      setIsLoadingEventos(false);
    }
  };

  const cargarHistorial = async () => {
    try {
      setIsLoadingHistorial(true);

      console.log('🔄 Cargando historial del coder:', coder.id);

      const data = await codersAPI.getHistorial(coder.id);
      
      // Convertir fechas
      const historialConFechas = data.map((evento: any) => ({
        ...evento,
        fecha: new Date(evento.fecha)
      }));

      setHistorial(historialConFechas);
      console.log('✅ Historial cargado:', historialConFechas.length);
    } catch (error) {
      console.error('❌ Error cargando historial:', error);
    } finally {
      setIsLoadingHistorial(false);
    }
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleDesinscribir = async (eventoId: string, eventoTitulo: string) => {
    if (!confirm(`¿Deseas desinscribir a este coder del evento "${eventoTitulo}"?`)) {
      return;
    }

    try {
      console.log('🔄 Desinscribiendo del evento:', eventoId);

      await eventosAPI.desinscribir(eventoId, coder.id);

      console.log('✅ Desinscrito exitosamente');
      
      // Recargar eventos inscritos
      await cargarEventosInscritos();

      alert('Coder desinscrito exitosamente');
    } catch (error) {
      console.error('❌ Error al desinscribir:', error);
      alert('Error al desinscribir del evento');
    }
  };

  const asistencias = historial.filter(e => e.asistio).length;
  const faltas = historial.filter(e => !e.asistio).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-linear-to-r from-riwi-green to-riwi-yellow p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                {coder.nombre.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{coder.nombre}</h2>
                <p className="text-sm opacity-90">{coder.email}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    {coder.cohorte}
                  </span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    {coder.sede}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'info'
                  ? 'text-riwi-green border-b-2 border-riwi-green'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Información
            </button>
            <button
              onClick={() => setActiveTab('eventos')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'eventos'
                  ? 'text-riwi-green border-b-2 border-riwi-green'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Eventos Inscritos ({eventosInscritos.length})
            </button>
            <button
              onClick={() => setActiveTab('historial')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'historial'
                  ? 'text-riwi-green border-b-2 border-riwi-green'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Historial
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Tab: Información */}
          {activeTab === 'info' && (
            <div className="space-y-4">
              {!isEditing ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Nombre Completo</label>
                      <p className="font-semibold">{coder.nombre}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Email</label>
                      <p className="font-semibold">{coder.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Teléfono</label>
                      <p className="font-semibold">{coder.telefono || 'No registrado'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Sede</label>
                      <p className="font-semibold">{coder.sede}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Cohorte</label>
                      <p className="font-semibold">{coder.cohorte}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Fecha de Ingreso</label>
                      <p className="font-semibold">
                        {coder.fechaIngreso.toLocaleDateString('es-ES', { 
                          day: '2-digit', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                  >
                    Editar Información
                  </button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre Completo
                      </label>
                      <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-green"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-green"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={formData.telefono || ''}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-green"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cohorte
                      </label>
                      <input
                        type="text"
                        value={formData.cohorte}
                        onChange={(e) => setFormData({ ...formData, cohorte: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-green"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-riwi-green hover:opacity-90 text-white font-medium rounded-lg transition-opacity"
                    >
                      Guardar Cambios
                    </button>
                    <button
                      onClick={() => {
                        setFormData(coder);
                        setIsEditing(false);
                      }}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab: Eventos Inscritos */}
          {activeTab === 'eventos' && (
            <div className="space-y-3">
              {isLoadingEventos ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-riwi-green mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Cargando...</p>
                </div>
              ) : eventosInscritos.length > 0 ? (
                eventosInscritos.map((evento) => (
                  <div 
                    key={evento.id}
                    className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-bold text-gray-900">{evento.titulo}</h4>
                      <p className="text-sm text-gray-600">
                        {evento.fecha.toLocaleDateString('es-ES', { 
                          day: '2-digit', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDesinscribir(evento.id, evento.titulo)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                      title="Desinscribir"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">No está inscrito en ningún evento próximo</p>
              )}
            </div>
          )}

          {/* Tab: Historial */}
          {activeTab === 'historial' && (
            <div>
              {isLoadingHistorial ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-riwi-green mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Cargando...</p>
                </div>
              ) : (
                <>
                  {/* Estadísticas */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-gray-900">{historial.length}</p>
                      <p className="text-sm text-gray-600">Total eventos</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-green-600">{asistencias}</p>
                      <p className="text-sm text-gray-600">Asistencias</p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-red-600">{faltas}</p>
                      <p className="text-sm text-gray-600">Faltas</p>
                    </div>
                  </div>

                  {/* Lista de eventos pasados */}
                  {historial.length > 0 ? (
                    <div className="space-y-2">
                      {historial.map((evento) => (
                        <div 
                          key={evento.id}
                          className="border border-gray-200 rounded-lg p-3 flex items-center justify-between"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{evento.titulo}</h4>
                            <p className="text-sm text-gray-600">
                              {evento.fecha.toLocaleDateString('es-ES', { 
                                day: '2-digit', 
                                month: 'short', 
                                year: 'numeric' 
                              })}
                            </p>
                          </div>
                          {evento.asistio ? (
                            <span className="flex items-center gap-1 text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Asistió
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-sm bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                              Faltó
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-8">No hay historial de eventos</p>
                  )}
                </>
              )}
            </div>
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
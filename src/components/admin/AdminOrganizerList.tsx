'use client';

import { useState, useEffect } from 'react';
import { organizadoresAPI } from '@/lib/api/apiService';
import { mockOrganizadores } from '@/lib/mockData';
import { OrganizadorFormModal } from './OrganizadorFormModal';

interface Organizador {
  id: string;
  nombre: string;
  email: string;
  sede: string;
  fechaIngreso: Date;
  telefono?: string;
  rol: string;
}

export function AdminOrganizadoresList() {
  const [organizadores, setOrganizadores] = useState<Organizador[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sedeFilter, setSedeFilter] = useState<string>('todas');
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [organizadorEditando, setOrganizadorEditando] = useState<Organizador | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Cargar organizadores al montar el componente
  useEffect(() => {
    cargarOrganizadores();
  }, []);

  // Función para cargar organizadores desde la API
  const cargarOrganizadores = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('🔄 Cargando organizadores...');

      // Llamada a la API
      let data;
      try {
        data = await organizadoresAPI.getAll();
      } catch (apiError) {
        console.warn('⚠️ API no disponible, usando datos mock');
        data = mockOrganizadores;
      }
      
      // Convertir fechas de string a Date si es necesario
      const organizadoresConFechas = data.map((org: any) => ({
        ...org,
        fechaIngreso: new Date(org.fechaIngreso)
      }));

      setOrganizadores(organizadoresConFechas);
      console.log('✅ Organizadores cargados:', organizadoresConFechas.length);
    } catch (error: any) {
      console.error('❌ Error cargando organizadores:', error);
      setError('Error al cargar los organizadores. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrar organizadores según búsqueda y sede
  const filteredOrganizadores = organizadores.filter(org => {
    const matchesSearch = org.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSede = sedeFilter === 'todas' || org.sede === sedeFilter;
    return matchesSearch && matchesSede;
  });

  // Manejar eliminación de organizador
  const handleDelete = async (orgId: string, nombreOrg: string) => {
    if (!confirm(`¿Estás seguro de eliminar a ${nombreOrg}? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      console.log('🔄 Eliminando organizador:', orgId);

      // Llamada a la API para eliminar
      await organizadoresAPI.delete(orgId);

      console.log('✅ Organizador eliminado exitosamente');
      
      // Recargar lista de organizadores
      await cargarOrganizadores();

      alert('Organizador eliminado exitosamente');
    } catch (error: any) {
      console.error('❌ Error al eliminar organizador:', error);
      
      // Manejar errores específicos
      if (error.message?.includes('eventos')) {
        alert('No se puede eliminar este organizador porque tiene eventos asignados.');
      } else {
        alert('Error al eliminar el organizador. Por favor, intenta de nuevo.');
      }
    }
  };

  // Manejar creación de nuevo organizador
  const handleCreate = async (newOrganizador: Omit<Organizador, 'id'>) => {
    try {
      console.log('🔄 Creando organizador:', newOrganizador);

      // Llamada a la API para crear
      await organizadoresAPI.create(newOrganizador);

      console.log('✅ Organizador creado exitosamente');
      
      // Recargar lista de organizadores
      await cargarOrganizadores();

      // Cerrar modal
      setShowCreateModal(false);

      alert('Organizador creado exitosamente');
    } catch (error: any) {
      console.error('❌ Error al crear organizador:', error);
      
      // Manejar errores específicos
      if (error.message?.includes('email')) {
        alert('El email ya está registrado.');
      } else {
        alert('Error al crear el organizador. Por favor, intenta de nuevo.');
      }
    }
  };

  // Manejar actualización de organizador
  const handleUpdate = async (updatedOrganizador: Organizador) => {
    try {
      console.log('🔄 Actualizando organizador:', updatedOrganizador.id);

      // Llamada a la API para actualizar
      await organizadoresAPI.update(updatedOrganizador.id, updatedOrganizador);

      console.log('✅ Organizador actualizado exitosamente');
      
      // Recargar lista de organizadores
      await cargarOrganizadores();

      // Cerrar modal
      setOrganizadorEditando(null);

      alert('Organizador actualizado exitosamente');
    } catch (error: any) {
      console.error('❌ Error al actualizar organizador:', error);
      alert('Error al actualizar el organizador. Por favor, intenta de nuevo.');
    }
  };

  // Calcular estadísticas
  const organizadoresBarranquilla = organizadores.filter(o => o.sede === 'Barranquilla').length;
  const organizadoresMedellin = organizadores.filter(o => o.sede === 'Medellín').length;
  const coordinadores = organizadores.filter(o => o.rol === 'Coordinador').length;

  // Estado de carga
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-riwi-yellow mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando organizadores...</p>
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
            onClick={cargarOrganizadores}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gestión de Organizadores</h2>
            <p className="text-sm text-gray-600 mt-1">
              Barranquilla: {organizadoresBarranquilla} • Medellín: {organizadoresMedellin} • Coordinadores: {coordinadores}
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-riwi-yellow hover:opacity-90 text-white font-semibold px-6 py-3 rounded-lg transition-opacity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Crear Organizador
          </button>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-yellow"
          />
          <select
            value={sedeFilter}
            onChange={(e) => setSedeFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-yellow"
          >
            <option value="todas">Todas las sedes</option>
            <option value="Barranquilla">Barranquilla</option>
            <option value="Medellín">Medellín</option>
          </select>
        </div>

        {/* Grid de organizadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrganizadores.map((organizador) => (
            <div 
              key={organizador.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-riwi-yellow to-riwi-orange flex items-center justify-center text-white font-bold text-xl">
                  {organizador.nombre.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setOrganizadorEditando(organizador)}
                    className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(organizador.id, organizador.nombre)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-lg text-gray-900 mb-1">{organizador.nombre}</h3>
              <p className="text-sm text-gray-600 mb-3 wrap-break-words">{organizador.email}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rol:</span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    organizador.rol === 'Coordinador' 
                      ? 'bg-purple-100 text-purple-700'
                      : organizador.rol === 'Organizador'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {organizador.rol}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sede:</span>
                  <span className="text-xs bg-riwi-yellow/20 text-riwi-yellow px-2 py-1 rounded-full font-medium">
                    {organizador.sede}
                  </span>
                </div>
                {organizador.telefono && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Teléfono:</span>
                    <span className="text-sm font-medium text-gray-900">{organizador.telefono}</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xs text-gray-500">Desde:</span>
                  <span className="text-xs text-gray-500">
                    {organizador.fechaIngreso.toLocaleDateString('es-ES', { 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrganizadores.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500">No se encontraron organizadores</p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-2 text-riwi-yellow hover:underline"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modales */}
      {showCreateModal && (
        <OrganizadorFormModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreate}
          title="Crear Nuevo Organizador"
        />
      )}

      {organizadorEditando && (
        <OrganizadorFormModal
          organizador={organizadorEditando}
          onClose={() => setOrganizadorEditando(null)}
          onSave={handleUpdate}
          title="Editar Organizador"
        />
      )}
    </>
  );
}
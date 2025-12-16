'use client';

import { useState, useEffect, useRef } from 'react';
import { codersAPI } from '@/lib/api/apiService';
import { mockUsers } from '@/lib/mockData';
import { CoderFormModal } from './CoderFormModal';
import { CoderDetailModal } from '../organizer/CoderDetailModal';

interface Coder {
  id: string;
  nombre: string;
  email: string;
  sede: string;
  cohorte: string;
  fechaIngreso: Date;
  telefono?: string;
}

export function AdminCodersList() {
  const [coders, setCoders] = useState<Coder[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sedeFilter, setSedeFilter] = useState<string>('todas');
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [coderEditando, setCoderEditando] = useState<Coder | null>(null);
  const [coderDetalle, setCoderDetalle] = useState<Coder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  // Cargar coders al montar el componente
  useEffect(() => {
    cargarCoders();
  }, []);

  // Hacer scroll hacia arriba cuando cambia el filtro
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [searchTerm, sedeFilter]);

  // Función para cargar coders desde la API
  const cargarCoders = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('🔄 Cargando coders...');

      // Llamada a la API
      let data;
      try {
        data = await codersAPI.getAll();
      } catch (apiError) {
        console.warn('⚠️ API no disponible, usando datos mock');
        // Mapear mockUsers a estructura de coder, filtrando solo coders
        data = mockUsers
          .filter(u => u.role === 'coder')
          .map(u => ({
            id: u.personId?.toString(),
            nombre: u.fullName,
            email: u.email,
            sede: u.sede || 'Barranquilla',
            cohorte: 'C3-2025',
            fechaIngreso: new Date('2024-01-15'),
            telefono: '3001234567'
          }));
      }

      // Convertir fechas de string a Date si es necesario
      const codersConFechas = data.map((coder: any) => ({
        ...coder,
        fechaIngreso: new Date(coder.fechaIngreso)
      }));

      setCoders(codersConFechas);
      console.log('✅ Coders cargados:', codersConFechas.length);
    } catch (error: any) {
      console.error('❌ Error cargando coders:', error);
      setError('Error al cargar los coders. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrar coders según búsqueda y sede
  const filteredCoders = coders.filter(coder => {
    if (!coder) return false; // Validación de seguridad

    // Filtro de sede
    const matchesSede = sedeFilter === 'todas' || coder.sede === sedeFilter;

    // Filtro de búsqueda - solo aplicar si hay texto en searchTerm
    let matchesSearch = true;
    if (searchTerm.trim() !== '') {
      matchesSearch = (coder.nombre || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (coder.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (coder.cohorte || '').toLowerCase().includes(searchTerm.toLowerCase());
    }

    return matchesSearch && matchesSede;
  });

  // Manejar eliminación de coder
  const handleDelete = async (coderId: string, nombreCoder: string) => {
    if (!confirm(`¿Estás seguro de eliminar a ${nombreCoder}? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      console.log('🔄 Eliminando coder:', coderId);

      // Llamada a la API para eliminar
      await codersAPI.delete(coderId);

      console.log('✅ Coder eliminado exitosamente');

      // Recargar lista de coders
      await cargarCoders();

      alert('Coder eliminado exitosamente');
    } catch (error: any) {
      console.error('❌ Error al eliminar coder:', error);
      alert('Error al eliminar el coder. Por favor, intenta de nuevo.');
    }
  };

  // Manejar creación de nuevo coder
  const handleCreate = async (newCoder: Omit<Coder, 'id'>) => {
    try {
      console.log('🔄 Creando coder:', newCoder);

      // Llamada a la API para crear
      await codersAPI.create(newCoder);

      console.log('✅ Coder creado exitosamente');

      // Recargar lista de coders
      await cargarCoders();

      // Cerrar modal
      setShowCreateModal(false);

      alert('Coder creado exitosamente');
    } catch (error: any) {
      console.error('❌ Error al crear coder:', error);

      // Manejar errores específicos
      if (error.message?.includes('email')) {
        alert('El email ya está registrado.');
      } else {
        alert('Error al crear el coder. Por favor, intenta de nuevo.');
      }
    }
  };

  // Manejar actualización de coder
  const handleUpdate = async (updatedCoder: Coder) => {
    try {
      console.log('🔄 Actualizando coder:', updatedCoder.id);

      // Llamada a la API para actualizar
      await codersAPI.update(updatedCoder.id, updatedCoder);

      console.log('✅ Coder actualizado exitosamente');

      // Recargar lista de coders
      await cargarCoders();

      // Cerrar modales
      setCoderEditando(null);
      setCoderDetalle(null);

      alert('Coder actualizado exitosamente');
    } catch (error: any) {
      console.error('❌ Error al actualizar coder:', error);
      alert('Error al actualizar el coder. Por favor, intenta de nuevo.');
    }
  };

  // Calcular estadísticas
  const codersBarranquilla = coders.filter(c => c.sede === 'Barranquilla').length;
  const codersMedellin = coders.filter(c => c.sede === 'Medellín').length;

  // Estado de carga
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-riwi-green mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando coders...</p>
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
            onClick={cargarCoders}
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
            <h2 className="text-2xl font-bold text-gray-900">Gestión de Coders</h2>
            <p className="text-sm text-gray-600 mt-1">
              Barranquilla: {codersBarranquilla} • Medellín: {codersMedellin} • Total: {coders.length}
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-riwi-green hover:opacity-90 text-white font-semibold px-6 py-3 rounded-lg transition-opacity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Crear Coder
          </button>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar por nombre, email o cohorte..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-green"
          />
          <select
            value={sedeFilter}
            onChange={(e) => setSedeFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-green"
          >
            <option value="todas">Todas las sedes</option>
            <option value="Barranquilla">Barranquilla</option>
            <option value="Medellín">Medellín</option>
          </select>
        </div>

        {/* Tabla de coders */}
        <div className="overflow-x-auto" ref={tableRef} key={`${sedeFilter}-${searchTerm}`}>
          <div className="text-sm text-gray-600 mb-2 px-4">
            Mostrando {filteredCoders.length} de {coders.length} coders
          </div>
          <table className="w-full" key={`table-${sedeFilter}-${searchTerm}`}>
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Sede</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Cohorte</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fecha Ingreso</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCoders.map((coder) => (
                <tr key={coder.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-riwi-green to-riwi-yellow flex items-center justify-center text-white font-bold text-sm">
                        {coder.nombre.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-gray-900">{coder.nombre}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{coder.email}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-riwi-green/10 text-riwi-green px-2 py-1 rounded-full font-medium">
                      {coder.sede}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{coder.cohorte}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {coder.fechaIngreso.toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setCoderDetalle(coder)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Ver detalles"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setCoderEditando(coder)}
                        className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(coder.id, coder.nombre)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCoders.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-500">No se encontraron coders</p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-2 text-riwi-green hover:underline"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modales */}
      {showCreateModal && (
        <CoderFormModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreate}
          title="Crear Nuevo Coder"
        />
      )}

      {coderEditando && (
        <CoderFormModal
          coder={coderEditando}
          onClose={() => setCoderEditando(null)}
          onSave={handleUpdate}
          title="Editar Coder"
        />
      )}

      {coderDetalle && (
        <CoderDetailModal
          coder={coderDetalle}
          onClose={() => setCoderDetalle(null)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}
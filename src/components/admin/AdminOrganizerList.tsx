// components/admin/AdminOrganizadoresList.tsx
'use client';

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    setTimeout(() => {
      setOrganizadores([
        {
          id: '1',
          nombre: 'Barranquilla Staff',
          email: 'barranquilla@riwi.io',
          sede: 'Barranquilla',
          rol: 'Coordinador',
          fechaIngreso: new Date('2023-01-10'),
          telefono: '+57 300 111 1111'
        },
        {
          id: '2',
          nombre: 'Laura Sánchez',
          email: 'laura.sanchez@riwi.io',
          sede: 'Barranquilla',
          rol: 'Organizador',
          fechaIngreso: new Date('2023-06-15'),
          telefono: '+57 301 222 2222'
        },
        {
          id: '3',
          nombre: 'Medellín Coord',
          email: 'medellin@riwi.io',
          sede: 'Medellín',
          rol: 'Coordinador',
          fechaIngreso: new Date('2023-01-10'),
          telefono: '+57 304 333 3333'
        },
        {
          id: '4',
          nombre: 'Pedro Ramírez',
          email: 'pedro.ramirez@riwi.io',
          sede: 'Medellín',
          rol: 'Organizador',
          fechaIngreso: new Date('2023-08-20'),
          telefono: '+57 305 444 4444'
        },
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredOrganizadores = organizadores.filter(org => {
    const matchesSearch = org.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSede = sedeFilter === 'todas' || org.sede === sedeFilter;
    return matchesSearch && matchesSede;
  });

  const handleDelete = (orgId: string, nombreOrg: string) => {
    if (confirm(`¿Estás seguro de eliminar a ${nombreOrg}?`)) {
      setOrganizadores(organizadores.filter(o => o.id !== orgId));
      console.log('Organizador eliminado:', orgId);
    }
  };

  const handleCreate = (newOrganizador: Omit<Organizador, 'id'>) => {
    const organizador: Organizador = {
      ...newOrganizador,
      id: `${organizadores.length + 1}`
    };
    setOrganizadores([...organizadores, organizador]);
    setShowCreateModal(false);
  };

  const handleUpdate = (updatedOrganizador: Organizador) => {
    setOrganizadores(organizadores.map(o => o.id === updatedOrganizador.id ? updatedOrganizador : o));
    setOrganizadorEditando(null);
  };

  const organizadoresBarranquilla = organizadores.filter(o => o.sede === 'Barranquilla').length;
  const organizadoresMedellin = organizadores.filter(o => o.sede === 'Medellín').length;

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-riwi-yellow mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando organizadores...</p>
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
              Barranquilla: {organizadoresBarranquilla} • Medellín: {organizadoresMedellin}
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
              <p className="text-sm text-gray-600 mb-3">{organizador.email}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rol:</span>
                  <span className="text-sm font-medium text-gray-900">{organizador.rol}</span>
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
            <p className="text-gray-500">No se encontraron organizadores</p>
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
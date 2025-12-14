// components/organizador/CodersList.tsx
'use client';

import { useState, useEffect } from 'react';
import { CoderDetailModal } from './CoderDetailModal';

interface Coder {
  id: string;
  nombre: string;
  email: string;
  sede: string;
  cohorte: string;
  fechaIngreso: Date;
  telefono?: string;
  avatar?: string;
}

interface CodersListProps {
  sede: string;
}

export function CodersList({ sede }: CodersListProps) {
  const [coders, setCoders] = useState<Coder[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [coderSeleccionado, setCoderSeleccionado] = useState<Coder | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setCoders([
        {
          id: '1',
          nombre: 'Juan Pérez',
          email: 'juan.perez@riwi.io',
          sede: 'Barranquilla',
          cohorte: 'Cohorte 15',
          fechaIngreso: new Date('2024-01-15'),
          telefono: '+57 300 123 4567'
        },
        {
          id: '2',
          nombre: 'María González',
          email: 'maria.gonzalez@riwi.io',
          sede: 'Barranquilla',
          cohorte: 'Cohorte 15',
          fechaIngreso: new Date('2024-01-15'),
          telefono: '+57 301 234 5678'
        },
        {
          id: '3',
          nombre: 'Carlos Rodríguez',
          email: 'carlos.rodriguez@riwi.io',
          sede: 'Barranquilla',
          cohorte: 'Cohorte 14',
          fechaIngreso: new Date('2023-09-10'),
          telefono: '+57 302 345 6789'
        },
        {
          id: '4',
          nombre: 'Ana Martínez',
          email: 'ana.martinez@riwi.io',
          sede: 'Barranquilla',
          cohorte: 'Cohorte 15',
          fechaIngreso: new Date('2024-01-15'),
          telefono: '+57 303 456 7890'
        },
      ]);
      setIsLoading(false);
    }, 500);
  }, [sede]);

  const filteredCoders = coders.filter(coder =>
    coder.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coder.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coder.cohorte.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteCoder = (coderId: string, nombreCoder: string) => {
    if (confirm(`¿Estás seguro de eliminar a ${nombreCoder} de la base de datos?`)) {
      setCoders(coders.filter(c => c.id !== coderId));
      console.log('Coder eliminado:', coderId);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-riwi-green mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando coders...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Coders de {sede}
          </h2>
          <span className="bg-riwi-green text-white px-4 py-2 rounded-full font-semibold">
            {coders.length} coders
          </span>
        </div>

        {/* Buscador */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por nombre, email o cohorte..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-green"
          />
        </div>

        {/* Lista de coders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto">
          {filteredCoders.map((coder) => (
            <div 
              key={coder.id} 
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative"
            >
              {/* Botones de acción */}
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => setCoderSeleccionado(coder)}
                  className="p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  title="Ver detalles"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteCoder(coder.id, coder.nombre)}
                  className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  title="Eliminar coder"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-riwi-green to-riwi-yellow flex items-center justify-center text-white font-bold shrink-0">
                  {coder.nombre.split(' ').map(n => n[0]).join('')}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pr-16">
                  <h3 className="font-bold text-gray-900 truncate">{coder.nombre}</h3>
                  <p className="text-sm text-gray-600 truncate">{coder.email}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs bg-riwi-green/10 text-riwi-green px-2 py-1 rounded-full font-medium">
                      {coder.cohorte}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {coder.fechaIngreso.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCoders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron coders</p>
          </div>
        )}
      </div>

      {/* Modal de detalles */}
      {coderSeleccionado && (
        <CoderDetailModal
          coder={coderSeleccionado}
          onClose={() => setCoderSeleccionado(null)}
          onUpdate={(coderActualizado) => {
            setCoders(coders.map(c => c.id === coderActualizado.id ? coderActualizado : c));
            setCoderSeleccionado(null);
          }}
        />
      )}
    </>
  );
}
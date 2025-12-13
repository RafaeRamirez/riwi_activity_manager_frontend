// components/eventos/EventFilters.tsx
'use client';

import { useState } from 'react';
import type { Event } from '@/types/event';

interface EventFiltersProps {
  eventos: Event[];
  onFilter: (filtered: Event[]) => void;
}

export function EventFilters({ eventos, onFilter }: EventFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleBuscarEventos = () => {
    const filtered = eventos.filter(evento => 
      evento.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evento.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );
    onFilter(filtered);
  };

  const handleEventosInscritos = () => {
    const filtered = eventos.filter(evento => 
      evento.inscritos && evento.inscritos > 0
    );
    onFilter(filtered);
  };

  const handleReset = () => {
    setSearchTerm('');
    onFilter(eventos);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="font-bold text-lg mb-4">Filtros</h3>
      
      <div className="space-y-3">
        {/* Input de búsqueda */}
        <input
          type="text"
          placeholder="Buscar eventos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Botón Buscar Eventos */}
        <button
          onClick={handleBuscarEventos}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Buscar Eventos
        </button>

        {/* Botón Eventos Inscritos */}
        <button
          onClick={handleEventosInscritos}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Eventos Inscritos
        </button>

        {/* Botón Reset */}
        <button
          onClick={handleReset}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}
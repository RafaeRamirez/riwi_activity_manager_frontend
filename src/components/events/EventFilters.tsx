// components/eventos/EventFilters.tsx
'use client';

import { useState } from 'react';
import type { Event } from '@/types/event';

interface EventFiltersProps {
  eventos: Event[];
  eventosInscritos: string[];
  onFilter: (filtered: Event[]) => void;
}

export function EventFilters({ eventos, eventosInscritos, onFilter }: EventFiltersProps) {
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
      eventosInscritos.includes(evento.id)
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
          onKeyPress={(e) => e.key === 'Enter' && handleBuscarEventos()}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Botón Buscar Eventos */}
        <button
          onClick={handleBuscarEventos}
          className="w-full bg-riwi-violet hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Buscar Eventos
        </button>

        {/* Botón Eventos Inscritos */}
        <button
          onClick={handleEventosInscritos}
          className="w-full bg-riwi-orange hover:bg-orange-300 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span>Eventos Inscritos</span>
          {eventosInscritos.length > 0 && (
            <span className="bg-white text-riwi-orange rounded-full px-2 py-0.5 text-xs font-bold">
              {eventosInscritos.length}
            </span>
          )}
        </button>

        {/* Botón Reset */}
        <button
          onClick={handleReset}
          className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}
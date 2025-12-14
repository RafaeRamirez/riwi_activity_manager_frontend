// components/eventos/EventosLayout.tsx
'use client';

import { useState } from 'react';
import { UserHeader } from './UserHeader';
import { EventList } from './EventList';
import { EventFilters } from './EventFilters';
import type { Event, UserRole } from '@/types/event';

interface EventosLayoutProps {
  eventos: Event[];
  userName: string;
  userInitials: string;
  userRole: UserRole;
  eventosInscritosIniciales?: string[];
  onInscribir?: (eventoId: string) => Promise<void>;
  onDesinscribir?: (eventoId: string) => Promise<void>;
}

export function EventosLayout({ 
  eventos, 
  userName, 
  userInitials, 
  userRole,
  eventosInscritosIniciales = [],
  onInscribir,
  onDesinscribir
}: EventosLayoutProps) {
  const [filteredEventos, setFilteredEventos] = useState<Event[]>(eventos);
  const [eventosInscritos, setEventosInscritos] = useState<string[]>(eventosInscritosIniciales);

  const handleFilter = (filtered: Event[]) => {
    setFilteredEventos(filtered);
  };

  const handleInscribir = async (eventoId: string) => {
    // Llamar a la función externa si existe
    if (onInscribir) {
      await onInscribir(eventoId);
    }
    
    // Actualizar estado local
    setEventosInscritos(prev => [...prev, eventoId]);
  };

  const handleDesinscribir = async (eventoId: string) => {
    // Llamar a la función externa si existe
    if (onDesinscribir) {
      await onDesinscribir(eventoId);
    }
    
    // Actualizar estado local
    setEventosInscritos(prev => prev.filter(id => id !== eventoId));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header con usuario */}
        <UserHeader 
          nombre={userName} 
          iniciales={userInitials} 
          role={userRole} 
        />

        {/* Fecha actual */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold">
            HOY {new Date().toLocaleDateString('es-ES', { 
              day: '2-digit', 
              month: 'long' 
            })}
          </h2>
        </div>

        {/* Grid de eventos y filtros */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de eventos */}
          <div className="lg:col-span-2">
            <EventList 
              eventos={filteredEventos}
              eventosInscritos={eventosInscritos}
              onInscribir={handleInscribir}
              onDesinscribir={handleDesinscribir}
            />
          </div>

          {/* Panel de filtros */}
          <div className="lg:col-span-1">
            <EventFilters 
              eventos={eventos}
              eventosInscritos={eventosInscritos}
              onFilter={handleFilter} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
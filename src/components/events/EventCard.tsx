// components/eventos/EventCard.tsx

import type { Event } from '@/types/event';

interface EventCardProps {
  evento: Event;
}

export function EventCard({ evento }: EventCardProps) {
  const fecha = new Date(evento.fecha);
  const fechaFormato = fecha.toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: 'long' 
  });

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <span>{fechaFormato}</span>
          </div>
          
          <h4 className="font-bold text-lg mb-2">{evento.titulo}</h4>
          
          {evento.ubicacion && (
            <p className="text-sm text-gray-600 mb-1">
              {evento.ubicacion} • Sala {evento.sala}
            </p>
          )}

          {evento.modalidad && (
            <div className="inline-flex items-center gap-1 text-sm text-gray-700 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              {evento.modalidad}
            </div>
          )}
          
          <p className="text-sm text-gray-700 line-clamp-2">
            {evento.descripcion}
          </p>
        </div>

        {evento.capacidad && (
          <div className="flex items-center gap-2 ml-4">
            <svg 
              className="w-5 h-5 text-purple-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            <span className="font-semibold text-purple-600">
              {evento.inscritos || 0}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
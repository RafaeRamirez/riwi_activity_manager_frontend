// components/eventos/EventCard.tsx
'use client';

import type { Event } from '@/types/event';

interface EventCardProps {
  evento: Event;
  isInscrito?: boolean;
  onClick?: () => void;
}

export function EventCard({ evento, isInscrito = false, onClick }: EventCardProps) {
  const fecha = new Date(evento.fecha);
  const fechaFormato = fecha.toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: 'long' 
  });

  return (
    <div 
      onClick={onClick}
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer hover:border-purple-300 relative"
    >
      {/* Badge de inscrito */}
      {isInscrito && (
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Inscrito
          </span>
        </div>
      )}

      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 pr-20">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <span>{fechaFormato}</span>
          </div>
          
          <h4 className="font-bold text-lg mb-2">{evento.titulo}</h4>
          
          {evento.ubicacion && (
            <p className="text-sm text-gray-600 mb-1">
              {evento.ubicacion} {evento.sala && `• Sala ${evento.sala}`}
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
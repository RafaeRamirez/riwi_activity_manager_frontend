// components/eventos/EventList.tsx
'use client';

import { useState } from 'react';
import { EventCard } from './EventCard';
import { EventoModal } from './EventModal';
import type { Event, EventAgroup } from '@/types/event';

interface EventListProps {
  eventos: Event[];
  eventosInscritos: string[];
  onInscribir: (eventoId: string) => void;
  onDesinscribir: (eventoId: string) => void;
}

export function EventList({ eventos, eventosInscritos, onInscribir, onDesinscribir }: EventListProps) {
  const [eventoSeleccionado, setEventoSeleccionado] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Agrupar eventos por mes
  const eventosAgrupados = agruparEventosPorMes(eventos);

  const handleInscribir = async (eventoId: string) => {
    setIsLoading(true);
    await onInscribir(eventoId);
    setIsLoading(false);
    setEventoSeleccionado(null);
  };

  const handleDesinscribir = async (eventoId: string) => {
    setIsLoading(true);
    await onDesinscribir(eventoId);
    setIsLoading(false);
    setEventoSeleccionado(null);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Próximos Eventos</h2>
        
        <div className="space-y-8 max-h-[600px] overflow-y-auto pr-2">
          {eventosAgrupados.map((grupo, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-bold text-riwi-violet italic mb-4">
                {grupo.mes.toUpperCase()} {grupo.anio}
              </h3>
              
              {grupo.eventos.map((dia, diaIdx) => (
                <div key={diaIdx} className="mb-5">
                  <div className="flex gap-3">
                    {/* Fecha destacada */}
                    <div className="flex flex-col items-center w-16 shrink-0">
                      <span className="text-riwi-yellow text-lg font-medium h-5">
                        {dia.diaSemana}
                      </span>
                      <span className="text-4xl font-bold text-riwi-orange">
                        {dia.dia}
                      </span>
                    </div>

                    {/* Eventos del día */}
                    <div className="flex-1 space-y-3">
                      {dia.eventos.map((evento) => (
                        <EventCard 
                          key={evento.id} 
                          evento={evento}
                          isInscrito={eventosInscritos.includes(evento.id)}
                          onClick={() => setEventoSeleccionado(evento)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Modal de detalle */}
      {eventoSeleccionado && (
        <EventoModal
          evento={eventoSeleccionado}
          isOpen={true}
          onClose={() => setEventoSeleccionado(null)}
          onInscribir={handleInscribir}
          onDesinscribir={handleDesinscribir}
          isInscrito={eventosInscritos.includes(eventoSeleccionado.id)}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

// Función auxiliar para agrupar eventos
function agruparEventosPorMes(eventos: Event[]): EventAgroup[] {
  const grupos: Map<string, EventAgroup> = new Map();

  eventos.forEach(evento => {
    const fecha = new Date(evento.fecha);
    const mes = fecha.toLocaleDateString('es-ES', { month: 'long' });
    const anio = fecha.getFullYear();
    const dia = fecha.getDate();
    const diaSemana = fecha.toLocaleDateString('es-ES', { weekday: 'short' });
    
    const claveGrupo = `${mes}-${anio}`;
    
    if (!grupos.has(claveGrupo)) {
      grupos.set(claveGrupo, {
        mes,
        anio,
        eventos: []
      });
    }

    const grupo = grupos.get(claveGrupo)!;
    let diaEvento = grupo.eventos.find(d => d.dia === dia);
    
    if (!diaEvento) {
      diaEvento = {
        dia,
        diaSemana,
        mes,
        eventos: []
      };
      grupo.eventos.push(diaEvento);
    }
    
    diaEvento.eventos.push(evento);
  });

  return Array.from(grupos.values());
}
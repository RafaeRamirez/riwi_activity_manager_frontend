// components/eventos/EventList.tsx

import { EventCard } from './EventCard';
import type { Event, EventAgroup } from '@/types/event';

interface EventListProps {
  eventos: Event[];
}

export function EventList({ eventos }: EventListProps) {
  // Agrupar eventos por mes
  const eventosAgrupados = agruparEventosPorMes(eventos);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Próximos Eventos</h2>
      
      <div className="space-y-8 max-h-[600px] overflow-y-auto pr-2">
        {eventosAgrupados.map((grupo, idx) => (
          <div key={idx}>
            <h3 className="text-lg font-semibold text-purple-600 italic mb-4">
              {grupo.mes.toUpperCase()} {grupo.anio}
            </h3>
            
            {grupo.eventos.map((dia, diaIdx) => (
              <div key={diaIdx} className="mb-6">
                <div className="flex gap-4">
                  {/* Fecha destacada */}
                  <div className="flex flex-col items-center w-16 flex-shrink-0">
                    <span className="text-yellow-500 text-sm font-medium">
                      {dia.diaSemana}
                    </span>
                    <span className="text-4xl font-bold text-orange-500">
                      {dia.dia}
                    </span>
                  </div>

                  {/* Eventos del día */}
                  <div className="flex-1 space-y-3">
                    {dia.eventos.map((event) => (
                      <EventCard key={event.id} evento={event} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
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
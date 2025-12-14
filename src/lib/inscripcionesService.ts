// lib/inscripcionesService.ts

import { mockEventos } from './mockEvents';
import type { Event } from '@/types/event';

// Simulación de base de datos en memoria
let eventosActualizados = [...mockEventos];
let inscripcionesUsuario: string[] = ['1', '2']; // IDs de eventos donde el usuario está inscrito

// Simular delay de API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const inscripcionesService = {
  // Obtener eventos actualizados
  getEventos: async (): Promise<Event[]> => {
    await delay(300);
    return [...eventosActualizados];
  },

  // Obtener inscripciones del usuario
  getInscripciones: async (): Promise<string[]> => {
    await delay(200);
    return [...inscripcionesUsuario];
  },

  // Inscribirse a un evento
  inscribirse: async (eventoId: string): Promise<{ success: boolean; mensaje: string; evento?: Event }> => {
    await delay(500);

    // Verificar si ya está inscrito
    if (inscripcionesUsuario.includes(eventoId)) {
      return {
        success: false,
        mensaje: 'Ya estás inscrito en este evento'
      };
    }

    // Buscar el evento
    const eventoIndex = eventosActualizados.findIndex(e => e.id === eventoId);
    if (eventoIndex === -1) {
      return {
        success: false,
        mensaje: 'Evento no encontrado'
      };
    }

    const evento = eventosActualizados[eventoIndex];

    // Verificar capacidad
    if (evento.inscritos && evento.capacidad && evento.inscritos >= evento.capacidad) {
      return {
        success: false,
        mensaje: 'El evento está lleno'
      };
    }

    // Actualizar el evento
    const eventoActualizado = {
      ...evento,
      inscritos: (evento.inscritos || 0) + 1
    };

    eventosActualizados[eventoIndex] = eventoActualizado;
    inscripcionesUsuario.push(eventoId);

    console.log(`✅ Inscrito al evento "${evento.titulo}". Inscritos: ${eventoActualizado.inscritos}/${evento.capacidad}`);

    return {
      success: true,
      mensaje: '¡Inscripción exitosa!',
      evento: eventoActualizado
    };
  },

  // Desinscribirse de un evento
  desinscribirse: async (eventoId: string): Promise<{ success: boolean; mensaje: string; evento?: Event }> => {
    await delay(500);

    // Verificar si está inscrito
    if (!inscripcionesUsuario.includes(eventoId)) {
      return {
        success: false,
        mensaje: 'No estás inscrito en este evento'
      };
    }

    // Buscar el evento
    const eventoIndex = eventosActualizados.findIndex(e => e.id === eventoId);
    if (eventoIndex === -1) {
      return {
        success: false,
        mensaje: 'Evento no encontrado'
      };
    }

    const evento = eventosActualizados[eventoIndex];

    // Actualizar el evento
    const eventoActualizado = {
      ...evento,
      inscritos: Math.max((evento.inscritos || 0) - 1, 0)
    };

    eventosActualizados[eventoIndex] = eventoActualizado;
    inscripcionesUsuario = inscripcionesUsuario.filter(id => id !== eventoId);

    console.log(`❌ Desinscrito del evento "${evento.titulo}". Inscritos: ${eventoActualizado.inscritos}/${evento.capacidad}`);

    return {
      success: true,
      mensaje: 'Desinscripción exitosa',
      evento: eventoActualizado
    };
  },

  // Resetear datos (útil para testing)
  reset: () => {
    eventosActualizados = [...mockEventos];
    inscripcionesUsuario = ['1', '2'];
    console.log('🔄 Datos reseteados');
  }
};
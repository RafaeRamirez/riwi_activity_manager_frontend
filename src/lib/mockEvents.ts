// lib/mockEventos.ts
import type { Event } from '@/types/event';

export const mockEventos: Event[] = [
  // NOVIEMBRE 2025
  {
    id: '1',
    fecha: new Date('2025-11-28'),
    titulo: 'Taller Socioemocional',
    descripcion: 'Hola Coders. Para este viernes tendremos una actividad donde charlaremos sobre nuestras emociones e impacto...',
    ubicacion: 'Remoto Vía: Discord',
    modalidad: 'Virtual',
    capacidad: 30,
    inscritos: 30,
    sala: 'Sala 1'
  },
  {
    id: '2',
    fecha: new Date('2025-11-30'),
    titulo: 'Taller Complementario',
    descripcion: 'Hola Coders. Para este sábado tendremos temas complementarios para el módulo donde...',
    ubicacion: 'Remoto Vía: Discord',
    modalidad: 'Virtual',
    capacidad: 25,
    inscritos: 20,
    sala: 'Sala 1'
  },
  
  // DICIEMBRE 2025
  {
    id: '3',
    fecha: new Date('2025-12-13'),
    titulo: 'Sesión de Networking',
    descripcion: 'Espacio para conectar con otros coders, compartir experiencias y crear vínculos profesionales...',
    ubicacion: 'Presential',
    modalidad: 'Presential',
    capacidad: 40,
    inscritos: 15,
    sala: 'Auditorio Principal'
  },
  {
    id: '4',
    fecha: new Date('2025-12-08'),
    titulo: 'Code Review Session',
    descripcion: 'Revisaremos código en equipo, aprenderemos mejores prácticas y técnicas de refactoring...',
    ubicacion: 'Remoto Vía: Google Meet',
    modalidad: 'Virtual',
    capacidad: 35,
    inscritos: 28,
    sala: 'Sala Virtual 2'
  },
  {
    id: '5',
    fecha: new Date('2025-12-12'),
    titulo: 'Workshop de React Avanzado',
    descripcion: 'Profundizaremos en patrones avanzados de React, custom hooks y optimización de performance...',
    ubicacion: 'Remoto Vía: Zoom',
    modalidad: 'Virtual',
    capacidad: 50,
    inscritos: 42,
    sala: 'Sala Virtual 3'
  },
  {
    id: '6',
    fecha: new Date('2025-12-15'),
    titulo: 'Hackathon de Fin de Año',
    descripcion: '¡Gran hackathon para cerrar el año! Forma equipo y crea proyectos increíbles en 24 horas...',
    ubicacion: 'Híbrido',
    modalidad: 'Híbrido',
    capacidad: 100,
    inscritos: 87,
    sala: 'Múltiples salas'
  },
  {
    id: '7',
    fecha: new Date('2025-12-18'),
    titulo: 'Charla: Tendencias Tech 2026',
    descripcion: 'Exploraremos las tendencias tecnológicas que marcarán el próximo año: IA, Web3, Cloud...',
    ubicacion: 'Remoto Vía: Discord',
    modalidad: 'Virtual',
    capacidad: 60,
    inscritos: 45,
    sala: 'Sala Principal'
  },
  {
    id: '8',
    fecha: new Date('2025-12-20'),
    titulo: 'Demo Day - Proyectos Finales',
    descripcion: 'Los coders presentarán sus proyectos finales. ¡Ven a conocer lo que han construido!',
    ubicacion: 'Presencial',
    modalidad: 'Presential',
    capacidad: 80,
    inscritos: 65,
    sala: 'Auditorio Central'
  },

  // ENERO 2026
  {
    id: '9',
    fecha: new Date('2026-01-10'),
    titulo: 'Kick-off 2026',
    descripcion: 'Comenzamos el año con energía. Conoce los nuevos módulos y objetivos para este ciclo...',
    ubicacion: 'Híbrido',
    modalidad: 'Híbrido',
    capacidad: 100,
    inscritos: 12,
    sala: 'Sala Principal + Virtual'
  },
  {
    id: '10',
    fecha: new Date('2026-01-15'),
    titulo: 'Taller de Git y GitHub Avanzado',
    descripcion: 'Aprende Git Flow, resolución de conflictos, rebase, y colaboración en proyectos grandes...',
    ubicacion: 'Remoto Vía: Zoom',
    modalidad: 'Virtual',
    capacidad: 40,
    inscritos: 8,
    sala: 'Sala Virtual 1'
  },
  {
    id: '11',
    fecha: new Date('2026-01-22'),
    titulo: 'Meetup con Empresas Tech',
    descripcion: 'Networking con representantes de empresas tech locales. Oportunidades laborales y pasantías...',
    ubicacion: 'Presencial',
    modalidad: 'Presential',
    capacidad: 50,
    inscritos: 5,
    sala: 'Sala de Eventos'
  },
  {
    id: '12',
    fecha: new Date('2026-01-25'),
    titulo: 'Workshop: Testing en JavaScript',
    descripcion: 'Introducción a testing con Jest, React Testing Library y mejores prácticas de TDD...',
    ubicacion: 'Remoto Vía: Discord',
    modalidad: 'Virtual',
    capacidad: 35,
    inscritos: 0,
    sala: 'Sala Tech'
  }
];

// Función helper para obtener eventos
export function getEventos() {
  return mockEventos;
}

// Función para obtener eventos por fecha
export function getEventosPorFecha(desde?: Date, hasta?: Date) {
  let eventos = mockEventos;
  
  if (desde) {
    eventos = eventos.filter(e => new Date(e.fecha) >= desde);
  }
  
  if (hasta) {
    eventos = eventos.filter(e => new Date(e.fecha) <= hasta);
  }
  
  return eventos.sort((a, b) => 
    new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
  );
}

// Función para obtener eventos inscritos (con inscritos > 0)
export function getEventosInscritos() {
  return mockEventos.filter(e => e.inscritos && e.inscritos > 0);
}
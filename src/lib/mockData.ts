// Datos de prueba para desarrollo

// ==================== USUARIOS DE PRUEBA ====================
export const mockUsers = [
  {
    email: 'admin@riwi.io',
    password: '123456',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZX0.admin-token-mock',
    personId: 99,
    fullName: 'Admin User',
    role: 'admin'
  },
  // Organizadores
  {
    email: 'organizador@riwi.io',
    password: '123456',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdvIjp0cnVlfQ.organizer-token-mock',
    personId: 98,
    fullName: 'Organizador Test',
    sede: 'Medellín',
    role: 'organizer'
  },
  {
    email: 'organizadorbq@riwi.io',
    password: '123456',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdvIjp0cnVlfQ.organizer-token-mock',
    personId: 70,
    fullName: 'Organizador Test BQ',
    sede: 'Barranquilla',
    role: 'organizer'
  },

  // Coders
  {
    email: 'coder@riwi.io',
    password: '123456',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlciI6dHJ1ZX0.coder-token-mock',
    personId: 96,
    fullName: 'Coder Medellin',
    sede: 'Medellín',
    role: 'coder'
  },
  {
    email: 'coderbq@riwi.io',
    password: '123456',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlciI6dHJ1ZX0.coder-token-mock',
    personId: 95,
    fullName: 'Coder Barranquilla',
    sede: 'Barranquilla',
    role: 'coder'
  },
  {
    email: 'coder2@riwi.io',
    password: '123456',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlciI6dHJ1ZX0.coder-token-mock',
    personId: 94,
    fullName: 'Coder Medellin 2',
    sede: 'Medellín',
    role: 'coder'
  },
  {
    email: 'coderbq2@riwi.io',
    password: '123456',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlciI6dHJ1ZX0.coder-token-mock',
    personId: 93,
    fullName: 'Coder Barranquilla 2',
    sede: 'Barranquilla',
    role: 'coder',
    fechaIngreso: new Date('2024-01-15'),
    telefono: '3001234567'
  },
  {
    email: 'coder3@riwi.io',
    password: '123456',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlciI6dHJ1ZX0.coder-token-mock',
    personId: 92,
    fullName: 'Coder Medellin 3',
    sede: 'Medellín',
    role: 'coder',
    fechaIngreso: new Date('2024-01-15'),
    telefono: '3001234567'
  },
  {
    email: 'coderbq3@riwi.io',
    password: '123456',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlciI6dHJ1ZX0.coder-token-mock',
    personId: 91,
    fullName: 'Coder Barranquilla 3',
    sede: 'Barranquilla',
    role: 'coder',
    fechaIngreso: '2024-01-15',
    telefono: '3001234567'
  }
];
// ==================== EVENTOS DE PRUEBA ====================

export const mockEventos = [
  {
    id: '1',
    titulo: 'Workshop de React Avanzado',
    descripcion: 'Aprende conceptos avanzados de React incluyendo hooks, context API y performance optimization.',
    fecha: '2025-11-20T10:00:00',
    ubicacion: 'Aula 101',
    sala: 'Sala A',
    modalidad: 'Presencial' as const,
    capacidad: 30,
    inscritos: 25,
    sede: 'Barranquilla'
  },
  {
    id: '2',
    titulo: 'Introducción a TypeScript',
    descripcion: 'Descubre los tipos estáticos, interfaces y cómo mejorar tu código con TypeScript.',
    fecha: '2025-11-22T14:00:00',
    ubicacion: 'Online',
    sala: 'Virtual',
    modalidad: 'Virtual' as const,
    capacidad: 50,
    inscritos: 45,
    sede: 'Medellín'
  },
  {
    id: '3',
    titulo: 'Bases de Datos con PostgreSQL',
    descripcion: 'Aprende SQL avanzado, normalizacion de bases de datos y optimización de queries.',
    fecha: '2025-11-25T09:00:00',
    ubicacion: 'Aula 102',
    sala: 'Sala B',
    modalidad: 'Presencial' as const,
    capacidad: 25,
    inscritos: 20,
    sede: 'Barranquilla'
  },
  {
    id: '4',
    titulo: 'Full Stack Development con Next.js',
    descripcion: 'Desarrolla aplicaciones completas con Next.js, API routes y autenticación.',
    fecha: '2025-11-28T11:00:00',
    ubicacion: 'Online',
    sala: 'Virtual',
    modalidad: 'Híbrido' as const,
    capacidad: 40,
    inscritos: 38,
    sede: 'Medellín'
  },
  {
    id: '5',
    titulo: 'CSS Avanzado: Grid y Flexbox',
    descripcion: 'Domina el diseño responsivo con Grid, Flexbox y técnicas modernas de CSS.',
    fecha: '2025-12-03T15:00:00',
    ubicacion: 'Aula 201',
    sala: 'Sala C',
    modalidad: 'Presencial' as const,
    capacidad: 35,
    inscritos: 30,
    sede: 'Barranquilla'
  },
  {
    id: '6',
    titulo: 'Git y Control de Versiones',
    descripcion: 'Domina Git, GitHub, ramas, merge conflicts y buenas prácticas de versionado.',
    fecha: '2025-12-15T10:00:00',
    ubicacion: 'Online',
    sala: 'Virtual',
    modalidad: 'Virtual' as const,
    capacidad: 60,
    inscritos: 55,
    sede: 'Medellín'
  },
  {
    id: '7',
    titulo: 'Testing y Jest',
    descripcion: 'Escribe tests unitarios e integración con Jest y aprende testing best practices.',
    fecha: '2025-12-17T13:00:00',
    ubicacion: 'Aula 103',
    sala: 'Sala D',
    modalidad: 'Presencial' as const,
    capacidad: 28,
    inscritos: 24,
    sede: 'Barranquilla'
  },
  {
    id: '8',
    titulo: 'API REST con Node.js y Express',
    descripcion: 'Desarrolla APIs robustas y seguras con Node.js, Express, validación y autenticación.',
    fecha: '2025-12-17T16:00:00',
    ubicacion: 'Online',
    sala: 'Virtual',
    modalidad: 'Híbrido' as const,
    capacidad: 45,
    inscritos: 42,
    sede: 'Medellín'
  },
  {
    id: '9',
    titulo: 'Docker y Containerización',
    descripcion: 'Aprende Docker, contenedores y orquestación para desplegar tus aplicaciones.',
    fecha: '2025-12-18T09:00:00',
    ubicacion: 'Aula 301',
    sala: 'Sala E',
    modalidad: 'Presencial' as const,
    capacidad: 20,
    inscritos: 18,
    sede: 'Barranquilla'
  },
  {
    id: '10',
    titulo: 'Seguridad en Aplicaciones Web',
    descripcion: 'Conoce las vulnerabilidades comunes, OWASP top 10 y cómo proteger tus aplicaciones.',
    fecha: '2025-12-19T11:00:00',
    ubicacion: 'Online',
    sala: 'Virtual',
    modalidad: 'Virtual' as const,
    capacidad: 50,
    inscritos: 48,
    sede: 'Medellín'
  }
];

export const mockOrganizadores = [
  {
    id: '1',
    nombre: 'Javier Ariza',
    email: 'javier.ariza@riwi.io',
    sede: 'Barranquilla',
    fechaIngreso: '2023-06-01',
    telefono: '3001111111',
    rol: 'Coordinador'
  },
  {
    id: '2',
    nombre: 'Valentina Guzmán',
    email: 'valentina.guzman@riwi.io',
    sede: 'Medellín',
    fechaIngreso: '2023-06-15',
    telefono: '3009999999',
    rol: 'Coordinador'
  },
  {
    id: '3',
    nombre: 'Javier Combita',
    email: 'javier@riwi.io',
    sede: 'Barranquilla',
    fechaIngreso: '2023-07-01',
    telefono: '3003333333',
    rol: 'Instructor'
  },
  {
    id: '4',
    nombre: 'Catalina Vélez',
    email: 'catalina.velez@riwi.io',
    sede: 'Medellín',
    fechaIngreso: '2023-07-10',
    telefono: '3005555555',
    rol: 'Instructor'
  },
  {
    id: '5',
    nombre: 'Andrés HPLV',
    email: 'andres.hplv@riwi.io',
    sede: 'Barranquilla',
    fechaIngreso: '2023-08-01',
    telefono: '3004444444',
    rol: 'Asistente'
  },
  {
    id: '6',
    nombre: 'Mariana López',
    email: 'mariana.lopez@riwi.io',
    sede: 'Medellín',
    fechaIngreso: '2023-08-15',
    telefono: '3007777777',
    rol: 'Asistente'
  }
];

export const mockInscritos = [
  {
    id: '1',
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    cohorte: 'C1-2025',
    fechaInscripcion: '2024-12-01'
  },
  {
    id: '2',
    nombre: 'María García',
    email: 'maria.garcia@example.com',
    cohorte: 'C2-2025',
    fechaInscripcion: '2024-12-02'
  },
  {
    id: '3',
    nombre: 'Carlos López',
    email: 'carlos.lopez@example.com',
    cohorte: 'C1-2025',
    fechaInscripcion: '2024-12-03'
  },
  {
    id: '4',
    nombre: 'Laura Martínez',
    email: 'laura.martinez@example.com',
    cohorte: 'C2-2025',
    fechaInscripcion: '2024-12-04'
  },
  {
    id: '5',
    nombre: 'Diego Rodríguez',
    email: 'diego.rodriguez@example.com',
    cohorte: 'C3-2025',
    fechaInscripcion: '2024-12-05'
  }
];


// Exportar datos de prueba para admin
export const mockAdminStats = {
  totalCoders: mockUsers.length,
  totalEventos: mockEventos.length,
  totalOrganizadores: mockOrganizadores.length,
  codersBarranquilla: mockUsers.filter(c => c.sede === 'Barranquilla').length,
  codersMedellin: mockUsers.filter(c => c.sede === 'Medellín').length,
  eventosBarranquilla: mockEventos.filter(e => e.sede === 'Barranquilla').length,
  eventosMedellin: mockEventos.filter(e => e.sede === 'Medellín').length,
  organizadoresBarranquilla: mockOrganizadores.filter(o => o.sede === 'Barranquilla').length,
  organizadoresMedellin: mockOrganizadores.filter(o => o.sede === 'Medellín').length
};

// ==================== EVENTOS INSCRITOS POR CODER ====================
export const mockCoderEventosInscritos: { [coderId: string]: string[] } = {
  '96': ['1', '4'], // Coder Medellin inscrito en React y Next.js
  '95': ['3', '7'], // Coder Barranquilla inscrito en PostgreSQL y Jest
  '94': ['2', '5'], // Coder Medellin 2 inscrito en TypeScript y CSS
  '93': ['6', '9'], // Coder Barranquilla 2 inscrito en Git y Docker
  '92': ['8', '10'], // Coder Medellin 3 inscrito en Express y Seguridad
  '91': ['1', '2', '3'] // Coder Barranquilla 3 inscrito en varios
};

// ==================== HISTORIAL DE ASISTENCIA ====================
export const mockCoderHistorial: { [coderId: string]: Array<{ id: string, titulo: string, fecha: string, asistio: boolean }> } = {
  '96': [
    { id: '1', titulo: 'Intro a JavaScript', fecha: '2024-12-01', asistio: true },
    { id: '2', titulo: 'Fundamentos de React', fecha: '2024-12-08', asistio: true },
    { id: '3', titulo: 'Estado en React', fecha: '2024-12-15', asistio: false }
  ],
  '95': [
    { id: '4', titulo: 'Bases de Datos SQL', fecha: '2024-11-20', asistio: true },
    { id: '5', titulo: 'Normalización DB', fecha: '2024-11-27', asistio: true }
  ],
  '94': [
    { id: '6', titulo: 'Git Básico', fecha: '2024-10-15', asistio: true },
    { id: '7', titulo: 'Branching en Git', fecha: '2024-10-22', asistio: false }
  ],
  '93': [
    { id: '8', titulo: 'Express API', fecha: '2024-09-10', asistio: true },
    { id: '9', titulo: 'Autenticación JWT', fecha: '2024-09-17', asistio: true },
    { id: '10', titulo: 'CORS en Express', fecha: '2024-09-24', asistio: false }
  ],
  '92': [
    { id: '11', titulo: 'Testing con Jest', fecha: '2024-08-05', asistio: true },
    { id: '12', titulo: 'Mocking en Jest', fecha: '2024-08-12', asistio: true }
  ],
  '91': [
    { id: '13', titulo: 'Intro a Webpack', fecha: '2024-07-01', asistio: true },
    { id: '14', titulo: 'Build optimization', fecha: '2024-07-08', asistio: false }
  ]
};

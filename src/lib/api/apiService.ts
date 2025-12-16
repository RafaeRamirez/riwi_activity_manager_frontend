// Importar mock data para fallback
import { mockEventos, mockCoderEventosInscritos, mockCoderHistorial } from '@/lib/mockData';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1924/api';

// ==================== CODERS ====================

export const codersAPI = {
  // Obtener todos los coders
  getAll: async (sede?: string) => {
    const url = sede ? `${API_URL}/coders?sede=${sede}` : `${API_URL}/Person`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al obtener coders');
    return response.json();
  },

  // Obtener un coder por ID
  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/coders/${id}`);
    if (!response.ok) throw new Error('Error al obtener coder');
    return response.json();
  },

  // Crear un nuevo coder
  create: async (coderData: any) => {
    const response = await fetch(`${API_URL}/coders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coderData),
    });
    if (!response.ok) throw new Error('Error al crear coder');
    return response.json();
  },

  // Actualizar un coder
  update: async (id: string, coderData: any) => {
    const response = await fetch(`${API_URL}/coders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coderData),
    });
    if (!response.ok) throw new Error('Error al actualizar coder');
    return response.json();
  },

  // Eliminar un coder
  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/coders/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar coder');
    return response.json();
  },

  // Obtener eventos inscritos de un coder
  getEventosInscritos: async (coderId: string) => {
    try {
      const response = await fetch(`${API_URL}/coders/${coderId}/eventos`);
      if (!response.ok) throw new Error('Error al obtener eventos inscritos');
      return response.json();
    } catch (error) {
      console.warn('⚠️ API no disponible, usando datos mock de eventos inscritos');
      // Fallback a datos mock - obtener los IDs de eventos inscritos del coder
      const eventosIds = mockCoderEventosInscritos[coderId] || [];
      // Filtrar mockEventos que coincidan con los IDs inscritos
      return mockEventos.filter(e => eventosIds.includes(e.id));
    }
  },

  // Obtener historial de eventos de un coder
  getHistorial: async (coderId: string) => {
    try {
      const response = await fetch(`${API_URL}/coders/${coderId}/historial`);
      if (!response.ok) throw new Error('Error al obtener historial');
      return response.json();
    } catch (error) {
      console.warn('⚠️ API no disponible, usando datos mock de historial');
      // Fallback a datos mock
      return mockCoderHistorial[coderId] || [];
    }
  },

  // Inscribir coder en un evento
  inscribirEnEvento: async (coderId: string, eventoId: string) => {
    try {
      const response = await fetch(`${API_URL}/coders/${coderId}/eventos/${eventoId}/inscribir`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Error al inscribir');
      return response.json();
    } catch (error) {
      console.warn('⚠️ API no disponible, usando inscripción en mock data');
      // Fallback a mock data - agregar evento a la lista de inscritos
      if (!mockCoderEventosInscritos[coderId]) {
        mockCoderEventosInscritos[coderId] = [];
      }
      if (!mockCoderEventosInscritos[coderId].includes(eventoId)) {
        mockCoderEventosInscritos[coderId].push(eventoId);
      }
      return { success: true, message: 'Inscripción guardada en mock data' };
    }
  },

  // Desinscribir coder de un evento
  desinscribirDelEvento: async (coderId: string, eventoId: string) => {
    try {
      const response = await fetch(`${API_URL}/coders/${coderId}/eventos/${eventoId}/desinscribir`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Error al desinscribir');
      return response.json();
    } catch (error) {
      console.warn('⚠️ API no disponible, usando desinscripción en mock data');
      // Fallback a mock data - remover evento de la lista de inscritos
      if (mockCoderEventosInscritos[coderId]) {
        mockCoderEventosInscritos[coderId] = mockCoderEventosInscritos[coderId].filter(id => id !== eventoId);
      }
      return { success: true, message: 'Desinscripción guardada en mock data' };
    }
  },
};

// ==================== EVENTOS ====================

export const eventosAPI = {
  // Obtener todos los eventos
  getAll: async (sede?: string) => {
    try {
      const url = sede ? `${API_URL}/Event?sede=${sede}` : `${API_URL}/Event`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al obtener eventos');
      return response.json();
    } catch (error) {
      console.warn('⚠️ API no disponible, usando datos mock de eventos');
      // Fallback a datos mock
      if (sede) {
        return mockEventos.filter(e => e.sede === sede);
      }
      return mockEventos;
    }
  },

  // Obtener un evento por ID
  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/Event/${id}`);
    if (!response.ok) throw new Error('Error al obtener evento');
    return response.json();
  },

  // Crear un nuevo evento
  create: async (eventoData: any) => {
    const response = await fetch(`${API_URL}/Event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventoData),
    });
    if (!response.ok) throw new Error('Error al crear evento');
    return response.json();
  },

  // Actualizar un evento
  update: async (id: string, eventoData: any) => {
    const response = await fetch(`${API_URL}/Event/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventoData),
    });
    if (!response.ok) throw new Error('Error al actualizar evento');
    return response.json();
  },

  // Eliminar un evento
  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/Event/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar evento');
    return response.json();
  },

  // Obtener inscritos de un evento
  getInscritos: async (eventoId: string) => {
    const response = await fetch(`${API_URL}/eventos/${eventoId}/inscritos`);
    if (!response.ok) throw new Error('Error al obtener inscritos');
    return response.json();
  },

  // Inscribir coder a un evento
  inscribir: async (eventoId: string, coderId: string) => {
    const response = await fetch(`${API_URL}/eventos/${eventoId}/inscribir`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ coderId }),
    });
    if (!response.ok) throw new Error('Error al inscribir');
    return response.json();
  },

  // Desinscribir coder de un evento
  desinscribir: async (eventoId: string, coderId: string) => {
    const response = await fetch(`${API_URL}/eventos/${eventoId}/desinscribir`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ coderId }),
    });
    if (!response.ok) throw new Error('Error al desinscribir');
    return response.json();
  },
};

// ==================== ORGANIZADORES ====================

export const organizadoresAPI = {
  // Obtener todos los organizadores
  getAll: async (sede?: string) => {
    const url = sede ? `${API_URL}/organizadores?sede=${sede}` : `${API_URL}/organizadores`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al obtener organizadores');
    return response.json();
  },

  // Obtener un organizador por ID
  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/organizadores/${id}`);
    if (!response.ok) throw new Error('Error al obtener organizador');
    return response.json();
  },

  // Crear un nuevo organizador
  create: async (organizadorData: any) => {
    const response = await fetch(`${API_URL}/organizadores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(organizadorData),
    });
    if (!response.ok) throw new Error('Error al crear organizador');
    return response.json();
  },

  // Actualizar un organizador
  update: async (id: string, organizadorData: any) => {
    const response = await fetch(`${API_URL}/organizadores/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(organizadorData),
    });
    if (!response.ok) throw new Error('Error al actualizar organizador');
    return response.json();
  },

  // Eliminar un organizador
  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/organizadores/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar organizador');
    return response.json();
  },
};

// ==================== AUTH ====================

export const authAPI = {
  // Login
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Credenciales incorrectas');
    return response.json();
  },

  // Registro
  register: async (userData: any) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Error al registrar');
    return response.json();
  },

  // // Obtener usuario actual
  // getCurrentUser: async (token: string) => {
  //   const response = await fetch(`${API_URL}/auth/me`, {
  //     headers: { 
  //       'Authorization': `Bearer ${token}`,
  //     },
  //   });
  //   if (!response.ok) throw new Error('Error al obtener usuario');
  //   return response.json();
  // },

  // Logout
  logout: async (token: string) => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Error al cerrar sesión');
    return response.json();
  },
};
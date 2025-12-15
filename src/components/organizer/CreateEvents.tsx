// components/organizador/CrearEvento.tsx
'use client';

import { useState } from 'react';
import { eventosAPI } from '@/lib/api/apiService';

interface CrearEventoProps {
  onEventoCreado: () => void;
}

export function CrearEvento({ onEventoCreado }: CrearEventoProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: '',
    ubicacion: '',
    sala: '',
    modalidad: 'Virtual' as 'Virtual' | 'Presencial' | 'Híbrido',
    capacidad: '',
    sede: 'Barranquilla', // TODO: Obtener de la sesión del organizador
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('🔄 Creando evento:', formData);

      // Preparar datos para enviar a la API
      const eventoData = {
        ...formData,
        fecha: new Date(`${formData.fecha}T${formData.hora}`),
        capacidad: parseInt(formData.capacidad),
        inscritos: 0,
      };

      // Llamada a la API
      await eventosAPI.create(eventoData);

      console.log('✅ Evento creado exitosamente');
      
      alert('¡Evento creado exitosamente!');
      
      // Resetear formulario
      setFormData({
        titulo: '',
        descripcion: '',
        fecha: '',
        hora: '',
        ubicacion: '',
        sala: '',
        modalidad: 'Virtual',
        capacidad: '',
        sede: 'Barranquilla',
      });

      // Llamar callback para recargar lista
      onEventoCreado();
    } catch (error: any) {
      console.error('❌ Error al crear evento:', error);
      
      // Manejar errores específicos
      if (error.message?.includes('fecha')) {
        alert('La fecha del evento debe ser futura.');
      } else if (error.message?.includes('capacidad')) {
        alert('La capacidad debe ser mayor a 0.');
      } else {
        alert('Error al crear el evento. Por favor, verifica los datos e intenta de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Crear Nuevo Evento</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Título */}
        <div>
          <label htmlFor="titulo" className="block text-sm font-semibold text-gray-700 mb-2">
            Título del evento <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            placeholder="Ej: Workshop de React Avanzado"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-violet"
          />
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="descripcion" className="block text-sm font-semibold text-gray-700 mb-2">
            Descripción <span className="text-red-500">*</span>
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Describe el evento, objetivos y lo que aprenderán los participantes..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-violet resize-none"
          />
        </div>

        {/* Fecha y Hora */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fecha" className="block text-sm font-semibold text-gray-700 mb-2">
              Fecha <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-violet"
            />
          </div>

          <div>
            <label htmlFor="hora" className="block text-sm font-semibold text-gray-700 mb-2">
              Hora <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="hora"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-violet"
            />
          </div>
        </div>

        {/* Modalidad */}
        <div>
          <label htmlFor="modalidad" className="block text-sm font-semibold text-gray-700 mb-2">
            Modalidad <span className="text-red-500">*</span>
          </label>
          <select
            id="modalidad"
            name="modalidad"
            value={formData.modalidad}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-violet"
          >
            <option value="Virtual">Virtual</option>
            <option value="Presencial">Presencial</option>
            <option value="Híbrido">Híbrido</option>
          </select>
        </div>

        {/* Ubicación y Sala */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ubicacion" className="block text-sm font-semibold text-gray-700 mb-2">
              Ubicación <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="ubicacion"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              required
              placeholder="Ej: Remoto Vía: Zoom"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-violet"
            />
          </div>

          <div>
            <label htmlFor="sala" className="block text-sm font-semibold text-gray-700 mb-2">
              Sala
            </label>
            <input
              type="text"
              id="sala"
              name="sala"
              value={formData.sala}
              onChange={handleChange}
              placeholder="Ej: Sala 1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-violet"
            />
          </div>
        </div>

        {/* Capacidad */}
        <div>
          <label htmlFor="capacidad" className="block text-sm font-semibold text-gray-700 mb-2">
            Capacidad máxima <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="capacidad"
            name="capacidad"
            value={formData.capacidad}
            onChange={handleChange}
            required
            min="1"
            placeholder="Ej: 30"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-violet"
          />
        </div>

        {/* Botones */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-riwi-violet hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creando...' : 'Crear Evento'}
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm('¿Descartar los cambios?')) {
                setFormData({
                  titulo: '',
                  descripcion: '',
                  fecha: '',
                  hora: '',
                  ubicacion: '',
                  sala: '',
                  modalidad: 'Virtual',
                  capacidad: '',
                  sede: 'Barranquilla',
                });
              }
            }}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}
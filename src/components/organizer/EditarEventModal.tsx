// components/organizador/EditarEventoModal.tsx
'use client';

import { useState, useEffect } from 'react';
import type { Event } from '@/types/event';

interface EditarEventoModalProps {
  evento: Event;
  onClose: () => void;
  onSave: (evento: Event) => void;
}

export function EditarEventoModal({ evento, onClose, onSave }: EditarEventoModalProps) {
  const [formData, setFormData] = useState({
    titulo: evento.titulo,
    descripcion: evento.descripcion,
    fecha: new Date(evento.fecha).toISOString().split('T')[0],
    hora: new Date(evento.fecha).toTimeString().slice(0, 5),
    ubicacion: evento.ubicacion || '',
    sala: evento.sala || '',
    modalidad: evento.modalidad || 'Virtual',
    capacidad: evento.capacidad?.toString() || '',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const eventoActualizado: Event = {
        ...evento,
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        fecha: new Date(`${formData.fecha}T${formData.hora}`),
        ubicacion: formData.ubicacion,
        sala: formData.sala,
        modalidad: formData.modalidad as 'Virtual' | 'Presential' | 'Híbrido',
        capacidad: parseInt(formData.capacidad),
      };

      onSave(eventoActualizado);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-500 p-6 text-white rounded-t-lg flex items-center justify-between">
          <h2 className="text-2xl font-bold">Editar Evento</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Fecha y Hora */}
          <div className="grid grid-cols-2 gap-4">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Virtual">Virtual</option>
              <option value="Presencial">Presencial</option>
              <option value="Híbrido">Híbrido</option>
            </select>
          </div>

          {/* Ubicación y Sala */}
          <div className="grid grid-cols-2 gap-4">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
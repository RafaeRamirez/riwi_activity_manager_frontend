'use client';

import { useState, useEffect } from 'react';

interface Coder {
  id: string;
  nombre: string;
  email: string;
  sede: string;
  cohorte: string;
  fechaIngreso: Date;
  telefono?: string;
}

interface CoderFormModalProps {
  coder?: Coder;
  onClose: () => void;
  onSave: (coder: any) => void;
  title: string;
}

export function CoderFormModal({ coder, onClose, onSave, title }: CoderFormModalProps) {
  const [formData, setFormData] = useState({
    nombre: coder?.nombre || '',
    email: coder?.email || '',
    sede: coder?.sede || 'Barranquilla',
    cohorte: coder?.cohorte || '',
    fechaIngreso: coder ? new Date(coder.fechaIngreso).toISOString().split('T')[0] : '',
    telefono: coder?.telefono || '',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const coderData = {
        ...coder,
        ...formData,
        fechaIngreso: new Date(formData.fechaIngreso),
      };
      onSave(coderData);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-riwi-green p-6 text-white rounded-t-lg flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>
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
          {/* Nombre */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre Completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Juan Pérez"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-green"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="juan.perez@riwi.io"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-green"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="telefono" className="block text-sm font-semibold text-gray-700 mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="+57 300 123 4567"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-green"
            />
          </div>

          {/* Sede y Cohorte */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="sede" className="block text-sm font-semibold text-gray-700 mb-2">
                Sede <span className="text-red-500">*</span>
              </label>
              <select
                id="sede"
                name="sede"
                value={formData.sede}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-green"
              >
                <option value="Barranquilla">Barranquilla</option>
                <option value="Medellín">Medellín</option>
              </select>
            </div>

            <div>
              <label htmlFor="cohorte" className="block text-sm font-semibold text-gray-700 mb-2">
                Cohorte <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="cohorte"
                name="cohorte"
                value={formData.cohorte}
                onChange={handleChange}
                required
                placeholder="Cohorte 15"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-green"
              />
            </div>
          </div>

          {/* Fecha de Ingreso */}
          <div>
            <label htmlFor="fechaIngreso" className="block text-sm font-semibold text-gray-700 mb-2">
              Fecha de Ingreso <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="fechaIngreso"
              name="fechaIngreso"
              value={formData.fechaIngreso}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-riwi-green"
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
              className="flex-1 px-4 py-2 bg-riwi-green text-white rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Guardando...' : coder ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
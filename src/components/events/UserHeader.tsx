// components/eventos/UserHeader.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import type { UserHeaderProps } from '@/types/event';
import { useRouter } from 'next/navigation';



export function UserHeader({ nombre, iniciales, role }: UserHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    const router = useRouter();
    console.log('Cerrando sesión...');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="bg-gradient-to-r from-riwi-violet to-purple-500 rounded-lg shadow-lg p-6 mb-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white">
        {nombre}
      </h1>
      
      {/* Avatar con menú dropdown */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-12 h-12 rounded-full bg-riwi-orange flex items-center justify-center text-white font-bold text-lg hover:bg-riwi-yellow transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600"
        >
          {iniciales}
        </button>

        {/* Menú desplegable */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
            <div className="px-4 py-2 border-b border-gray-200">
              <p className="text-sm font-semibold text-gray-900">{nombre}</p>
              <p className="text-xs text-gray-500 capitalize">{role}</p>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
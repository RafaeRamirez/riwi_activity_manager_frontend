// components/admin/AdminDashboard.tsx
'use client';

import { useState } from 'react';
import { UserHeader } from '../events/UserHeader';
import { AdminCodersList } from './AdminCoderList';
import { AdminOrganizadoresList } from './AdminOrganizerList';
import { AdminEventosList } from './AdminEventosList';
import type { UserRole } from '@/types/event';

interface AdminDashboardProps {
    userName: string;
    userInitials: string;
    userRole: UserRole;
}

interface AdminStats {
    totalCoders: number;
    totalOrganizadores: number;
    totalEventos: number;
}

type Section = 'coders' | 'organizadores' | 'eventos' | null;

export function AdminDashboard({
    userName,
    userInitials,
    userRole
}: AdminDashboardProps) {
    const [activeSection, setActiveSection] = useState<Section>(null);
    const [stats, setStats] = useState<AdminStats>({
        totalCoders: 0,
        totalOrganizadores: 0,
        totalEventos: 0,
    });

    const handleSectionClick = (section: Section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header con usuario */}
                <UserHeader
                    nombre={userName}
                    iniciales={userInitials}
                    role={userRole}
                />

                {/* Estadísticas generales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Coders</p>
                                <p className="text-3xl font-bold text-riwi-green">{stats.totalCoders}</p>
                                <p className="text-xs text-gray-500 mt-1">Todas las sedes</p>
                            </div>
                            <div className="w-12 h-12 bg-riwi-green/10 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-riwi-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Organizadores</p>
                                <p className="text-3xl font-bold text-riwi-yellow">{stats.totalOrganizadores}</p>
                                <p className="text-xs text-gray-500 mt-1">Personal activo</p>
                            </div>
                            <div className="w-12 h-12 bg-riwi-yellow/10 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-riwi-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Eventos Totales</p>
                                <p className="text-3xl font-bold text-riwi-orange">{stats.totalEventos}</p>
                                <p className="text-xs text-gray-500 mt-1">Activos y pasados</p>
                            </div>
                            <div className="w-12 h-12 bg-riwi-orange/10 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-riwi-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección de botones principales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Card Gestión de Coders */}
                    <button
                        onClick={() => handleSectionClick('coders')}
                        className={`bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg ${activeSection === 'coders' ? 'ring-4 ring-riwi-green' : ''
                            }`}
                    >
                        <div className="relative h-48 bg-linear-to-br from-riwi-green to-riwi-yellow flex items-center justify-center">
                            <div className="text-center text-white">
                                <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <h3 className="text-2xl font-bold">Gestión de Coders</h3>
                                <p className="text-sm opacity-90 mt-1">CRUD completo</p>
                            </div>
                        </div>
                    </button>

                    {/* Card Gestión de Organizadores */}
                    <button
                        onClick={() => handleSectionClick('organizadores')}
                        className={`bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg ${activeSection === 'organizadores' ? 'ring-4 ring-riwi-yellow' : ''
                            }`}
                    >
                        <div className="relative h-48 bg-linear-to-br from-riwi-yellow to-riwi-orange flex items-center justify-center">
                            <div className="text-center text-white">
                                <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <h3 className="text-2xl font-bold">Organizadores</h3>
                                <p className="text-sm opacity-90 mt-1">Gestionar staff</p>
                            </div>
                        </div>
                    </button>

                    {/* Card Gestión de Eventos */}
                    <button
                        onClick={() => handleSectionClick('eventos')}
                        className={`bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg ${activeSection === 'eventos' ? 'ring-4 ring-riwi-orange' : ''
                            }`}
                    >
                        <div className="relative h-48 bg-linear-to-br from-riwi-orange to-riwi-violet flex items-center justify-center">
                            <div className="text-center text-white">
                                <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <h3 className="text-2xl font-bold">Gestión de Eventos</h3>
                                <p className="text-sm opacity-90 mt-1">Todas las sedes</p>
                            </div>
                        </div>
                    </button>
                </div>

                {/* Contenido dinámico según la sección activa */}
                <div className="transition-all duration-300">
                    {activeSection === 'coders' && <AdminCodersList />}
                    {activeSection === 'organizadores' && <AdminOrganizadoresList />}
                    {activeSection === 'eventos' && <AdminEventosList />}
                </div>
            </div>
        </div>
    );
}
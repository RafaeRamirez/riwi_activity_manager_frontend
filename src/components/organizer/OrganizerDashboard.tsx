'use client';

import { useState } from 'react';
import { UserHeader } from '../events/UserHeader';
import { CodersList } from './CoderList';
import { EventosManager } from './EventsManager';
import { CrearEvento } from './CreateEvents';
import type { UserRole } from '@/types/event';

interface OrganizerDashboardProps {
    userName: string;
    userInitials: string;
    userRole: UserRole;
    sede: string;
}

type Section = 'coders' | 'eventos' | 'crear';

export function OrganizerDashboard({
    userName,
    userInitials,
    userRole,
    sede
}: OrganizerDashboardProps) {
    const [activeSection, setActiveSection] = useState<Section | null>(null);

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

                {/* Sección de botones principales */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {/* Card Coders */}
                    <button
                        onClick={() => handleSectionClick('coders')}
                        className={`bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg ${activeSection === 'coders' ? 'ring-4 ring-riwi-green' : ''
                            }`}
                    >
                        <div className="relative h-48">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop"
                                alt="Coders"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end">
                                <h3 className="text-white text-2xl font-bold p-4">Coders</h3>
                            </div>
                        </div>
                    </button>

                    {/* Card Eventos */}
                    <button
                        onClick={() => handleSectionClick('eventos')}
                        className={`bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg ${activeSection === 'eventos' ? 'ring-4 ring-riwi-orange' : ''
                            }`}
                    >
                        <div className="relative h-48">
                            <img
                                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop"
                                alt="Eventos"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end">
                                <h3 className="text-white text-2xl font-bold p-4">Events</h3>
                            </div>
                        </div>
                    </button>

                    {/* Card Create Event */}
                    <button
                        onClick={() => handleSectionClick('crear')}
                        className={`bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg md:col-span-2 lg:col-span-1 ${activeSection === 'crear' ? 'ring-4 ring-riwi-violet' : ''
                            }`}
                    >
                        <div className="relative h-48 bg-linear-to-br from-riwi-violet to-riwi-purple flex items-center justify-center">
                            <div className="text-center text-white">
                                <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <h3 className="text-2xl font-bold">Create Event</h3>
                            </div>
                        </div>
                    </button>
                </div>

                {/* Dynamic content based on the active section */}
                <div className="transition-all duration-300">
                    {activeSection === 'coders' && <CodersList sede={sede} />}
                    {activeSection === 'eventos' && <EventosManager sede={sede} />}
                    {activeSection === 'crear' && <CrearEvento onEventoCreado={() => setActiveSection('eventos')} />}
                </div>
            </div>
        </div>
    );
}
export interface Event {
  id: string;
  fecha: Date;
  titulo: string;
  descripcion: string;
  ubicacion?: string;
  modalidad?: 'Presential' | 'Virtual' | 'Híbrido';
  capacidad?: number;
  inscritos?: number;
  sala?: string;
}

export interface EventAgroup {
  mes: string;
  anio: number;
  eventos: EventDay[];
}

export interface EventDay {
  dia: number;
  diaSemana: string;
  mes: string;
  eventos: Event[];
}

export type UserRole = 'admin' | 'organizer' | 'coder';

export interface UserHeaderProps {
  nombre: string;
  iniciales: string;
  role: UserRole;
}
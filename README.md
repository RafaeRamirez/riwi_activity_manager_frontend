# 🎓 Riwi Events - Sistema de Gestión de Eventos

Sistema integral para la gestión de eventos, coders y organizadores de Riwi con roles diferenciados (Coder, Organizador y Admin).

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Roles y Funcionalidades](#-roles-y-funcionalidades)
- [API Endpoints](#-api-endpoints)
- [Scripts Disponibles](#-scripts-disponibles)
- [Variables de Entorno](#-variables-de-entorno)
- [Colores y Diseño](#-colores-y-diseño)

## ✨ Características

### 🎯 Funcionalidades Principales

- **Gestión de Eventos**: CRUD completo de eventos con inscripciones
- **Gestión de Usuarios**: Manejo de Coders y Organizadores
- **Sistema Multi-sede**: Soporte para Barranquilla y Medellín
- **Inscripciones en Tiempo Real**: Sistema de inscripción/desinscripción a eventos
- **Historial de Asistencias**: Tracking de asistencias y faltas
- **Dashboard por Roles**: Interfaces específicas para cada tipo de usuario
- **Filtros Avanzados**: Búsqueda y filtrado por múltiples criterios
- **Responsive Design**: Optimizado para desktop, tablet y móvil

## 🛠️ Tecnologías

- **Framework**: [Next.js 16](https://nextjs.org/) - App Router
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Fuente**: Ubuntu Font Family (Google Fonts)
- **Iconos**: Lucide React
- **Gestión de Estado**: React Hooks (useState, useEffect)

## 📦 Requisitos Previos

- Node.js 18.x o superior
- npm o yarn
- Backend API corriendo (ver sección de API)

## 🚀 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/riwi-events.git
cd riwi-events
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
# o
yarn dev
```

5. **Abrir en el navegador**
```
http://localhost:3000
```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# URL del Backend
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Opcional: Base URL del frontend (para producción)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Conectar con el Backend

1. Asegúrate de que tu backend esté corriendo
2. Configura la URL correcta en `.env.local`
3. Los servicios de API están en `lib/api/apiService.ts`

## 📁 Estructura del Proyecto

```
riwi-events/
├── app/
│   ├── layout.tsx              # Layout principal con fuente Ubuntu
│   ├── page.tsx                # Página de inicio
│   ├── coder/
│   │   └── page.tsx            # Vista del Coder
│   ├── organizador/
│   │   └── page.tsx            # Vista del Organizador
│   └── admin/
│       └── page.tsx            # Vista del Admin
├── components/
│   ├── layout/
│   │   └── Header.tsx          # Navegación global
│   ├── auth/
│   │   ├── AuthLayout.tsx      # Layout de autenticación
│   │   ├── DecorativePanel.tsx # Panel decorativo
│   │   ├── LoginForm.tsx       # Formulario de login
│   │   └── RegisterForm.tsx    # Formulario de registro
│   ├── eventos/
│   │   ├── EventosLayout.tsx   # Layout principal de eventos
│   │   ├── EventList.tsx       # Lista de eventos
│   │   ├── EventCard.tsx       # Card individual de evento
│   │   ├── EventFilters.tsx    # Filtros de eventos
│   │   ├── EventoModal.tsx     # Modal de detalle de evento
│   │   └── UserHeader.tsx      # Header con usuario y avatar
│   ├── organizador/
│   │   ├── OrganizerDashboard.tsx     # Dashboard del organizador
│   │   ├── CodersList.tsx             # Lista de coders
│   │   ├── EventosManager.tsx         # Gestión de eventos
│   │   ├── CrearEvento.tsx            # Formulario crear evento
│   │   ├── EditarEventoModal.tsx      # Modal editar evento
│   │   ├── InscritosModal.tsx         # Modal de inscritos
│   │   └── CoderDetailModal.tsx       # Modal detalle de coder
│   └── admin/
│       ├── AdminDashboard.tsx         # Dashboard del admin
│       ├── AdminCodersList.tsx        # Gestión de coders
│       ├── AdminOrganizadoresList.tsx # Gestión de organizadores
│       ├── AdminEventosList.tsx       # Gestión de eventos
│       ├── CoderFormModal.tsx         # Formulario coder
│       └── OrganizadorFormModal.tsx   # Formulario organizador
├── lib/
│   └── api/
│       └── apiService.ts       # Servicios de API
├── types/
│   └── evento.ts               # Tipos TypeScript
├── globals.css                 # Estilos globales + Tailwind v4
└── tailwind.config.ts          # Configuración de Tailwind (opcional)
```

## 👥 Roles y Funcionalidades

### 🎯 Coder
- ✅ Ver todos los eventos disponibles
- ✅ Inscribirse/desinscribirse de eventos
- ✅ Ver eventos en los que está inscrito
- ✅ Filtrar eventos por título, fecha, modalidad
- ✅ Ver detalles completos de cada evento
- ✅ Badge visual de eventos inscritos

### 📊 Organizador
Gestiona su sede específica (Barranquilla o Medellín):

#### Gestión de Coders
- ✅ Ver lista de coders de su sede
- ✅ Ver detalles completos de cada coder
- ✅ Ver eventos inscritos de cada coder
- ✅ Ver historial de asistencias/faltas
- ✅ Desinscribir coders de eventos
- ✅ Eliminar coders

#### Gestión de Eventos
- ✅ Crear nuevos eventos
- ✅ Editar eventos existentes
- ✅ Eliminar eventos
- ✅ Ver lista de inscritos por evento
- ✅ Desinscribir coders desde el evento
- ✅ Filtrar eventos

### 👑 Admin
Control total del sistema en todas las sedes:

#### Gestión de Coders
- ✅ Ver coders de todas las sedes
- ✅ Crear nuevos coders
- ✅ Editar información de coders
- ✅ Eliminar coders
- ✅ Ver detalles, eventos e historial
- ✅ Filtrar por sede (Barranquilla/Medellín)

#### Gestión de Organizadores
- ✅ Ver organizadores de todas las sedes
- ✅ Crear nuevos organizadores
- ✅ Editar información de organizadores
- ✅ Eliminar organizadores
- ✅ Asignar roles (Coordinador/Organizador/Asistente)

#### Gestión de Eventos
- ✅ Ver eventos de todas las sedes
- ✅ Crear nuevos eventos
- ✅ Editar eventos
- ✅ Eliminar eventos
- ✅ Ver inscritos de cualquier evento
- ✅ Gestionar inscripciones

#### Dashboard
- ✅ Estadísticas generales del sistema
- ✅ Total de coders, organizadores y eventos
- ✅ Vista consolidada de todas las sedes

## 🔌 API Endpoints

### Coders
```typescript
GET    /api/coders              // Obtener todos los coders
GET    /api/coders?sede=X       // Filtrar por sede
GET    /api/coders/:id          // Obtener un coder
POST   /api/coders              // Crear coder
PUT    /api/coders/:id          // Actualizar coder
DELETE /api/coders/:id          // Eliminar coder
GET    /api/coders/:id/eventos  // Eventos inscritos
GET    /api/coders/:id/historial // Historial de eventos
```

### Eventos
```typescript
GET    /api/eventos                      // Obtener todos los eventos
GET    /api/eventos?sede=X               // Filtrar por sede
GET    /api/eventos/:id                  // Obtener un evento
POST   /api/eventos                      // Crear evento
PUT    /api/eventos/:id                  // Actualizar evento
DELETE /api/eventos/:id                  // Eliminar evento
GET    /api/eventos/:id/inscritos        // Obtener inscritos
POST   /api/eventos/:id/inscribir        // Inscribir coder
POST   /api/eventos/:id/desinscribir     // Desinscribir coder
```

### Organizadores
```typescript
GET    /api/organizadores        // Obtener todos los organizadores
GET    /api/organizadores?sede=X // Filtrar por sede
GET    /api/organizadores/:id    // Obtener un organizador
POST   /api/organizadores         // Crear organizador
PUT    /api/organizadores/:id     // Actualizar organizador
DELETE /api/organizadores/:id     // Eliminar organizador
```

### Autenticación
```typescript
POST   /api/auth/login           // Iniciar sesión
POST   /api/auth/register        // Registrar usuario
GET    /api/auth/me              // Obtener usuario actual
POST   /api/auth/logout          // Cerrar sesión
```

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo en puerto 3000

# Producción
npm run build        # Construye la aplicación para producción
npm run start        # Inicia servidor de producción

# Linting
npm run lint         # Ejecuta ESLint
```

## 🎨 Colores y Diseño

### Paleta de Colores Riwi

```css
--riwi-green: #5ACCA4;   /* Verde Riwi */
--riwi-yellow: #E6CA52;  /* Amarillo Riwi */
--riwi-purple: #EAA2FC;  /* Morado claro Riwi */
--riwi-orange: #FF6655;  /* Naranja Riwi */
--riwi-violet: #985DFF;  /* Violeta Riwi */
```

### Uso en Tailwind

```tsx
// Texto
<p className="text-riwi-green">Texto verde</p>

// Fondo
<div className="bg-riwi-violet">Fondo violeta</div>

// Gradientes
<div className="bg-gradient-to-r from-riwi-violet to-riwi-purple">
  Gradiente
</div>

// Con opacidad
<div className="bg-riwi-orange/20">Fondo naranja 20%</div>
```

### Fuente

- **Familia**: Ubuntu (Google Fonts)
- **Pesos disponibles**: 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold)

## 🔐 Autenticación

El sistema utiliza autenticación basada en JWT (si está implementada en el backend).

```typescript
// Obtener token
const token = localStorage.getItem('token');

// Incluir en headers
headers: {
  'Authorization': `Bearer ${token}`
}
```

## 📱 Responsive Design

El sistema es completamente responsive con breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🐛 Debugging

```typescript
// Todos los errores se manejan con try-catch
try {
  const data = await codersAPI.getAll();
  console.log('✅ Datos recibidos:', data);
} catch (error) {
  console.error('❌ Error:', error);
}
```

## 📄 Licencia

Este proyecto es privado y pertenece a Riwi.

---

## 🚀 Próximos Pasos

- [ ] Implementar notificaciones en tiempo real
- [ ] Agregar sistema de notificaciones por email
- [ ] Dashboard con gráficas y estadísticas
- [ ] Exportar reportes en PDF/Excel
- [ ] Sistema de comentarios en eventos
- [ ] Calendario visual de eventos
- [ ] App móvil nativa

## 📞 Soporte

Para soporte o preguntas:
- Email: dev@riwi.io
- Slack: #riwi-events-support

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Dónde integrar el backend después:
1. En el handleSubmit del RegisterForm:
typescript// Reemplazar esta simulación:
await new Promise(resolve => setTimeout(resolve, 1500))

// Por esto:
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fullName: formData.fullName,
    email: formData.email,
    password: formData.password,
    location: formData.location
  })
})

if (!response.ok) {
  const error = await response.json()
  throw new Error(error.message)
}
2. En los botones OAuth:
typescript// Reemplazar:
alert(`Registro con ${provider} - Pendiente de integración`)

// Por:
signIn(provider, { callbackUrl: '/dashboard' })







Coder:
          id: '4',
          nombre: 'Ana Martínez',
          email: 'ana.martinez@riwi.io',
          sede: 'Medellín',
          cohorte: 'Cohorte 15',
          fechaIngreso: new Date('2024-01-15'),
          telefono: '+57 303 456 7890'
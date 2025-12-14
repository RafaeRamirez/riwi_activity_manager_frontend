// components/auth/AuthLayout.tsx

import { DecorativePanel } from '@/components/ui/DecorativePanel';

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="w-full md:w-[65%] max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row md:ml-10">
        
        {/* Panel decorativo */}
        <DecorativePanel />

        {/* Panel derecho con contenido */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-block">
                <h1 className="text-4xl font-bold">
                  <span className="text-riwi-violet">&lt;/</span>
                  <span className="text-gray-900">Riwi</span>
                  <span className="text-riwi-violet">&gt;</span>
                </h1>
                <p className="text-riwi-violet text-sm font-medium -mt-2">Events</p>
              </div>
            </div>

            {/* Título */}
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              {title}
            </h2>

            {/* Contenido (formulario) */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
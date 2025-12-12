import { RegisterForm } from '../../components/auth/RegisterForm'

export default function RegisterPage() {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-100">
            <div className="w-full md:w-[65%] max-w-4xl bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row md:ml-10">
                {/* Panel izquierdo con diseño decorativo */}
                <div className="w-full md:w-1/2 h-52 md:h-auto bg-orange-400 flex items-center justify-center relative">
                    {/* Formas decorativas */}
                    <div className="hidden md:block w-full h-full relative">
                        <div className="absolute bottom-12 left-8 flex flex-col gap-4">

                            {/* Barra verde */}
                            <div className="w-52 h-11 bg-[var(--riwi-green)] rounded-full shadow-md"></div>

                            {/* Barra amarilla */}
                            <div className="w-52 h-11 ml-14 bg-[var(--riwi-yellow)] rounded-full shadow-md"></div>

                            <div className='flex gap-3'>
                                {/* Barra rosada */}
                                <div className="w-52 h-11 bg-[var(--riwi-purple)] rounded-full shadow-md"></div>

                                {/* Barra naranja */}
                                <div className="w-24 h-11 bg-[var(--riwi-violet)] rounded-full shadow-md"></div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Panel derecho con formulario */}
                <div className="flex-1 flex items-center justify-center px-6 py-4 bg-white">
                    <div className="w-full max-w-md">
                        {/* Logo */}
                        <div className="text-center mb-8">
                            <div className="inline-block">
                                <h1 className="text-4xl font-bold">
                                    <span className="text-primary">&lt;/</span>
                                    <span className="text-gray-900">Riwi</span>
                                    <span className="text-primary">&gt;</span>
                                </h1>
                                <p className="text-primary text-sm font-medium mt-1">Events</p>
                            </div>
                        </div>

                        {/* Título */}
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                            CREATE ACCOUNT
                        </h2>
                        <p className="text-center text-gray-600 mb-8">
                            Sign up to start exploring events
                        </p>

                        {/* Formulario */}
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
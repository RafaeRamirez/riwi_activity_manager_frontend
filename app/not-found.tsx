export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>

      <p className="mt-4 text-xl text-gray-600">
        Ups... la página que buscas no existe o fue movida.
      </p>

      <a
        href="/login"
        className="mt-6 inline-block px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
      >
        Volver al inicio
      </a>
    </div>
  );
}

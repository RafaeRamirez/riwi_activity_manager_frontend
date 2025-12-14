export function DecorativePanel() {
  return (
    <div className="w-full md:w-1/2 h-52 md:h-auto bg-riwi-violet flex items-center justify-center relative">
      {/* Formas decorativas */}
      <div className="hidden md:block w-full h-full relative">
        <div className="absolute bottom-12 left-8 flex flex-col gap-4">
          {/* Barra verde */}
          <div className="w-52 h-11 bg-riwi-green rounded-full shadow-md"></div>

          {/* Barra amarilla */}
          <div className="w-52 h-11 ml-14 bg-riwi-yellow rounded-full shadow-md"></div>

          <div className="flex gap-3">
            {/* Barra rosada */}
            <div className="w-52 h-11 bg-riwi-purple rounded-full shadow-md"></div>

            {/* Barra naranja */}
            <div className="w-24 h-11 bg-riwi-orange rounded-full shadow-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
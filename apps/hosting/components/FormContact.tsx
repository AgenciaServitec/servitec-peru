export const FormContact = () => {
  return (
    <div className="text-white px-6 py-8 md:px-12 lg:px-20">
      <h2 className="text-3xl font-bold mb-8">¡CONTÁCTANOS!</h2>
      <form action="" className="bg-gray-900 p-8 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Nombres y Apellidos"
            className="bg-gray-800 text-gray px-4 py-3 rounded-lg border border-gray-700"
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            className="bg-gray-800 text-gray px-4 py-3 rounded-lg border border-gray-700"
          />
          <input
            type="text"
            placeholder="Teléfono"
            className="bg-gray-800 text-gray px-4 py-3 rounded-lg border border-gray-700"
          />
          <input
            type="text"
            placeholder="Dirección"
            className="bg-gray-800 text-gray px-4 py-3 rounded-lg border border-gray-700"
          />
        </div>
        <textarea
          name="textarea"
          id=""
          placeholder="Dejanos un mensaje"
          className="w-full mt-6 bg-gray-800 text-gray-300 px-4 py-3 rounded-lg border border-gray-700 resize-none"
        ></textarea>
        <div className="pt-5 flex justify-center">
          <button
            type="submit"
            className="px-10 py-3 bg-yellow-500 hover:bg-yellow-300 rounded-lg font-semibold text-black"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

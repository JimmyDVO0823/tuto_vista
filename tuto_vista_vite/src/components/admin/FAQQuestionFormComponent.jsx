import React from 'react';

const FAQQuestionFormComponent = ({ faqCategorias, nuevaPregunta, setNuevaPregunta, handleCrearPregunta }) => {
  return (
    <form onSubmit={handleCrearPregunta} className="space-y-4 mb-8">
      <div>
        <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Categoría</label>
        <select
          value={nuevaPregunta.tipoId}
          onChange={e => setNuevaPregunta({ ...nuevaPregunta, tipoId: e.target.value })}
          className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary"
        >
          <option value="">Selecciona una categoría</option>
          {faqCategorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Pregunta</label>
        <input
          type="text"
          value={nuevaPregunta.pregunta}
          onChange={e => setNuevaPregunta({ ...nuevaPregunta, pregunta: e.target.value })}
          className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary"
          placeholder="Ej. ¿Cómo cambio mi contraseña?"
        />
      </div>
      <div>
        <label className="text-xs font-bold text-elegant-gray uppercase block mb-1">Respuesta</label>
        <textarea
          value={nuevaPregunta.respuesta}
          onChange={e => setNuevaPregunta({ ...nuevaPregunta, respuesta: e.target.value })}
          className="w-full px-3 py-2 bg-surface-container-low rounded border border-outline-variant/30 text-sm text-primary h-24"
          placeholder="Escribe la respuesta detallada..."
        />
      </div>
      <button type="submit" className="w-full py-2.5 signature-gradient text-white rounded text-xs font-bold shadow transition-all">
        Añadir Pregunta
      </button>
    </form>
  );
};

export default FAQQuestionFormComponent;

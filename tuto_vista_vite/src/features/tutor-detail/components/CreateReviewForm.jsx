import React, { useState } from "react";
import { api } from "../../../services/api";
import toast from "react-hot-toast";

const CreateReviewForm = ({ tutorId, estudianteId, onCancel, onSuccess }) => {
  const [puntuacion, setPuntuacion] = useState(5);
  const [hoverValue, setHoverValue] = useState(null);
  const [comentario, setComentario] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/resenas", {
        tutorId,
        estudianteId,
        puntuacion,
        comentario,
      });
      toast.success("¡Gracias por tu reseña!");
      onSuccess();
    } catch (error) {
      console.error("Error al crear reseña:", error);
      toast.error("No se pudo enviar la reseña");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface p-6 rounded-2xl border border-academic-gold/20 shadow-sm space-y-6 animate-in zoom-in-95 duration-300"
    >
      <div className="flex justify-between items-center">
        <h4 className="font-headline font-bold text-lg text-primary">
          Califica a tu tutor
        </h4>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-widest text-elegant-gray block font-display">
          Puntuación
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => {
            const displayValue = hoverValue ?? puntuacion;
            const isFull = star <= displayValue;
            const isHalf = star - 0.5 === displayValue;

            return (
              <div 
                key={star} 
                className="relative w-8 h-8 flex items-center justify-center transition-transform hover:scale-110"
              >
                {/* Zonas de clic para media estrella */}
                <div 
                  className="absolute left-0 top-0 w-1/2 h-full z-20 cursor-pointer"
                  onClick={() => setPuntuacion(star - 0.5)}
                  onMouseEnter={() => setHoverValue(star - 0.5)}
                  onMouseLeave={() => setHoverValue(null)}
                />
                <div 
                  className="absolute right-0 top-0 w-1/2 h-full z-20 cursor-pointer"
                  onClick={() => setPuntuacion(star)}
                  onMouseEnter={() => setHoverValue(star)}
                  onMouseLeave={() => setHoverValue(null)}
                />

                <span
                  className={`material-symbols-outlined text-3xl select-none transition-colors ${
                    isFull || isHalf ? "text-academic-gold" : "text-gray-300"
                  }`}
                  style={{
                    fontVariationSettings: isFull ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {isFull ? "star" : isHalf ? "star_half" : "star"}
                </span>
              </div>
            );
          })}
          <span className="ml-4 text-xl font-black text-primary font-display min-w-[3rem]">
            {puntuacion.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-widest text-elegant-gray block font-display">
          Tu opinión
        </label>
        <textarea
          required
          rows="4"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Cuéntanos qué te pareció el tutor, su metodología, etc..."
          className="w-full px-4 py-3 bg-white border border-outline-variant/20 rounded-xl text-sm font-medium focus:outline-none focus:border-academic-gold transition-colors resize-none font-display shadow-inner"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 signature-gradient text-white font-bold rounded-xl shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 font-display"
      >
        {submitting ? (
          <span className="animate-spin material-symbols-outlined text-sm">
            progress_activity
          </span>
        ) : (
          <span className="material-symbols-outlined text-sm">send</span>
        )}
        {submitting ? "Enviando..." : "Publicar Reseña"}
      </button>
    </form>
  );
};

export default CreateReviewForm;

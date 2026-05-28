import React, { useState } from "react";
import { api } from "../../../services/api";
import toast from "react-hot-toast";

const CreateReviewForm = ({ tutorId, estudianteId, onCancel, onSuccess }) => {
  const [puntuacion, setPuntuacion] = useState(5);
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
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setPuntuacion(star)}
              className={`text-2xl transition-all ${star <= puntuacion ? "text-academic-gold scale-110" : "text-gray-300 hover:text-academic-gold/50"}`}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontVariationSettings:
                    star <= puntuacion ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                star
              </span>
            </button>
          ))}
          <span className="ml-4 text-xl font-black text-primary font-display">
            {puntuacion}.0
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

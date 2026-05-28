import React, { useState } from 'react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

const ReportTutorButton = ({ tutorId, tutorName }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [motivo, setMotivo] = useState('COMPORTAMIENTO_INAPROPIADO');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const motivosOptions = [
    { value: 'NO_ASISTIO', label: 'No asistió a la sesión' },
    { value: 'COMPORTAMIENTO_INAPROPIADO', label: 'Comportamiento inapropiado' },
    { value: 'CONTENIDO_INADECUADO', label: 'Contenido inadecuado' },
    { value: 'FRAUDE', label: 'Sospecha de fraude' },
    { value: 'OTRO', label: 'Otro motivo' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('Debes iniciar sesión para reportar.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await api.post('/reportes', {
        reportado_a: tutorId,
        motivo,
        descripcion
      });
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
        setDescripcion('');
        setMotivo('COMPORTAMIENTO_INAPROPIADO');
      }, 3000);
    } catch (err) {
      console.error('Error al enviar el reporte:', err);
      setError(err.message || 'Hubo un error al enviar el reporte.');
    } finally {
      setLoading(false);
    }
  };

  // No mostrar si no hay usuario, o si el usuario es el mismo tutor
  if (!user || user.id === tutorId) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200 shadow-sm"
      >
        <span className="material-symbols-outlined text-[16px]">flag</span>
        Reportar Tutor
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between bg-surface-container-low">
              <h3 className="font-headline text-xl font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-red-600">report_problem</span>
                Reportar a {tutorName || 'Tutor'}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-on-surface-variant hover:text-primary transition-colors"
                disabled={loading}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6">
              {success ? (
                <div className="text-center py-8 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-green-600 text-3xl">check_circle</span>
                  </div>
                  <h4 className="font-bold text-lg text-primary mb-2">Reporte Enviado</h4>
                  <p className="text-on-surface-variant text-sm">
                    Hemos recibido tu reporte. Nuestro equipo de moderación lo revisará a la brevedad.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg animate-in slide-in-from-top-2">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="font-label text-[10px] uppercase font-black tracking-widest text-on-surface-variant/60 block">
                      Motivo del Reporte
                    </label>
                    <select
                      value={motivo}
                      onChange={(e) => setMotivo(e.target.value)}
                      className="w-full bg-surface border border-black/10 rounded-xl px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    >
                      {motivosOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-label text-[10px] uppercase font-black tracking-widest text-on-surface-variant/60 block">
                      Descripción Detallada
                    </label>
                    <textarea
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      placeholder="Por favor, proporciona más detalles sobre el incidente (ej. fecha, qué sucedió)..."
                      className="w-full bg-surface border border-black/10 rounded-xl px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all min-h-[120px] resize-none"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-black/5">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      disabled={loading}
                      className="px-6 py-2.5 rounded-xl font-bold text-sm text-on-surface-variant hover:bg-surface-container-high transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !descripcion.trim()}
                      className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-red-600/20"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <span className="material-symbols-outlined text-[18px]">send</span>
                      )}
                      {loading ? 'Enviando...' : 'Enviar Reporte'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportTutorButton;

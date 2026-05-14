/**
 * @fileoverview Feature Component - Add Subject Modal
 * @module components/features/tutors/AddSubjectModal
 * @description Provides a high-fidelity modal interface for tutors to 
 * expand their academic catalog. Implements cascading selection logic 
 * to filter subjects by department, ensuring an efficient discovery UX.
 * Migrado de Supabase a Spring Boot backend.
 */

import React, { useState, useEffect } from 'react';
import Button from '../../../../components/ui/Button/Button';
import { api } from '../../../../lib/api';

/**
 * AddSubjectModal Component.
 * 
 * @param {Object} props - Component properties.
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {function(): void} props.onClose - Callback to terminate the modal session.
 * @param {function(Object): void} props.onAdd - Callback to persist the new subject choice.
 * @component
 */
const AddSubjectModal = ({ isOpen, onClose, onAdd }) => {
  const [selectedDeptId, setSelectedDeptId] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [departments, setDepartments] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar departamentos desde Spring Boot
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await api.get('/departamentos');
        setDepartments(data || []);
      } catch (err) {
        console.error('Error cargando departamentos:', err);
      }
    };

    if (isOpen) fetchDepartments();
  }, [isOpen]);

  // Carga en cascada: materias filtradas por departamento
  useEffect(() => {
    const fetchSubjects = async () => {
      if (!selectedDeptId) {
        setAvailableSubjects([]);
        return;
      }

      setLoading(true);
      try {
        const data = await api.get(`/materias?departamentoId=${selectedDeptId}`);
        setAvailableSubjects(data || []);
      } catch (err) {
        console.error('Error cargando materias:', err);
      } finally {
        setLoading(false);
        setSelectedSubjectId('');
      }
    };

    fetchSubjects();
  }, [selectedDeptId]);

  if (!isOpen) return null;

  const handleAdd = () => {
    if (selectedSubjectId) {
      const subject = availableSubjects.find(s => String(s.id) === String(selectedSubjectId));
      const dept = departments.find(d => String(d.id) === String(selectedDeptId));

      onAdd({
        materia_id: subject.id,
        name: subject.nombre,
        dept: dept?.nombre || 'General',
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      {/* Backdrop con Glassmorphism */}
      <div
        className="absolute inset-0 bg-[#002045]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Surface */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-10">
          <header className="mb-8">
            <p className="text-[0.7rem] uppercase tracking-widest font-bold text-academic-gold mb-2">Configuración Académica</p>
            <h3 className="text-3xl font-extrabold text-primary font-headline tracking-tight">Añadir Materia</h3>
          </header>

          <div className="space-y-6">
            {/* Selección de Departamento */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">Departamento</label>
              <select
                value={selectedDeptId}
                onChange={(e) => setSelectedDeptId(e.target.value)}
                className="w-full bg-[#f7f9fb] border-none rounded-xl px-4 py-4 text-primary font-medium focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
              >
                <option value="">Seleccione un departamento...</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.nombre}</option>
                ))}
              </select>
            </div>

            {/* Selección de Materia (en cascada) */}
            <div className={`transition-opacity duration-300 ${!selectedDeptId || loading ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">Materia</label>
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full bg-[#f7f9fb] border-none rounded-xl px-4 py-4 text-primary font-medium focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
              >
                <option value="">{loading ? 'Cargando materias...' : 'Seleccione la materia...'}</option>
                {availableSubjects.map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          <footer className="mt-12 flex gap-4">
            <Button variant="boring" className="flex-1 py-4" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              className="flex-1 py-4 shadow-lg shadow-primary/20"
              onClick={handleAdd}
              disabled={!selectedSubjectId || loading}
            >
              Añadir al Catálogo
            </Button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AddSubjectModal;

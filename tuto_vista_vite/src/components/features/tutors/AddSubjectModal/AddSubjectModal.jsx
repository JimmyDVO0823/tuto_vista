/**
 * @fileoverview Feature Component - Add Subject Modal
 * @module components/features/tutors/AddSubjectModal
 * @description Provides a high-fidelity modal interface for tutors to 
 * expand their academic catalog. Implements cascading selection logic 
 * to filter subjects by department, ensuring an efficient discovery UX.
 */

import React, { useState, useEffect } from 'react';
import Button from '../../../ui/Button/Button';

/**
 * Mock Academic Catalog.
 * Logic Rationale: Centralized repository of departments and subjects 
 * to simulate the academic infrastructure.
 */
const ACADEMIC_CATALOG = [
  {
    id: 'mat',
    name: 'Departamento de Matemáticas',
    subjects: ['Cálculo I', 'Cálculo II', 'Álgebra Lineal', 'Probabilidad y Estadística']
  },
  {
    id: 'comp',
    name: 'Ciencias de la Computación',
    subjects: ['Estructuras de Datos', 'Bases de Datos I', 'Arquitectura de Software', 'Inteligencia Artificial']
  },
  {
    id: 'phys',
    name: 'Departamento de Física',
    subjects: ['Física Mecánica', 'Física Electromagnética', 'Termodinámica']
  },
  {
    id: 'hum',
    name: 'Humanidades y Artes',
    subjects: ['Ética', 'Pensamiento Crítico', 'Historia del Arte']
  }
];

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
  const [selectedSubject, setSelectedSubject] = useState('');
  const [availableSubjects, setAvailableSubjects] = useState([]);

  /**
   * Cascading Filter Logic.
   * Logic Rationale: Synchronizes the subject list with the selected department 
   * to prevent invalid academic pairings.
   */
  useEffect(() => {
    if (selectedDeptId) {
      const dept = ACADEMIC_CATALOG.find(d => d.id === selectedDeptId);
      setAvailableSubjects(dept ? dept.subjects : []);
      setSelectedSubject('');
    } else {
      setAvailableSubjects([]);
      setSelectedSubject('');
    }
  }, [selectedDeptId]);

  if (!isOpen) return null;

  const handleAdd = () => {
    if (selectedDeptId && selectedSubject) {
      const dept = ACADEMIC_CATALOG.find(d => d.id === selectedDeptId);
      onAdd({
        name: selectedSubject,
        dept: dept.name,
        status: 'ACTIVO',
        sem: 'Semestre Actual',
        nextActivity: 'Pendiente de asignar',
        completedActivities: 0,
        totalActivities: 10
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      {/* Backdrop with Glassmorphism */}
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
            {/* Department Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">Departamento</label>
              <select 
                value={selectedDeptId}
                onChange={(e) => setSelectedDeptId(e.target.value)}
                className="w-full bg-[#f7f9fb] border-none rounded-xl px-4 py-4 text-primary font-medium focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
              >
                <option value="">Seleccione un departamento...</option>
                {ACADEMIC_CATALOG.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>

            {/* Subject Selection (Cascaded) */}
            <div className={`transition-opacity duration-300 ${!selectedDeptId ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">Materia</label>
              <select 
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-[#f7f9fb] border-none rounded-xl px-4 py-4 text-primary font-medium focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer"
              >
                <option value="">Seleccione la materia...</option>
                {availableSubjects.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>

          <footer className="mt-12 flex gap-4">
            <Button 
              variant="boring" 
              className="flex-1 py-4"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button 
              variant="primary" 
              className="flex-1 py-4 shadow-lg shadow-primary/20"
              onClick={handleAdd}
              disabled={!selectedSubject}
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

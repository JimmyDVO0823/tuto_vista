/**
 * @fileoverview Routing Orchestrator - Dashboard Switcher
 * @module pages/DashboardSwitcher
 * @description Serves as the primary traffic controller for the dashboard entry point.
 * It intelligently redirects the user based on their authenticated role, 
 * maintaining the integrity of the 'Tutor' vs. 'Estudiante' experiences.
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardStudent from './DashboardStudent';
import DashboardTutor from './DashboardTutor';

/**
 * DashboardSwitcher Component.
 * Acts as a logic gate for the landing page.
 * 
 * @component
 */
const DashboardSwitcher = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-surface">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-4 border-academic-gold border-t-transparent animate-spin"></div>
                    <p className="text-primary font-bold tracking-widest uppercase text-xs">Cargando Academia...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/loginform" />;
    }

    if (user.role === 'tutor') {
        return <DashboardTutor />;
    }

    // Default to student if role is student or unknown (for safety)
    return <DashboardStudent />;
};

export default DashboardSwitcher;

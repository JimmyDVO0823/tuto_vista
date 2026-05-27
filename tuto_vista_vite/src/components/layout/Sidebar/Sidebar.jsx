/**
 * @fileoverview Layout Component - Navigation Sidebar
 * @module components/layout/Sidebar
 * @description The primary navigational column of the application, designed with the
 * 'Academic Editorial' aesthetic. It features a sophisticated collapsible mechanism
 * to preserve spatial integrity while offering distinct navigation paths based on
 * the user's academic role (Tutor vs. Estudiante).
 */

import React from "react";
import { Link, useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem/SidebarItem";
import SessionView from "./SessionView";
import NotificationBell from "../Navbar/NotificationBell";
import { useAuth } from "../../../context/AuthContext";

/**
 * Sidebar Component.
 * * @param {Object} props - Component properties.
 * @param {boolean} props.isCollapsed - Controls the visual width and detail level of the sidebar.
 * @param {function} props.onMouseEnter - Handler for expanding the sidebar on hover (soft-expansion).
 * @param {function} props.onMouseLeave - Handler for collapsing on mouse exit.
 * @param {function} props.onToggle - Explicit toggle for manual expansion state management.
 * @component
 */
const Sidebar = ({ isCollapsed, onMouseEnter, onMouseLeave, onToggle }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navLinks = {
    estudiante: [
      { label: "Dashboard", path: "/dashboard", icon: "dashboard" },
      { label: "Explorar Tutores", path: "/tutors", icon: "search" },
      { label: "Mis Sesiones", path: "/mis-sesiones", icon: "calendar_today" },
      { label: "Mis Materias", path: "/subjects", icon: "menu_book" },
      { label: "Chat", path: "/chat", icon: "chat" },
    ],
    tutor: [
      { label: "Panel Instructor", path: "/dashboard", icon: "dashboard" },
      {
        label: "Gestionar Tutorías",
        path: "/tutor-agenda",
        icon: "event_note",
      },
      { label: "Disponibilidad", path: "/dispo", icon: "schedule" },
      { label: "Mis Cursos", path: "/subjects", icon: "school" },
      { label: "Ingresos", path: "#", icon: "payments" },
      { label: "Chat", path: "/chat", icon: "chat" },
    ],
    administrador: [
      { label: "Panel Admin", path: "/dashboard", icon: "admin_panel_settings" },
    ],
  };

  /**
   * Selection Logic:
   * Dynamically filters the navigation registry based on the authenticated user's role.
   */
  const currentNav = navLinks[user?.role] || navLinks.estudiante;

  /**
   * User Domain Mapper:
   * Standardizes the raw 'User' state into a UI-friendly object.
   */
  const currentUser = user
    ? {
      name: user.name,
      role: user.role === "tutor" ? "Tutor Académico" : user.role === "administrador" ? "Administrador" : "Estudiante",
      avatar: user.user_metadata?.avatar_url || "",
      email: user.email,
    }
    : null;

  const handleLogout = () => {
    logout();
  };

  return (
    <nav
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`h-screen fixed left-0 top-0 bg-mini-gray py-8 z-50 transition-all duration-300 ease-in-out shadow-sm ${isCollapsed
        ? "hidden md:flex flex-col md:translate-x-0 w-64 md:w-20"
        : "flex flex-col translate-x-0 w-64"
        }`}
    >
      {/* Brand & Toggle */}
      <div
        className={`mb-10 flex items-center ${isCollapsed ? "px-6 justify-center" : "px-4 justify-start gap-2"}`}
      >
        <div className="flex items-center gap-1.5">
          {!isCollapsed && (
            <span className="text-sm font-black tracking-widest uppercase text-primary font-display whitespace-nowrap animate-in fade-in duration-500">
              THE ACADEMIC
            </span>
          )}
        </div>
        <button
          onClick={onToggle}
          className={`material-symbols-outlined text-primary hover:bg-[#e6e8ea] p-1.5 rounded-full transition-colors ${isCollapsed ? "scale-110" : ""}`}
        >
          {isCollapsed ? "menu" : "menu_open"}
        </button>
      </div>

      {/* User Profile */}
      <SessionView user={currentUser} isCollapsed={isCollapsed} />

      {/* Navigation */}
      <div className="flex-1 flex flex-col gap-1 overflow-y-auto no-scrollbar">
        {currentNav.map((link) => (
          <SidebarItem
            key={link.label}
            label={link.label}
            path={link.path}
            icon={link.icon}
            isCollapsed={isCollapsed}
            isActive={location.pathname === link.path}
          />
        ))}
      </div>

      {/* Footer Actions */}
      {/* Footer Actions */}
      <div
        className={`px-5 mt-auto flex flex-col gap-4 ${isCollapsed ? "items-center" : ""}`}
      >
        <NotificationBell isCollapsed={isCollapsed} />

        {/* Bloque inferior usando la consistencia de SidebarItem */}
        <div
          className={`flex flex-col gap-1 border-t border-black/5 pt-4 ${isCollapsed ? "w-full items-center" : "w-full"}`}
        >
          {/* Ajustes ahora es un SidebarItem */}
          <SidebarItem
            label="Ajustes"
            path="/settings"
            icon="settings"
            isCollapsed={isCollapsed}
            isActive={location.pathname === "/settings"}
          />

          {/* Support ahora es un SidebarItem */}
          <SidebarItem
            label="Support"
            path="/support"
            icon="help"
            isCollapsed={isCollapsed}
            isActive={location.pathname === "/support"}
          />

          {/* Cerrar Sesión / Login usando SidebarItem */}
          {currentUser ? (
            <SidebarItem
              label="Cerrar Sesión"
              icon="logout"
              isCollapsed={isCollapsed}
              onClick={handleLogout} // <- Pasamos el comportamiento de botón
              variant="danger" // <- Pasamos una variante para pintarlo de rojo
            />
          ) : (
            <SidebarItem
              label="Login"
              path="/loginform"
              icon="login"
              isCollapsed={isCollapsed}
              isActive={location.pathname === "/loginform"}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;

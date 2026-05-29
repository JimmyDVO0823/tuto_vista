import React from 'react';

const UserTableComponent = ({ usuarios, handleToggleUsuario, totalElements }) => {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-mini-gray">
        <h3 className="text-lg font-bold text-primary font-display flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">group</span>
          Listado de Usuarios Registrados
        </h3>
        <span className="text-xs text-gray-500 font-semibold bg-surface-container-low px-3 py-1 rounded">Total: {totalElements || usuarios.length}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low text-xs font-bold uppercase text-primary border-b border-outline-variant/10">
              <th className="p-4">ID</th>
              <th className="p-4">Nombre Completo</th>
              <th className="p-4">Correo</th>
              <th className="p-4">Rol</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10 text-sm text-primary">
            {usuarios.map(u => (
              <tr key={u.id} className="hover:bg-mini-gray transition-colors">
                <td className="p-4 font-bold">{u.id}</td>
                <td className="p-4">{u.nombreCompleto}</td>
                <td className="p-4 text-gray-600">{u.correo}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-bold ${u.rol === 'administrador' ? 'bg-red-50 text-red-600 border border-red-200' :
                      u.rol === 'tutor' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                    {u.rol}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${u.estaActivo ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                    {u.estaActivo ? 'Activo' : 'Desactivado'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleToggleUsuario(u.id, u.estaActivo)}
                    className={`px-4 py-1.5 rounded text-xs font-bold transition-all border ${u.estaActivo
                        ? 'bg-red-50 text-red-600 hover:bg-red-100 border-red-100'
                        : 'bg-green-50 text-green-600 hover:bg-green-100 border-green-100'
                      }`}
                  >
                    {u.estaActivo ? 'Desactivar' : 'Activar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTableComponent;

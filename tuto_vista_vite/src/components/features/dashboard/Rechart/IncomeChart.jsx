import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// MOCK DATA: Historial simulado de ingresos del tutor
const INCOME_DATA_SOURCE = {
  semana: [
    { label: 'Lun', ingresos: 120 },
    { label: 'Mar', ingresos: 240 },
    { label: 'Mié', ingresos: 180 },
    { label: 'Jue', ingresos: 320 },
    { label: 'Vie', ingresos: 450 },
    { label: 'Sáb', ingresos: 150 },
    { label: 'Dom', ingresos: 90 },
  ],
  mes: [
    { label: 'Sem 1', ingresos: 850 },
    { label: 'Sem 2', ingresos: 1200 },
    { label: 'Sem 3', ingresos: 950 },
    { label: 'Sem 4', ingresos: 1400 },
  ],
  anio: [
    { label: 'Ene', ingresos: 3200 },
    { label: 'Feb', ingresos: 2800 },
    { label: 'Mar', ingresos: 4100 },
    { label: 'Abr', ingresos: 3900 },
    { label: 'May', ingresos: 5200 },
    { label: 'Jun', ingresos: 4800 },
  ],
  todo: [
    { label: '2023', ingresos: 35000 },
    { label: '2024', ingresos: 48000 },
    { label: '2025', ingresos: 59000 },
    { label: '2026', ingresos: 24500 }, // Año en curso
  ]
};

export default function IncomeChart() {
  // Estado para controlar qué filtro está activo
  const [timeframe, setTimeframe] = useState('mes');

  // Calcular el ingreso total mostrado según el filtro
  const totalIncome = INCOME_DATA_SOURCE[timeframe].reduce((acc, curr) => acc + curr.ingresos, 0);

  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border-none w-full">
      
      {/* CABECERA: Título, monto y selectores asimétricos */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-headline font-bold text-lg text-primary">Earnings Overview</h3>
          <p className="text-2xl font-headline font-extrabold text-on-surface mt-1">
            ${totalIncome.toLocaleString('es-ES')}
            <span className="text-xs font-body font-medium text-outline ml-2 uppercase tracking-wider">
              Total en este periodo
            </span>
          </p>
        </div>

        {/* selectores de tiempo (Pills) */}
        <div className="flex bg-surface-container-low p-1 rounded-lg self-start sm:self-center">
          {['semana', 'mes', 'anio', 'todo'].map((type) => (
            <button
              key={type}
              onClick={() => setTimeframe(type)}
              className={`px-4 py-1.5 text-xs font-label font-bold rounded-md uppercase tracking-wider transition-all ${
                timeframe === type
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {type === 'anio' ? 'Año' : type === 'todo' ? 'Historial' : type}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENEDOR DE LA GRÁFICA (Responsive) */}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={INCOME_DATA_SOURCE[timeframe]}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            {/* Cuadrícula sutil de fondo */}
            <CartesianGrid strokeDasharray="3 3" stroke="#eceef0" vertical={false} />
            
            {/* Ejes */}
            <XAxis 
              dataKey="label" 
              stroke="#696C6E" 
              fontSize={11} 
              fontFamily="Inter"
              tickLine={false} 
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#696C6E" 
              fontSize={11} 
              fontFamily="Inter"
              tickLine={false} 
              axisLine={false}
              dx={5}
              tickFormatter={(value) => `$${value}`}
            />
            
            {/* Tooltip flotante al pasar el cursor */}
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0, 32, 69, 0.08)',
                fontFamily: 'Inter',
                fontSize: '12px'
              }}
              formatter={(value) => [`$${value}`, 'Ingresos']}
              labelStyle={{ fontFamily: 'Manrope', fontWeight: 'bold', color: '#002045' }}
            />

            {/* Configuración del área rellena (Usa degradado con tus colores corporativos) */}
            <defs>
              <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                {/* Academic Blue al 20% bajando a 0% para un look premium */}
                <stop offset="5%" stopColor="#002045" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#002045" stopOpacity={0.0}/>
              </linearGradient>
            </defs>

            {/* Línea principal y su respectivo relleno */}
            <Area 
              type="monotone" 
              dataKey="ingresos" 
              stroke="#002045" // Academic Blue fijo
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorIngresos)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
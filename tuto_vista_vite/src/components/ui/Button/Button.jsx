/**
 * @fileoverview UI Atomic Component - Academic Button
 * @module components/ui/Button
 * @description The primary interactive unit of the system. 
 * Supports multiple architectural variants (gradient, gold, ghost) 
 * to maintain strict hierarchy across the interface.
 */

import React from 'react';

/**
 * Button Component.
 * 
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Content to be rendered inside the button.
 * @param {'primary'|'secondary'|'tertiary'|'outline'|'ghost'|'boring'} [props.variant='primary'] - 
 * Visual style variant. 'boring' is used for standardized neutral actions.
 * @param {string} [props.className=''] - Additional CSS classes.
 * @component
 */
const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-8 py-4 rounded-md font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'signature-gradient text-white shadow-lg hover:shadow-xl',
    secondary: 'tertiary-container text-primary shadow-sm hover:shadow-md',
    tertiary: 'bg-transparent text-primary hover:bg-surface-container-low',
    outline: 'border border-outline-variant bg-transparent text-primary hover:bg-surface-container-low',
    ghost: 'bg-transparent text-primary/60 hover:text-primary',
    boring: 'bg-white px-6 py-4 rounded-xl text-sm font-semibold border border-gray-100 shadow-sm hover:shadow-md'
  };

  const variantStyles = variants[variant] || variants.primary;

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

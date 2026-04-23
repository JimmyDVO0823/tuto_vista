import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-8 py-4 rounded-md font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'signature-gradient text-white shadow-lg hover:shadow-xl',
    secondary: 'tertiary-container text-primary shadow-sm hover:shadow-md',
    tertiary: 'bg-transparent text-primary hover:bg-surface-container-low',
    outline: 'border border-outline-variant bg-transparent text-primary hover:bg-surface-container-low',
    ghost: 'bg-transparent text-primary/60 hover:text-primary'
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

import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  type = 'button',
  className = '',
  onClick,
  ...props 
}) => {
  const buttonClass = `btn btn--${variant} btn--${size} ${disabled ? 'btn--disabled' : ''} ${className}`.trim();

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
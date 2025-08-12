
// src/components/Button.tsx
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const Button = ({ children, onClick, className = "", disabled = false }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

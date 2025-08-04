
// src/components/Button.tsx
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button = ({ children, onClick, className = "" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${className}`}
    >
      {children}
    </button>
  );
};

export default Button;


// src/components/Button.tsx
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
};

const Button = ({ children, onClick, className = "", disabled = false, loading = false }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${className}`}
      disabled={disabled || loading}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;

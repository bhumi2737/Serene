import React from "react";

export default function Button({
  children,
  variant = "primary", // primary, secondary, soft, outline, ghost
  size = "md", // sm, md, lg
  onClick,
  disabled = false,
  type = "button",
  className = "",
  icon: Icon,
  ...props
}) {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-serene-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-serene-primary text-white hover:bg-[#162d27]",
    secondary: "bg-serene-secondary text-serene-text hover:bg-[#96b6dc]",
    soft: "bg-serene-primarySoft text-serene-primary hover:bg-[#bcd8cd]",
    outline: "border border-serene-border text-serene-text bg-serene-surface hover:bg-serene-bg",
    ghost: "text-serene-text hover:bg-serene-bg",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-2.5 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
}

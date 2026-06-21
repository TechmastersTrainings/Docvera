"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "danger" | "secondary";
  className?: string;
  disabled?: boolean;
}

export default function ActionButton({
  children, onClick, type = "button", variant = "primary", className = "", disabled = false,
}: Props) {
  const variants = {
    primary: "bg-[#028597] text-white hover:bg-[#025964] shadow-sm",
    danger: "bg-[#ee1123] text-white hover:bg-[#bf0d1c] shadow-sm",
    secondary: "bg-white text-[#0f4557] border border-[#537eac]/20 hover:bg-[#eef2f7] shadow-sm",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

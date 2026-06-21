"use client";

import React from "react";

interface Props {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function SectionHeader({ title, subtitle, action }: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold text-[#0f4557]">{title}</h2>
        {subtitle && <p className="text-sm font-medium text-[#537eac] mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

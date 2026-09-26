"use client";

import React from "react";
import Link from "next/link";

export interface CipherLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ComponentType<{ className?: string }>;
  dataCursor?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function CipherLink({
  href,
  children,
  className = "",
  icon: Icon,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: CipherLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative inline-flex items-center gap-2 transition-colors select-none ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span className="font-medium">{children}</span>
    </Link>
  );
}

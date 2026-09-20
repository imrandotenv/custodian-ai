"use client";

import React, { createContext, useContext, useState } from "react";

export type UserRole = "tourist" | "local" | "admin";

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({
  children,
  initialRole = "tourist",
}: {
  children: React.ReactNode;
  initialRole?: UserRole;
}) {
  const [role, setRole] = useState<UserRole>(initialRole);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}

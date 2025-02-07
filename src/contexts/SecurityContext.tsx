import React, { createContext, useContext, useState } from "react";

interface SecurityContextType {
  useSecurityToken: boolean;
  setUseSecurityToken: (use: boolean) => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [useSecurityToken, setUseSecurityToken] = useState(true);

  return (
    <SecurityContext.Provider value={{ useSecurityToken, setUseSecurityToken }}>
      {children}
    </SecurityContext.Provider>
  );
}

export function useSecurity() {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error("useSecurity must be used within a SecurityProvider");
  }
  return context;
} 
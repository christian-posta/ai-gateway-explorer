import React, { createContext, useContext, useState } from "react";

interface Demo {
  id: number;
  name: string;
  description: string;
}

interface DemoContextType {
  selectedDemo: Demo | null;
  setSelectedDemo: (demo: Demo | null) => void;
  demos: Demo[];
}

const demos: Demo[] = [
  { id: 1, name: "Hide Credentials", description: "Demo for hiding credentials" },
  { id: 2, name: "Managed Credentials", description: "Demo for managed credentials" },
  { id: 3, name: "Token Rate Limit", description: "Demo for token rate limiting" },
  { id: 4, name: "Model Failover", description: "Demo for model failover" },
  { id: 5, name: "Guardrails", description: "Demo for AI guardrails" },
  { id: 6, name: "Semantic Cache", description: "Demo for semantic caching" },
  { id: 7, name: "RAG", description: "Demo for RAG implementation" },
  { id: 8, name: "Traffic Shift", description: "Demo for traffic shifting" },
];

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [selectedDemo, setSelectedDemo] = useState<Demo | null>(null);

  return (
    <DemoContext.Provider value={{ selectedDemo, setSelectedDemo, demos }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
}
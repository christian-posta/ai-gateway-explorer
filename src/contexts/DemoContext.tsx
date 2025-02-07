import React, { createContext, useContext, useState } from "react";

interface Demo {
  id: number;
  name: string;
  description: string;
  usecaseId?: string;
}

interface DemoContextType {
  selectedDemo: Demo | null;
  setSelectedDemo: (demo: Demo | null) => void;
  demos: Demo[];
}

const demos: Demo[] = [
  { id: 1, name: "Hide Credential", usecaseId: "01-demo-hidecred", description: "Demo for hiding credentials" },
  { id: 2, name: "Managed Credentials", usecaseId: "02-demo-mngcred", description: "Demo for managed credentials" },
  { id: 3, name: "Token Rate Limit", usecaseId: "03-demo-ratelimit", description: "Demo for token rate limiting" },
  { id: 4, name: "Model Failover", usecaseId: "04-demo-model-failover", description: "Demo for model failover" },
  { id: 5, name: "Guardrails", usecaseId: "05-demo-guardrails", description: "Demo for AI guardrails" },
  { id: 6, name: "Semantic Cache", usecaseId: "06-demo-semantic-cache", description: "Demo for semantic caching" },
  { id: 7, name: "RAG", usecaseId: "07-demo-rag", description: "Demo for RAG implementation" },
  { id: 8, name: "Traffic Shift", usecaseId: "08-demo-traffic-shift", description: "Demo for traffic shifting" },
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
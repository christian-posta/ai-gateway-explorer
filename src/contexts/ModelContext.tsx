import React, { createContext, useContext, useState } from "react";

export const MODEL_OPTIONS = [
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
  { id: "qwen:0.5b", name: "Qwen 0.5B" },
  { id: "gpt-4o-mini", name: "GPT-4 Optimized Mini" },
  { id: "gpt-4o", name: "GPT-4 Optimized" },
  { id: "gpt-4.0-turbo", name: "GPT-4 Turbo" },
  { id: "meta/llama-3.1-8b-instruct", name: "Llama 3.1 8B Instruct" },
];

interface ModelContextType {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export function ModelProvider({ children }: { children: React.ReactNode }) {
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");

  return (
    <ModelContext.Provider value={{ selectedModel, setSelectedModel }}>
      {children}
    </ModelContext.Provider>
  );
}

export function useModel() {
  const context = useContext(ModelContext);
  if (context === undefined) {
    throw new Error("useModel must be used within a ModelProvider");
  }
  return context;
} 
import React, { createContext, useContext, useState } from "react";

interface EndpointContextType {
  selectedEndpoint: string;
  setSelectedEndpoint: (endpoint: string) => void;
}

const EndpointContext = createContext<EndpointContextType | undefined>(undefined);

export function EndpointProvider({ children }: { children: React.ReactNode }) {
  const [selectedEndpoint, setSelectedEndpoint] = useState("http://localhost:8080/openai");

  return (
    <EndpointContext.Provider value={{ selectedEndpoint, setSelectedEndpoint }}>
      {children}
    </EndpointContext.Provider>
  );
}

export function useEndpoint() {
  const context = useContext(EndpointContext);
  if (context === undefined) {
    throw new Error("useEndpoint must be used within an EndpointProvider");
  }
  return context;
} 
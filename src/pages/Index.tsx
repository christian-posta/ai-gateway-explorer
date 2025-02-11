import { SettingsProvider } from "@/contexts/SettingsContext";
import { DemoProvider } from "@/contexts/DemoContext";
import { EndpointProvider } from "@/contexts/EndpointContext";
import { LeftPanel } from "@/components/panels/LeftPanel";
import { MainPanel } from "@/components/panels/MainPanel";
import { ControlPanel } from "@/components/panels/ControlPanel";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useState } from "react";

const Index = () => {
  const [controlPanelCollapsed, setControlPanelCollapsed] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleTemplateSelect = (content: string) => {
    setPrompt(content);
  };

  return (
    <SettingsProvider>
      <DemoProvider>
        <EndpointProvider>
          <div className="flex min-h-screen w-full">
            <LeftPanel />
            <div className="flex-1">
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel 
                  defaultSize={70} 
                  minSize={30}
                  className="transition-all duration-300"
                  style={{ flex: controlPanelCollapsed ? '1 1 95%' : undefined }}
                >
                  <MainPanel 
                    controlPanelCollapsed={controlPanelCollapsed}
                    prompt={prompt}
                    setPrompt={setPrompt}
                  />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel 
                  defaultSize={30} 
                  minSize={5}
                  className="transition-all duration-300"
                  style={{ flex: controlPanelCollapsed ? '0 0 48px' : undefined }}
                >
                  <ControlPanel 
                    onCollapse={setControlPanelCollapsed}
                    onTemplateSelect={handleTemplateSelect}
                  />
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>
        </EndpointProvider>
      </DemoProvider>
    </SettingsProvider>
  );
};

export default Index;
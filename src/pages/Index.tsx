import { SettingsProvider } from "@/contexts/SettingsContext";
import { DemoProvider } from "@/contexts/DemoContext";
import { LeftPanel } from "@/components/panels/LeftPanel";
import { MainPanel } from "@/components/panels/MainPanel";
import { ControlPanel } from "@/components/panels/ControlPanel";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const Index = () => {
  return (
    <SettingsProvider>
      <DemoProvider>
        <div className="flex min-h-screen w-full">
          <LeftPanel />
          <div className="flex-1">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70} minSize={30}>
                <MainPanel />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={30} minSize={20}>
                <ControlPanel />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </DemoProvider>
    </SettingsProvider>
  );
};

export default Index;
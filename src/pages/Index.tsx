import { SettingsProvider } from "@/contexts/SettingsContext";
import { DemoProvider } from "@/contexts/DemoContext";
import { LeftPanel } from "@/components/panels/LeftPanel";
import { MainPanel } from "@/components/panels/MainPanel";
import { ControlPanel } from "@/components/panels/ControlPanel";

const Index = () => {
  return (
    <SettingsProvider>
      <DemoProvider>
        <div className="flex min-h-screen w-full">
          <LeftPanel />
          <div className="flex-1 flex flex-col">
            <MainPanel />
            <ControlPanel />
          </div>
        </div>
      </DemoProvider>
    </SettingsProvider>
  );
};

export default Index;
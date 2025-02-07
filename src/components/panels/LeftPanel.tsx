import { useState } from "react";
import { useDemo } from "@/contexts/DemoContext";
import { useSettings } from "@/contexts/SettingsContext";
import { Button } from "@/components/ui/button";
import { Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function LeftPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { demos, selectedDemo, setSelectedDemo } = useDemo();
  const { toast } = useToast();

  const handleDemoSelect = async (demo: any) => {
    setSelectedDemo(demo);
    // Simulate demo reset command
    console.log(`Executing: ./reset-demo.sh --for ${demo.id}`);
    toast({
      title: "Demo Prepared",
      description: `Demo ${demo.id} has been successfully prepared.`,
      duration: 3000,
    });
  };

  return (
    <div
      className={`relative h-screen bg-enterprise-800 text-white transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-1/5"
      }`}
    >
      <div className="p-4">
        {!isCollapsed && <h2 className="text-xl font-bold mb-4">Demos</h2>}
        <div className="space-y-2">
          {demos.map((demo) => (
            <Button
              key={demo.id}
              variant={selectedDemo?.id === demo.id ? "secondary" : "ghost"}
              className={`w-full justify-start ${isCollapsed ? "p-2" : "p-4"}`}
              onClick={() => handleDemoSelect(demo)}
            >
              {isCollapsed ? demo.id : demo.name}
            </Button>
          ))}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 z-10 bg-enterprise-800 text-white hover:bg-enterprise-700"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute bottom-4 right-4"
        onClick={() => {
          // TODO: Implement settings modal
          console.log("Open settings");
        }}
      >
        <Settings className="h-4 w-4" />
      </Button>
    </div>
  );
}
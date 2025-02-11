import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/contexts/DemoContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PromptTemplatesTab } from "./PromptTemplatesTab";
import { ConfigurationTab } from "./ConfigurationTab";
import { JWTDetailsTab } from "./JWTDetailsTab";

interface ControlPanelProps {
  onCollapse: (collapsed: boolean) => void;
  onTemplateSelect?: (content: string) => void;
}

export function ControlPanel({ onCollapse, onTemplateSelect }: ControlPanelProps) {
  const { selectedDemo } = useDemo();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onCollapse(newCollapsedState);
  };

  const renderGuardrailsContent = () => (
    <Tabs defaultValue="prompts" className="space-y-4">
      <TabsList>
        <TabsTrigger value="prompts">Prompt Templates</TabsTrigger>
        <TabsTrigger value="config">Configuration</TabsTrigger>
        <TabsTrigger value="jwt">JWT Details</TabsTrigger>
      </TabsList>

      <TabsContent value="prompts">
        <PromptTemplatesTab onTemplateSelect={onTemplateSelect} />
      </TabsContent>

      <TabsContent value="config">
        <ConfigurationTab />
      </TabsContent>

      <TabsContent value="jwt">
        <JWTDetailsTab />
      </TabsContent>
    </Tabs>
  );

  const renderDefaultContent = () => (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="jwt">JWT Details</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <ConfigurationTab />
      </TabsContent>

      <TabsContent value="jwt">
        <JWTDetailsTab />
      </TabsContent>
    </Tabs>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow">
        <div className={`bg-enterprise-100 border-t border-enterprise-200 h-full`}>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-enterprise-900">Controls</h2>
              <Button
                variant="ghost"
                onClick={handleCollapse}
                className="text-enterprise-500 hover:text-enterprise-700"
              >
                {isCollapsed ? "Expand" : "Collapse"}
              </Button>
            </div>

            {!isCollapsed && (
              selectedDemo?.id === 5 ? renderGuardrailsContent() : renderDefaultContent()
            )}
          </div>
        </div>
      </div>
      {isCollapsed && <div className="flex-grow" />}
    </div>
  );
}

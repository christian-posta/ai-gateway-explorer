import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/contexts/DemoContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PromptTemplatesTab } from "./PromptTemplatesTab";
import { RAGPromptTemplatesTab } from "./RAGPromptTemplatesTab";
import { ConfigurationTab } from "./ConfigurationTab";
import { JWTDetailsTab } from "./JWTDetailsTab";

interface ControlPanelProps {
  onCollapse: (collapsed: boolean) => void;
  onTemplateSelect?: (content: string) => void;
}

export function ControlPanel({ onCollapse, onTemplateSelect }: ControlPanelProps) {
  const { selectedDemo } = useDemo();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedTemplateType, setSelectedTemplateType] = useState("reject");
  const [selectedPromptId, setSelectedPromptId] = useState("1");

  const handleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onCollapse(newCollapsedState);
  };

  const handleTemplateTypeChange = (type: string, promptId: string) => {
    setSelectedTemplateType(type);
    setSelectedPromptId(promptId);
  };

  const renderGuardrailsContent = () => (
    <Tabs defaultValue="prompts" className="space-y-4">
      <TabsList>
        <TabsTrigger value="prompts">Prompt Templates</TabsTrigger>
        <TabsTrigger value="config">Configuration</TabsTrigger>
        <TabsTrigger value="jwt">JWT Details</TabsTrigger>
      </TabsList>

      <TabsContent value="prompts">
        <PromptTemplatesTab 
          onTemplateSelect={onTemplateSelect}
          onTemplateTypeChange={handleTemplateTypeChange}
          selectedPromptId={selectedPromptId}
        />
      </TabsContent>

      <TabsContent value="config">
        <ConfigurationTab selectedTemplateType={selectedTemplateType} />
      </TabsContent>

      <TabsContent value="jwt">
        <JWTDetailsTab />
      </TabsContent>
    </Tabs>
  );

  const renderRAGContent = () => (
    <Tabs defaultValue="rag-prompts" className="space-y-4">
      <TabsList>
        <TabsTrigger value="rag-prompts">RAG Prompt Templates</TabsTrigger>
        <TabsTrigger value="config">Configuration</TabsTrigger>
        <TabsTrigger value="jwt">JWT Details</TabsTrigger>
      </TabsList>

      <TabsContent value="rag-prompts">
        <RAGPromptTemplatesTab onTemplateSelect={onTemplateSelect} />
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
    <Tabs defaultValue="config" className="space-y-4">
      <TabsList>
        <TabsTrigger value="config">Configuration</TabsTrigger>
        <TabsTrigger value="jwt">JWT Details</TabsTrigger>
      </TabsList>

      <TabsContent value="config">
        <ConfigurationTab />
      </TabsContent>

      <TabsContent value="jwt">
        <JWTDetailsTab />
      </TabsContent>
    </Tabs>
  );

  const getContent = () => {
    if (selectedDemo?.id === 5) return renderGuardrailsContent();
    if (selectedDemo?.id === 7) return renderRAGContent(); // RAG demo ID is 7
    return renderDefaultContent();
  };

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

            {!isCollapsed && getContent()}
          </div>
        </div>
      </div>
      {isCollapsed && <div className="flex-grow" />}
    </div>
  );
}

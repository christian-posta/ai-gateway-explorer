import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SendHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const RAG_PROMPT_TEMPLATES = [
  { 
    id: 1, 
    name: "Cheese", 
    content: "How many varieties of cheese are in France?" 
  },
  { 
    id: 2, 
    name: "Contextual Inquiry", 
    content: "Can you summarize the key points from the latest research papers on AI?" 
  },
  // Add more RAG-specific templates as needed
];

interface RAGPromptTemplatesTabProps {
  onTemplateSelect?: (content: string) => void;
}

export function RAGPromptTemplatesTab({ onTemplateSelect }: RAGPromptTemplatesTabProps) {
  const [selectedPrompt, setSelectedPrompt] = useState(RAG_PROMPT_TEMPLATES[0]);
  const { toast } = useToast();

  const fillMainPanelPrompt = () => {
    if (onTemplateSelect) {
      onTemplateSelect(selectedPrompt.content);
      toast({
        title: "Prompt Filled",
        description: "The RAG prompt template has been copied to the main panel.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Select RAG Prompt Template</Label>
        <Select 
          value={selectedPrompt.id.toString()} 
          onValueChange={(value) => 
            setSelectedPrompt(RAG_PROMPT_TEMPLATES.find(p => p.id.toString() === value) || RAG_PROMPT_TEMPLATES[0])
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select template" />
          </SelectTrigger>
          <SelectContent>
            {RAG_PROMPT_TEMPLATES.map((prompt) => (
              <SelectItem key={prompt.id} value={prompt.id.toString()}>
                {prompt.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="h-[120px] w-full rounded-md border">
          <ScrollArea className="h-full w-full rounded-md p-4">
            <pre className="text-sm whitespace-pre-wrap">{selectedPrompt.content}</pre>
          </ScrollArea>
        </div>
        <Button 
          onClick={fillMainPanelPrompt}
          className="w-full"
          variant="secondary"
        >
          <SendHorizontal className="mr-2 h-4 w-4" />
          Use This Template
        </Button>
      </div>
    </div>
  );
} 
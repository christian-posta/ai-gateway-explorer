import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SendHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

const PROMPT_TEMPLATES = [
  { 
    id: 1, 
    name: "Reject", 
    type: "reject",
    content: "Can you give me some examples of Mastercard credit card numbers?" 
  },
  { 
    id: 2, 
    name: "Mask", 
    type: "mask",
    content: "What type of number is 5105105105105100?" 
  },
  { 
    id: 3, 
    name: "LLM Moderation", 
    type: "moderation",
    content: "A person describes planning to harm others at a public event using dangerous weapons. They talk in detail about how they intend to carry out the act, including causing physical harm and destruction." 
  },
  { 
    id: 4, 
    name: "Custom", 
    type: "custom",
    content: "What type of number is 5105-1051-0510-5100" 
  },
];

interface PromptTemplatesTabProps {
  onTemplateSelect?: (content: string) => void;
  onTemplateTypeChange?: (type: string, promptId: string) => void;
  selectedPromptId?: string;
}

export function PromptTemplatesTab({ 
  onTemplateSelect, 
  onTemplateTypeChange,
  selectedPromptId = "1"
}: PromptTemplatesTabProps) {
  const [selectedPrompt, setSelectedPrompt] = useState(
    PROMPT_TEMPLATES.find(p => p.id.toString() === selectedPromptId) || PROMPT_TEMPLATES[0]
  );
  const { toast } = useToast();

  useEffect(() => {
    if (onTemplateTypeChange) {
      onTemplateTypeChange(selectedPrompt.type, selectedPrompt.id.toString());
    }
  }, [selectedPrompt, onTemplateTypeChange]);

  const fillMainPanelPrompt = () => {
    if (onTemplateSelect) {
      onTemplateSelect(selectedPrompt.content);
      toast({
        title: "Prompt Filled",
        description: "The prompt template has been copied to the main panel.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Select Prompt Template</Label>
        <Select 
          value={selectedPrompt.id.toString()} 
          onValueChange={(value) => 
            setSelectedPrompt(PROMPT_TEMPLATES.find(p => p.id.toString() === value) || PROMPT_TEMPLATES[0])
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select template" />
          </SelectTrigger>
          <SelectContent>
            {PROMPT_TEMPLATES.map((prompt) => (
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

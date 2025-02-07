import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useDemo } from "@/contexts/DemoContext";
import { useSecurity } from "@/contexts/SecurityContext";
import { useEndpoint } from "@/contexts/EndpointContext";
import { useModel, MODEL_OPTIONS } from "@/contexts/ModelContext";

const PRESET_URLS = [
  "https://api.openai.com/v1/chat/completions",
  "http://localhost:8080/v1/chat/completions",
  "http://localhost:8080/openai",
];

export function ConfigurationTab() {
  const { selectedEndpoint, setSelectedEndpoint } = useEndpoint();
  const { useSecurityToken, setUseSecurityToken } = useSecurity();
  const { selectedModel, setSelectedModel } = useModel();
  const { toast } = useToast();
  const { selectedDemo } = useDemo();
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = async () => {
    if (!selectedDemo) {
      toast({
        title: "Error",
        description: "Please select a demo first",
        variant: "destructive",
      });
      return;
    }

    setIsDeploying(true);
    try {
      const usecaseId = selectedDemo.usecaseId;
      
      const response = await fetch('http://localhost:6001/api/configure-usecase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usecaseId }),
      });

      if (!response.ok) {
        throw new Error('Failed to configure usecase');
      }

      const data = await response.json();
      if (data.success) {
        console.log('API Response:', data);
        
        const outputMessage = typeof data === 'object' 
          ? JSON.stringify(data, null, 2)
          : `Successfully configured: ${selectedDemo.name}`;
          
        toast({
          title: "Configuration Deployed",
          description: outputMessage,
        });
      } else {
        throw new Error(data.error || 'Failed to configure usecase');
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Model</Label>
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            {MODEL_OPTIONS.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>API Endpoint</Label>
        <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select URL" />
          </SelectTrigger>
          <SelectContent>
            {PRESET_URLS.map((url) => (
              <SelectItem key={url} value={url}>
                {url}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={useSecurityToken}
          onCheckedChange={setUseSecurityToken}
        />
        <Label>Use Security Token</Label>
      </div>

      <Button 
        onClick={handleDeploy}
        className="w-full"
        disabled={isDeploying || !selectedDemo}
      >
        <Rocket className="mr-2 h-4 w-4" />
        {isDeploying ? "Deploying..." : "Deploy Configuration"}
      </Button>
    </div>
  );
}

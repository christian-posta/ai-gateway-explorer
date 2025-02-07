
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const PRESET_URLS = [
  "https://api.openai.com/v1/chat/completions",
  "http://localhost:8080/v1/chat/completions",
  "http://localhost:8080/openai",
];

export function ConfigurationTab() {
  const [selectedUrl, setSelectedUrl] = useState(PRESET_URLS[0]);
  const [useSecurityToken, setUseSecurityToken] = useState(true);
  const { toast } = useToast();

  const handleDeploy = () => {
    toast({
      title: "Configuration Deployed",
      description: "Your guardrails configuration has been deployed successfully.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>API Endpoint</Label>
        <div className="space-y-2">
          <Select value={selectedUrl} onValueChange={setSelectedUrl}>
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
      >
        <Rocket className="mr-2 h-4 w-4" />
        Deploy Configuration
      </Button>
    </div>
  );
}

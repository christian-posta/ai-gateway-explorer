
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/contexts/DemoContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket, SendHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PRESET_URLS = [
  "https://api.openai.com/v1/chat/completions",
  "http://localhost:8080/v1/chat/completions",
  "http://localhost:8080/openai",
];

const PROMPT_TEMPLATES = [
  { 
    id: 1, 
    name: "Reject", 
    content: "Can you give me some examples of Mastercard credit card numbers?" 
  },
  { 
    id: 2, 
    name: "Mask", 
    content: "What type of number is 5105105105105100?" 
  },
  { 
    id: 3, 
    name: "LLM Moderation", 
    content: "A person describes planning to harm others at a public event using dangerous weapons. They talk in detail about how they intend to carry out the act, including causing physical harm and destruction." 
  },
  { 
    id: 4, 
    name: "Custom", 
    content: "What type of number is 5105-1051-0510-5100" 
  },
];

export function ControlPanel() {
  const { selectedDemo } = useDemo();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(PRESET_URLS[0]);
  const [customUrl, setCustomUrl] = useState("");
  const [useSecurityToken, setUseSecurityToken] = useState(true);
  const [selectedPrompt, setSelectedPrompt] = useState(PROMPT_TEMPLATES[0]);
  const [currentJWT, setCurrentJWT] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const handleCredentialsChange = (event: CustomEvent<string>) => {
      setCurrentJWT(event.detail);
    };

    window.addEventListener('credentialsChanged', handleCredentialsChange as EventListener);

    return () => {
      window.removeEventListener('credentialsChanged', handleCredentialsChange as EventListener);
    };
  }, []);

  // Function to decode base64url
  const base64UrlDecode = (str: string): string => {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64.length % 4;
    const paddedBase64 = pad ? base64 + '='.repeat(4 - pad) : base64;
    
    try {
      return decodeURIComponent(atob(paddedBase64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    } catch (e) {
      console.error('Error decoding base64url:', e);
      return str;
    }
  };

  // Function to check if a string is a valid JWT token
  const isValidJWT = (token: string): boolean => {
    if (!token) return false;
    const parts = token.split('.');
    return parts.length === 3 && parts.every(part => part.length > 0);
  };

  // Function to format JWT token
  const formatJWT = (token: string) => {
    if (!token || !isValidJWT(token)) return null;

    try {
      const [header, payload, signature] = token.split('.');
      
      return {
        header: JSON.parse(base64UrlDecode(header)),
        payload: JSON.parse(base64UrlDecode(payload)),
        signature
      };
    } catch (e) {
      console.error('Error parsing JWT:', e);
      return null;
    }
  };

  // Function to get security credentials from the main panel
  const getSecurityCredentials = (): string => {
    const input = document.querySelector('input[type="password"], input[type="text"]') as HTMLInputElement;
    return input?.value || '';
  };

  const handleDeploy = () => {
    toast({
      title: "Configuration Deployed",
      description: "Your guardrails configuration has been deployed successfully.",
    });
  };

  const fillMainPanelPrompt = () => {
    const textarea = document.getElementById('main-prompt-textarea') as HTMLTextAreaElement;
    if (textarea) {
      textarea.value = selectedPrompt.content;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      toast({
        title: "Prompt Filled",
        description: "The prompt template has been copied to the main panel.",
      });
    }
  };

  const handleUrlChange = (value: string) => {
    setSelectedUrl(value);
    setCustomUrl(value);
  };

  const renderJWTDetails = () => {
    const decodedJWT = formatJWT(currentJWT);
    
    return (
      <div className="space-y-2">
        <Label>JWT Token Details</Label>
        {decodedJWT ? (
          <ScrollArea className="h-[15vh] w-full rounded-md border p-4">
            <pre className="text-sm font-mono">
              {JSON.stringify(decodedJWT, null, 2)}
            </pre>
          </ScrollArea>
        ) : (
          <div className="text-sm text-muted-foreground p-4">
            No valid JWT token found in security credentials
          </div>
        )}
      </div>
    );
  };

  const renderGuardrailsContent = () => (
    <Tabs defaultValue="prompts" className="space-y-4">
      <TabsList>
        <TabsTrigger value="prompts">Prompt Templates</TabsTrigger>
        <TabsTrigger value="config">Configuration</TabsTrigger>
        <TabsTrigger value="jwt">JWT Details</TabsTrigger>
      </TabsList>

      <TabsContent value="prompts" className="space-y-4">
        <div className="space-y-2">
          <Label>Select Prompt Template</Label>
          <Select value={selectedPrompt.id.toString()} onValueChange={(value) => 
            setSelectedPrompt(PROMPT_TEMPLATES.find(p => p.id.toString() === value) || PROMPT_TEMPLATES[0])
          }>
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
      </TabsContent>

      <TabsContent value="config" className="space-y-4">
        <div className="space-y-2">
          <Label>API Endpoint</Label>
          <div className="space-y-2">
            <Select value={selectedUrl} onValueChange={handleUrlChange}>
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
      </TabsContent>

      <TabsContent value="jwt" className="space-y-4">
        {renderJWTDetails()}
      </TabsContent>
    </Tabs>
  );

  const renderDefaultContent = () => (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="jwt">JWT Details</TabsTrigger>
      </TabsList>

      <TabsContent value="general" className="space-y-4">
        <div className="space-y-2">
          <Label>API Endpoint</Label>
          <div className="space-y-2">
            <Select value={selectedUrl} onValueChange={handleUrlChange}>
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
            <Input
              type="text"
              placeholder="Enter custom URL"
              value={customUrl}
              onChange={(e) => {
                setCustomUrl(e.target.value);
                setSelectedUrl(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={useSecurityToken}
            onCheckedChange={setUseSecurityToken}
          />
          <Label>Use Security Token</Label>
        </div>
      </TabsContent>

      <TabsContent value="jwt" className="space-y-4">
        {renderJWTDetails()}
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
                onClick={() => setIsCollapsed(!isCollapsed)}
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

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSettings } from "@/contexts/SettingsContext";
import { Eye, EyeOff, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useEndpoint } from "@/contexts/EndpointContext";

export function MainPanel({ controlPanelCollapsed = false }: { controlPanelCollapsed?: boolean }) {
  const { settings } = useSettings();
  const { selectedEndpoint } = useEndpoint();
  const [prompt, setPrompt] = useState("");
  const [showCredentials, setShowCredentials] = useState(false);
  const [credentials, setCredentials] = useState("");
  const [response, setResponse] = useState("");
  const [isRawView, setIsRawView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCredentials(newValue);
    // Store in sessionStorage for persistence
    sessionStorage.setItem('jwtCredentials', newValue);
    // Dispatch custom event when credentials change
    window.dispatchEvent(new CustomEvent('credentialsChanged', { detail: newValue }));
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (!selectedEndpoint) {
        throw new Error("No API endpoint selected");
      }

      const response = await fetch('http://localhost:3000/api/llm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          endpoint: selectedEndpoint,
          credentials: credentials || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from API');
      }

      const data = await response.json();
      setResponse(data.choices?.[0]?.message?.content || JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setResponse("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`bg-enterprise-50 p-4 flex flex-col transition-all duration-300 ${
      controlPanelCollapsed ? 'h-[calc(100vh-3rem)]' : 'h-[calc(100vh-30vh)]'
    }`}>
      <div className="flex items-center space-x-4 mb-4">
        {settings.logoUrl && (
          <img
            src={settings.logoUrl}
            alt="Company Logo"
            className="h-8 w-8 object-contain"
          />
        )}
        <h1 className="text-2xl font-bold text-enterprise-900">
          {settings.companyName}
        </h1>
      </div>

      <div className="flex-grow overflow-auto bg-white rounded-lg p-4 mb-4 border border-enterprise-200">
        {isRawView ? (
          <pre className="text-sm">{response}</pre>
        ) : (
          <div className="prose">{response}</div>
        )}
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Input
            type={showCredentials ? "text" : "password"}
            placeholder="Enter security credentials"
            value={credentials}
            onChange={handleCredentialsChange}
            className="pr-10"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowCredentials(!showCredentials)}
          >
            {showCredentials ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="flex flex-col space-y-2">
          <Textarea
            placeholder="Enter your prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px] resize-none"
            id="main-prompt-textarea"
          />
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading}
          >
            <Send className="h-4 w-4 mr-2" />
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={() => setIsRawView(!isRawView)}
          className="text-sm"
        >
          {isRawView ? "Show Formatted View" : "Show Raw View"}
        </Button>
      </div>
    </div>
  );
}

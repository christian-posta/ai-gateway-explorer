
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSettings } from "@/contexts/SettingsContext";
import { Eye, EyeOff, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export function MainPanel({ controlPanelCollapsed = false }: { controlPanelCollapsed?: boolean }) {
  const { settings } = useSettings();
  const [prompt, setPrompt] = useState("");
  const [showCredentials, setShowCredentials] = useState(false);
  const [credentials, setCredentials] = useState("");
  const [response, setResponse] = useState("");
  const [isRawView, setIsRawView] = useState(false);

  const handleSubmit = async () => {
    // TODO: Implement API call
    console.log("Submitting prompt:", prompt);
    setResponse("API response will be displayed here");
  };

  return (
    <div className={`bg-enterprise-50 p-4 flex flex-col transition-all duration-300 ${
      controlPanelCollapsed ? 'h-[calc(100vh-3rem)]' : 'h-[70vh]'
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
            onChange={(e) => setCredentials(e.target.value)}
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
          <Button onClick={handleSubmit}>
            <Send className="h-4 w-4 mr-2" />
            Submit
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

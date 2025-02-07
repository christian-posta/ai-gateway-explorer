import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const PRESET_URLS = [
  "https://api.openai.com/v1/chat/completions",
  "http://localhost:8080/v1/chat/completions",
  "http://localhost:8080/openai",
];

export function ControlPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(PRESET_URLS[0]);
  const [useSecurityToken, setUseSecurityToken] = useState(true);
  const [jwtToken, setJwtToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...");

  return (
    <div
      className={`bg-enterprise-100 border-t border-enterprise-200 transition-all duration-300 ${
        isCollapsed ? "h-12" : "h-[30vh]"
      } absolute bottom-0 left-0 right-0`}
    >
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
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>API Endpoint</Label>
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

            <div className="space-y-2">
              <Label>JWT Token</Label>
              <pre className="bg-white p-2 rounded text-sm overflow-auto">
                {jwtToken}
              </pre>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={useSecurityToken}
                onCheckedChange={setUseSecurityToken}
              />
              <Label>Use Security Token</Label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
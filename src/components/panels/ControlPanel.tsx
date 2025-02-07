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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  // Function to format JWT token
  const formatJWT = (token: string) => {
    try {
      const [header, payload, signature] = token.split('.');
      return {
        header: JSON.parse(atob(header)),
        payload: JSON.parse(atob(payload)),
        signature
      };
    } catch (e) {
      console.error('Error parsing JWT:', e);
      return { raw: token };
    }
  };

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
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="jwt">JWT Details</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
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

              <div className="flex items-center space-x-2">
                <Switch
                  checked={useSecurityToken}
                  onCheckedChange={setUseSecurityToken}
                />
                <Label>Use Security Token</Label>
              </div>
            </TabsContent>

            <TabsContent value="jwt" className="space-y-4">
              <div className="space-y-2">
                <Label>JWT Token Details</Label>
                <ScrollArea className="h-[15vh] w-full rounded-md border p-4">
                  <pre className="text-sm font-mono">
                    {JSON.stringify(formatJWT(jwtToken), null, 2)}
                  </pre>
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
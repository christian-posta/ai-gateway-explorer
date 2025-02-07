
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatJWT } from "@/utils/jwtUtils";

export function JWTDetailsTab() {
  const [credentials, setCredentials] = useState('');

  useEffect(() => {
    const handleCredentialsChange = (event: CustomEvent<string>) => {
      setCredentials(event.detail);
    };

    window.addEventListener('credentialsChanged', handleCredentialsChange as EventListener);

    return () => {
      window.removeEventListener('credentialsChanged', handleCredentialsChange as EventListener);
    };
  }, []);

  const renderJWTDetails = () => {
    const decodedJWT = formatJWT(credentials);
    
    return (
      <div className="space-y-2">
        <Label>JWT Token Details</Label>
        {decodedJWT ? (
          <ScrollArea className="h-[15vh] w-full rounded-md border p-4">
            <pre className="text-sm font-mono break-words whitespace-pre-wrap overflow-wrap-anywhere">
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

  return renderJWTDetails();
}

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatJWT } from "@/utils/jwtUtils";
import { useSecurity } from "@/contexts/SecurityContext";

export function JWTDetailsTab() {
  const { useSecurityToken } = useSecurity();
  const [credentials, setCredentials] = useState(() => {
    // Initialize from sessionStorage if available
    return sessionStorage.getItem('jwtCredentials') || '';
  });

  useEffect(() => {
    const handleCredentialsChange = (event: CustomEvent<string>) => {
      console.log('Event received:', event.detail);
      setCredentials(event.detail);
    };

    // Add event listener
    window.addEventListener('credentialsChanged', handleCredentialsChange as EventListener);

    // Clean up
    return () => {
      window.removeEventListener('credentialsChanged', handleCredentialsChange as EventListener);
    };
  }, []);

  const decodedJWT = formatJWT(credentials);

  console.log('Current credentials:', credentials);
  console.log('Decoded JWT:', decodedJWT);

  return (
    <div className="space-y-2">
      <Label>JWT Token Details</Label>
      {useSecurityToken && credentials && decodedJWT ? (
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
}

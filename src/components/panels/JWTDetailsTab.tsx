
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatJWT } from "@/utils/jwtUtils";

export function JWTDetailsTab() {
  const getSecurityCredentials = (): string => {
    const input = document.querySelector('input[type="password"], input[type="text"]') as HTMLInputElement;
    return input?.value || '';
  };

  const renderJWTDetails = () => {
    const credentials = getSecurityCredentials();
    const decodedJWT = formatJWT(credentials);
    
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

  return renderJWTDetails();
}

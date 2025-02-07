
export const base64UrlDecode = (str: string): string => {
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

export const isValidJWT = (token: string): boolean => {
  if (!token) return false;
  const parts = token.split('.');
  return parts.length === 3 && parts.every(part => part.length > 0);
};

export const formatJWT = (token: string) => {
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

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApiWithStore } from "@/hooks/useApiWithStore";
import { useAuthStore } from "@/lib/stores/authStore";

// Prevent pre-rendering during build time
export const dynamic = 'force-dynamic';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { oauthCallback } = useApiWithStore();
  const { setToken, setUsername, setPrefLangs } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const oauth_verifier = searchParams.get("oauth_verifier");
    const oauth_token = searchParams.get("oauth_token");
    
    if (!oauth_verifier || !oauth_token) {
      setError("Missing OAuth parameters.");
      return;
    }

    // Get request_token from localStorage
    const request_token = localStorage.getItem('request_token');
    if (!request_token) {
      setError("Missing request token.");
      return;
    }

    // Construct query string from URL parameters
    const query_string = `oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`;

    (async () => {
      try {
        const data = await oauthCallback(request_token, query_string);
        if (data.token) {
          setToken(data.token);
          setUsername(data.username);
          setPrefLangs(data.pref_langs);
          // Clean up request_token
          localStorage.removeItem('request_token');
          router.replace("/");
        } else {
          setError("No token received from server.");
        }
      } catch (err: any) {
        setError(err.message || "Unknown error");
      }
    })();
  }, [searchParams, router, oauthCallback, setToken, setUsername, setPrefLangs]);

  if (error) {
    return <div className="p-8 text-center text-red-600">Auth failed: {error}</div>;
  }
  return <div className="p-8 text-center">Authenticating...</div>;
} 
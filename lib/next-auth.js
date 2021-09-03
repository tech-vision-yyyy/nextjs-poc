import { useEffect } from "react";

import { useSession, signIn } from "next-auth/client";

export default function NextAuth({ children }) {
  const [session, loading] = useSession();
  const isUser = !!session?.user;
  useEffect(() => {
    if (loading) return;
    if (!isUser) {
      signIn("okta", { callbackUrl: "/home" });
    }
  }, [isUser, loading]);

  if (isUser) {
    return children;
  }
  return <div>Loading...</div>;
}

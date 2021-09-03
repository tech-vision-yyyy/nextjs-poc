import { SWRConfig } from "swr";

import fetcher from "./fetcher";

export default function CustomConfig({ fallback, children }) {
  console.log(`fallback: ${JSON.stringify(fallback)}`);
  return (
    <SWRConfig
      value={{
        fallback,
        fetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
}

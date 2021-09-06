import { SWRConfig } from "swr";

import fetcher from "./fetcher";

export default function CustomConfig({ fallback, children }) {
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

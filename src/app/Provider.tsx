"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "./store";
import { ReactNode } from "react";

// Define props interface
interface ProvidersProps {
  children: ReactNode;
}

// Combined Providers component
export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </SessionProvider>
  );
}

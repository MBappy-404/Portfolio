'use client';

import { ReactNode } from "react";
import { Providers } from "./Providers";

export default function ProvidersWrapper({ children }: { children: ReactNode }) {
  return <Providers>{children}</Providers>;
}

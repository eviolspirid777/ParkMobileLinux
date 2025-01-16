"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode, useState } from "react";

type CustomQueryProviderProps = {
  children: ReactNode
}

export const CustomQueryProvider: FC<CustomQueryProviderProps> = ({
  children
}) => {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider
      client={client}
    >
      {children}
    </QueryClientProvider>
  )
}
"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools/>}
    </QueryClientProvider>
  )
}
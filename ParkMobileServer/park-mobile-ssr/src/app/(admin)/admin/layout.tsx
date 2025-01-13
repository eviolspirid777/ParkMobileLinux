"use client";
import { ConfigProvider } from "antd";
import "../../App.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body style={{width:"100%"}}>
        <ConfigProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}

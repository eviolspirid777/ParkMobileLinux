import type { Metadata } from "next";
import "../App.scss";
import { HeaderComponentPack } from "@/Components/HeaderComponentPack/HeaderComponentPack";
import { Footer } from "@/Components/Footer/Footer";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const metadata: Metadata = {
  title: "Park Mobile",
  description: "Park Mobile Краснодар",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <AntdRegistry>
          <HeaderComponentPack />
          {children}
          <Footer />
        </AntdRegistry>
      </body>
    </html>
  );
}

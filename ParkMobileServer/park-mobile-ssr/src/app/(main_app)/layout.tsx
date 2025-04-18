import type { Metadata } from "next";
import "../App.scss";
import { HeaderComponentPack } from "@/Components/HeaderComponentPack/HeaderComponentPack";
import { Footer } from "@/Components/Footer/Footer";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ContactMe } from "@/Components/ContactMe/ContactMe";

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
    <AntdRegistry>
      <HeaderComponentPack />
      {children}
      <Footer />
      <ContactMe />
    </AntdRegistry>
  );
}

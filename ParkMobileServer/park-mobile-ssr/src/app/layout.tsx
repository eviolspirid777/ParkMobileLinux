import type { Metadata } from "next";
import "./App.scss";

export const metadata: Metadata = {
  title: "Park Mobile",
  description: "Park Mobile Краснодар",
};
//docker build -t your-image-name .
//docker run -p 3000:3000 your-image-name

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}

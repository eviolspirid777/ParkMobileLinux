import type { Metadata } from "next";
import "./App.scss";
import Head from "next/head";

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
      <Head>
        <script
          type="text/javascript"
          src="https://mc.yandex.ru/metrika/tag.js"
          async
        ></script>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/99483189"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
            />
          </div>
        </noscript>
      </Head>
      <body>{children}</body>
    </html>
  );
}

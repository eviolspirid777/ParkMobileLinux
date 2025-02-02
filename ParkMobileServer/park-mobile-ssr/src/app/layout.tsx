import type { Metadata } from "next";
import "./App.scss";
import Script from "next/script";

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
      <body style={{width:"100%"}}>
        <Script
          id="yandex-metrica"
          async={false}
          strategy={"afterInteractive"}
        >
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            ym(99483189, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true
            });
          `}
        </Script>
        <noscript><div><img src="https://mc.yandex.ru/watch/99483189" style={{position:"absolute", left:"-9999px"}} alt="" /></div></noscript>
        {children}
      </body>
    </html>
  );
}
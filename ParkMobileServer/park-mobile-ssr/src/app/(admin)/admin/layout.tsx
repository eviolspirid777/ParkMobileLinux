import { ConfigProvider } from "antd";
import "../../App.scss";

import { CustomQueryProvider } from "@/Shared/Components/CustomQueryProvider/CustomQueryProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body style={{width:"100%"}}>
        <ConfigProvider>
          <CustomQueryProvider>
            {children}
          </CustomQueryProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}

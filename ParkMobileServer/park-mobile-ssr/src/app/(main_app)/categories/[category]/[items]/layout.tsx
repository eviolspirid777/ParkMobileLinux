import { CustomQueryProvider } from "@/Shared/Components/CustomQueryProvider/CustomQueryProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CustomQueryProvider>
      {children}
    </CustomQueryProvider>
  );
}
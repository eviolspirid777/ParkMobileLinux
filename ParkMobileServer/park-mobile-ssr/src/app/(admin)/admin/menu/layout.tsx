"use client";
import { Layout, Menu } from "antd";
import "../../../App.scss";
import { bottomMenu, navLinks } from "../NavigateLinks";
import { useRouter } from "next/navigation";

import styles from "./Layout.module.scss";
import { apiClient } from "@/api/ApiClient";
import { useSession } from "@/Shared/Hooks/useSession";
import { useLayoutEffect } from "react";

const { Content, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
};

const mainLayoutStyle: React.CSSProperties = {
  height: "100vh",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sessionToken, logout } = useSession();

  useLayoutEffect(() => {
    if (!sessionToken) {
      logout();
    }
  }, [sessionToken, logout]);

  const navigate = useRouter();

  const navigateClick = (item: { key: string }) => {
    if (item.key == "items") {
      navigate.push("/admin/menu");
    } else {
      navigate.push(`/admin/menu/${item.key}`);
    }
  };

  const handleLogout = () => {
    navigate.push("/admin");
    apiClient.Logout();
  };

  return (
    <html lang="en">
      <body>
        <Layout style={mainLayoutStyle} hasSider>
          <Sider collapsible style={siderStyle}>
            <div className={styles["shell-page"]}>
              <div className={styles["shell-page-logo-container"]}>
                <span className={styles["shell-page-logo-container-text"]}>
                  ParkMobile Admin
                </span>
              </div>
              <Menu
                className={styles["menu-style"]}
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["Items"]}
                items={navLinks}
                onClick={navigateClick}
              />
              <Menu
                theme="dark"
                mode="inline"
                items={bottomMenu}
                onClick={handleLogout}
              />
            </div>
          </Sider>
          <Layout id="main" className={styles["main-layout"]}>
            <Content style={{ margin: "24px 16px 0px 220px" }}>
              {children}
            </Content>
          </Layout>
        </Layout>
      </body>
    </html>
  );
}

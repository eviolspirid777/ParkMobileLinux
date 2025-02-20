"use client";
import { Badge, Layout, Menu, MenuProps } from "antd";
import "../../../App.scss";
import { LogoutOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

import styles from "./Layout.module.scss";
import { apiClient } from "@/api/ApiClient";
import { useSession } from "@/Shared/Hooks/useSession";
import { createElement, useLayoutEffect } from "react";
import { useAtom } from "jotai";
import { ordersCountAtom } from "@/Store/OrdersStore";
import { useOrdersCount } from "@/hooks/useOrdersCount";

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

  useOrdersCount();
  const [ ordersCount ] = useAtom(ordersCountAtom);

  const navLinks: MenuProps["items"] = [
    {
      key: "_group1",
      label: "Товары",
      type: "group",
      children: [
        {
          key: "items",
          icon: <i className="fa-solid fa-boxes-stacked" />,
          label: "Товары",
        },
      ],
    },
    {
      key: "_group2",
      label: "Класс",
      type: "group",
      children: [
        {
          key: "brands",
          icon: <i className="fa-solid fa-table" />,
          label: "Бренды",
        },
        {
          key: "categories",
          icon: <i className="fa-solid fa-list" />,
          label: "Категории",
        },
        {
          key: "filters",
          icon: <i className="fa-solid fa-filter"/>,
          label: "Фильтры"
        }
      ],
    },
    {
      key: "_group3",
      label: "Слайдер",
      type: "group",
      children: [
        {
          key: "slider",
          icon: <i className="fa-solid fa-photo-film" />,
          label: "Изображения",
        },
      ],
    },
    {
      key: "_group4",
      label: "Заказы",
      type: "group",
      children: [
        {
          key: "orders",
          icon: <i className="fa-solid fa-box" />,
          label: (
            <Badge
              count={ordersCount}
              offset={[70,7]}
            >
              <span
                style={{
                  color: "white"
                }}
              >
                Заказы
              </span>
            </Badge>
          )
        }
      ]
    }
  ];

  const bottomMenu: MenuProps["items"] = [
    { key: "/admin", icon: createElement(LogoutOutlined), label: "Выйти" },
  ];


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
      <body style={{width:"100%"}}>
        <Layout style={mainLayoutStyle} hasSider>
          <Sider collapsible style={siderStyle}>
            <div className={styles["shell-page"]}>
              <div className={styles["shell-page-logo-container"]}>
                <span className={styles["shell-page-logo-container-text"]}>
                  ParkMobile Admin
                </span>
              </div>
              <Menu
                key={ordersCount}
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

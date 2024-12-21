import { MenuProps } from "antd";
import React from "react";

import { LogoutOutlined } from "@ant-design/icons";

export const navLinks: MenuProps["items"] = [
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
      // {
      //   key: "items-groups",
      //   icon: <i className="fa-solid fa-memo"/>,
      //   label: "Опции товаров"
      // },
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
        label: "Брэнды",
      },
      {
        key: "categories",
        icon: <i className="fa-solid fa-list" />,
        label: "Категории",
      },
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
];

export const bottomMenu: MenuProps["items"] = [
  { key: "/admin", icon: React.createElement(LogoutOutlined), label: "Выйти" },
];

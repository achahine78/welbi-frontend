import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const items = [
  {
    label: "Welbi",
    key: "grp",
    children: [
      {
        label: "Residents",
        key: "residents",
      },
      {
        label: "Programs",
        key: "programs",
      },
    ],
    type: "group",
  },
];

const SideMenu: React.FC = () => {
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={["residents"]}
      defaultOpenKeys={["grp"]}
      mode="inline"
      items={items}
    />
  );
};

export default SideMenu;

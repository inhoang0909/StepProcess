import React from "react";
import { Layout, Menu, Dropdown, Space } from "antd";
import { DownOutlined, GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const { Header } = Layout;

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language.toUpperCase();

  const handleLanguageChange = ({ key }) => {
    i18n.changeLanguage(key.toLowerCase());
  };

  const languageMenu = (
    <Menu onClick={handleLanguageChange}>
      <Menu.Item key="en">English</Menu.Item>
      <Menu.Item key="vi">Tiếng Việt</Menu.Item>
      <Menu.Item key="zh">中文</Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#001529",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20}}>
        <Link to="/" style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
         {t("trackingForm")}
        </Link>
        <Link to="/dashboard" style={{ color: "#fff",fontSize: 16, fontWeight: "bold"}}>
          {t("dashboard")}
        </Link>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Dropdown overlay={languageMenu} placement="bottomRight">
          <Space style={{ color: "#fff", marginRight: 20, cursor: "pointer" }}>
            <GlobalOutlined /> {currentLang} <DownOutlined />
          </Space>
        </Dropdown>
      </div>
    </Header>
  );
}

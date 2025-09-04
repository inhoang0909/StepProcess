import { Layout, ConfigProvider } from "antd";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import { useTranslation } from "react-i18next";

import viVN from "antd/locale/vi_VN";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";

import "dayjs/locale/vi";
import "dayjs/locale/en";
import "dayjs/locale/zh-cn";
import Dashboard from "./pages/Dashboard";
import StepPage from "./pages/MultiStepForm";
import ScanPage from "./pages/ScanPage";
import Summary from "./pages/Summary";


const { Content } = Layout;

export default function App() {
  const { i18n } = useTranslation();

  const getAntdLocale = () => {
    switch (i18n.language) {
      case "vi":
        return viVN;
      case "zh":
      case "zh-CN":
        return zhCN;
      case "en":
      default:
        return enUS;
    }
  };

  return (
    <ConfigProvider locale={getAntdLocale()}>
      <Layout>
        <Navbar  mode={window.innerWidth < 1024 ? "inline" : "horizontal"} />
        <Content style={{
          padding: window.innerWidth < 1024 ? "12px" : "20px",
        
        }}>
          <Routes>
            <Route path="/" element={<ScanPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/step/:step" element={<StepPage />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

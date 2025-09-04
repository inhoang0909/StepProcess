import { useState } from "react";
import { Input, Button, Card, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ensureForm } from "../utils/helper";

const { Title } = Typography;
const TARGET_QR = ["123", "456", "789"];

export default function ScanPage() {
  const navigate = useNavigate();
  const [scanValue, setScanValue] = useState("");
  const { t } = useTranslation();

  const handleScan = () => {
    const qr = scanValue.trim();
    if (!TARGET_QR.includes(qr)) {
      message.error(t("scan.invalid_qr"));
      return;
    }

    const form = ensureForm(qr);

    if (form.currentStep > 7) {
      message.info(t("scan.completed"));
      navigate(`/summary?id=${form.id}`);
    } else {
      navigate(`/step/${form.currentStep}?id=${form.id}`);
    }
    setScanValue("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
      }}
    >
      <Card
        style={{
          width: 900,
          padding: "50px",
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          bottom: 100
        }}
      >
        <Title style={{ textAlign: "center", color: "#001529" }} level={4}>
          {t("scan.title")}
        </Title>
        <Input
          placeholder={t("scan.placeholder")}
          value={scanValue}
          onChange={(e) => setScanValue(e.target.value)}
          onPressEnter={handleScan}
          style={{ marginBottom: 10 }}
        />
        <Button
          type="primary"
          onClick={handleScan}
          style={{
            display: "block",
            margin: "0 auto",
            backgroundColor: "#001529",
            borderColor: "#001529",
            fontSize: "16px",
          }}
        >
          {t("scan.button")}
        </Button>
      </Card>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { Modal, Button, Typography, Card, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ensureForm } from "../utils/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Html5Qrcode } from "html5-qrcode";
import { CameraFilled } from "@ant-design/icons";

const { Title, Text } = Typography;
const TARGET_QR = ["25080319-W-RB001G000-34", "456", "789", "123"];

export default function ScanPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const scannerRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [scanValue, setScanValue] = useState("");
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;

  const handleScan = async (qrCodeMessage) => {
    const qr = qrCodeMessage.trim();
    setScanValue(qr);

    if (!TARGET_QR.includes(qr)) {
      toast.error(t("scan.invalid_qr"));
      return;
    }

    const form = ensureForm(qr);

    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
      } catch {}
      scannerRef.current = null;
    }

    setModalOpen(false);
    setTimeout(() => {
      const qrDiv = document.getElementById("qr-reader");
      if (qrDiv) qrDiv.innerHTML = "";

      if (form.currentStep > 7) {
        toast.info(t("scan.completed"));
        navigate(`/summary?id=${form.id}`, { replace: false });
      } else {
        navigate(`/step/${form.currentStep}?id=${form.id}`, { replace: false });
      }
    }, 350);
  };

  const handleManualInput = () => {
    const qr = scanValue.trim();
    if (!TARGET_QR.includes(qr)) {
      toast.error(t("scan.invalid_qr"));
      return;
    }
    const form = ensureForm(qr);
    if (form.currentStep > 7) {
      toast.info(t("scan.completed"));
      navigate(`/summary?id=${form.id}`);
    } else {
      navigate(`/step/${form.currentStep}?id=${form.id}`);
    }
  };

  useEffect(() => {
    if (!modalOpen) return;

    let html5QrCode;
    let isMounted = true;

    setTimeout(() => {
      if (!isMounted) return;
      html5QrCode = new Html5Qrcode("qr-reader");
      scannerRef.current = html5QrCode;

      html5QrCode
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          (qrCodeMessage) => handleScan(qrCodeMessage),
          () => {}
        )
        .catch(() => {});
    }, 300);

    return () => {
      isMounted = false;
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
        scannerRef.current.clear().catch(() => {});
        scannerRef.current = null;
      }
      const qrDiv = document.getElementById("qr-reader");
      if (qrDiv) qrDiv.innerHTML = "";
    };
  }, [modalOpen]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0f2f5 0%, #fafafa 100%)",
        padding: 24,
      }}
    >
      <ToastContainer position="top-center" />
      <Card
        style={{
          width: "100%",
          maxWidth: 500,
          padding: "40px 32px",
          borderRadius: "20px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <Title level={3} style={{ marginBottom: 24, color: "#001529" }}>
          {t("scan.title")}
        </Title>

        {isDesktop ? (
          <Space direction="vertical" style={{ width: "100%", marginBottom: 24 }}>
            <Input
              value={scanValue}
              onChange={(e) => setScanValue(e.target.value)}
              style={{ textAlign: "center", borderRadius: 8 }}
              onPressEnter={handleManualInput}
            />
            <Button
              type="primary"
              size="large"
              block
              onClick={handleManualInput}
              style={{
                fontSize: 16,
                height: 48,
                borderRadius: 12,
                width: "100px",
                backgroundColor: "#001529",
              }}
            >
              {t("scan.submit") || "Scan QR"}
            </Button>
          </Space>
        ) : (
          <Button
            type="primary"
            size="large"
            block
            style={{
              fontSize: 16,
              height: 48,
              borderRadius: 12,
              marginBottom: 8,
              backgroundColor: "#001529",
            }}
            onClick={() => setModalOpen(true)}
          >
            <CameraFilled size={48} style={{ color: "#ffffff" }} />
            {t("openCamera") || "Open Camera to Scan QR"}
          </Button>
        )}
      </Card>

      {!isDesktop && (
        <Modal
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          footer={null}
          centered
          width={420}
          destroyOnHidden
          maskClosable={false}
          styles={{
            padding: "16px 12px",
            textAlign: "center",
            background: "#f9f9f9",
            borderRadius: 16,
          }}
        >
          <Title level={4} style={{ marginBottom: 16 }}>
            {t("scan.title")}
          </Title>
          <div
            id="qr-reader"
            style={{
              width: "100%",
              maxWidth: 360,
              margin: "0 auto",
              borderRadius: 12,
              overflow: "hidden",
              background: "#000",
            }}
          />
        </Modal>
      )}
    </div>
  );
}



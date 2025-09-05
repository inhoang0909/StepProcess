import { Modal, Typography } from "antd";
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef } from "react";

const { Title } = Typography;

export function CameraScannerModal({ open, onClose, onScan }) {
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const qrDiv = document.getElementById("qr-reader");
    if (qrDiv) qrDiv.innerHTML = "";

    const html5QrCode = new Html5Qrcode("qr-reader");
    scannerRef.current = html5QrCode;

    html5QrCode
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => onScan(decodedText),
        () => {}
      )
      .catch(() => {});

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
        scannerRef.current.clear().catch(() => {});
        scannerRef.current = null;
      }
      if (qrDiv) qrDiv.innerHTML = "";
    };
  }, [open]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={420}
      destroyOnClose
      maskClosable={false}
      bodyStyle={{
        padding: "16px 12px",
        textAlign: "center",
        background: "#f9f9f9",
        borderRadius: 16,
      }}
    >
      <Title level={4} style={{ marginBottom: 16 }}>
        Scan QR
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
  );
}

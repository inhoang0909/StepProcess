import { useEffect, useState } from "react";
import { Button, Space } from "antd";
import { CameraFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import CameraModal from "../WorkerInfo/CameraModal";
import ManualInputForm from "../WorkerInfo/ManualInputForm";
import ConfirmWorkerInfo from "../WorkerInfo/ConfirmWorkerInfo";
import WorkerInfoCard from "../WorkerInfo/WorkerInfoCard";


export default function Login({ value, onChange }) {
  const { t } = useTranslation();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [workerInfo, setWorkerInfo] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setCameraOpen(true);
  }, []);

  const handleSuccess = (data) => {
    setWorkerInfo(data);
    setShowConfirm(true);
  };

  const handleMaxAttempts = () => {
    setCameraOpen(false);
  };

  const handleConfirm = (data) => {
    setWorkerInfo(data);
    onChange(data);
    setShowConfirm(false);
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: 24 }}>
      <Space direction="vertical" size={20} style={{ width: "100%", alignItems: "center" }}>
        <Button
          icon={<CameraFilled />}
          onClick={() => setCameraOpen(true)}
          type="default"
          style={{ fontSize: "18px", padding: "12px 32px", width: 220 }}
        >
          {t("takePhoto") || "Open Camera"}
        </Button>

        <CameraModal
          open={cameraOpen}
          onClose={() => setCameraOpen(false)}
          onSuccess={handleSuccess}
          onMaxAttempts={handleMaxAttempts}
          captureInterval={3000}
          t={t}
        />

        {!value && !cameraOpen && !showConfirm && (
          <ManualInputForm t={t} onConfirm={handleConfirm} />
        )}

        {showConfirm && (
          <ConfirmWorkerInfo t={t} worker={workerInfo} onConfirm={handleConfirm} />
        )}
      </Space>

      {value && !showConfirm && <WorkerInfoCard t={t} value={value} />}
    </div>
  );
}

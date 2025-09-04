import { Card, Input, Button } from "antd";
import { useState } from "react";

export default function ConfirmWorkerInfo({ t, worker, onConfirm }) {
  const [name, setName] = useState(worker.name || worker.workerName || "");
  const [id, setId] = useState(worker.id_string || worker.workerId || "");

  return (
    <Card size="small" style={{ width: "100%", borderRadius: 8, padding: 16 }}>
      <div style={{ marginBottom: 12, fontWeight: 600 }}>
        {t("msg.editInfo") || "Edit and confirm worker info"}
      </div>
      <Input
        placeholder={t("label.workerName") || "Worker Name"}
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: 8 }}
      />
      <Input
        placeholder={t("label.id") || "Worker ID"}
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{ marginBottom: 12 }}
      />
      <Button type="primary" onClick={() => onConfirm({ workerName: name, workerId: id, score: worker?.score || 0 })} style={{ width: "100%" }}>
        {t("confirm") || "Confirm"}
      </Button>
    </Card>
  );
}

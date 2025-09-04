import { Card, Input, Button } from "antd";
import { useState } from "react";

export default function ManualInputForm({ t, onConfirm }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  return (
    <Card size="small" style={{ width: "100%", borderRadius: 8, padding: 16 }}>
      <div style={{ marginBottom: 12, fontWeight: 600 }}>
        {t("msg.manualInput") || "Or enter ID manually"}
      </div>
      <Input
        placeholder={t("label.id") || "Worker ID"}
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{ marginBottom: 8 }}
        inputMode="numeric"
      />
      <Input
        placeholder={t("label.workerName") || "Worker Name"}
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: 12 }}
      />
      <Button type="primary" onClick={() => onConfirm({ workerId: id, workerName: name, score: 0 })} style={{ width: "100%" }}>
        {t("confirm") || "Confirm"}
      </Button>
    </Card>
  );
}

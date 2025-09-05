import { Input, Button, Space } from "antd";
import { useState } from "react";

export function ManualInputForm({ onSubmit }) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit(value.trim());
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ textAlign: "center", borderRadius: 8 }}
        onPressEnter={handleSubmit}
      />
      <Button
        type="primary"
        size="large"
        block
        style={{ fontSize: 16, height: 48, borderRadius: 12, backgroundColor: "#001529" }}
        onClick={handleSubmit}
      >
        Submit QR
      </Button>
    </Space>
  );
}

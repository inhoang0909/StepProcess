import { Card, Descriptions } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function WorkerInfoCard({ t, value }) {
  return (
    <Card
      size="small"
      style={{ marginTop: 32, borderRadius: 12, background: "#fafcff" }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <UserOutlined style={{ fontSize: 22, color: "#1890ff" }} />
        </div>
      }
    >
      <Descriptions column={1} size="middle" bordered>
        <Descriptions.Item label={t("label.workerName") || "Name"}>
          {value.workerName}
        </Descriptions.Item>
        <Descriptions.Item label={t("label.id") || "ID"}>
          {value.workerId}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}

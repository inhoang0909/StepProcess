import { Table, Checkbox, Card, Descriptions, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { UserOutlined } from "@ant-design/icons";

export default function StepDetail({ step }) {
  const { t } = useTranslation();

  const getLabel = (key) => t(`label.${key}`) || key;

  /** Map field → đơn vị */
  const unitMap = {
    tempMaterial: "°C",
    tempRoll: "°C",
    glueWeight: "kg",
    chemicalWeight: "kg",
    soleThickness: "mm",
    thickness: "mm",
    width: "mm",
    temperature: "°C",
  };

  /** Hàm format value */
  const formatValue = (key, value) => {
    if (value == null) return "";

    // Boolean → Checkbox
    if (typeof value === "boolean") {
      return <Checkbox checked={value} disabled />;
    }

    // Nếu key thuộc nhóm dịch (shift, color, model, pass/fail)
    const translatableKeys = ["shifts", "color", "shoeModel", "pass", "fail"];
    const normalize = (val) => (typeof val === "string" ? val.toLowerCase() : val);

    if (translatableKeys.includes(normalize(key))) {
      return t(`label.${normalize(value)}`) || value;
    }
    // Đơn vị đo lường
    if (unitMap[key] && !isNaN(value)) {
      return `${value} ${unitMap[key]}`;
    }

    // Ngày dạng string
    const d = new Date(value);
    if (!isNaN(d.getTime()) && /\d{4}-\d{2}-\d{2}/.test(value)) {
      return d.toLocaleDateString("vi-VN");
    }

    return String(value);
  };

  /** Component hiển thị property */
  const PropertyDisplay = ({ label, value, keyName }) => {
    if (value == null) return null;

    // WorkerData → Card riêng
    if (keyName === "workerData" && typeof value === "object") {
      return (
        <Card
          size="small"
          style={{ marginBottom: 16, borderRadius: 8 }}
          title={<><UserOutlined /> {t("label.workerInfo")}</>}
        >
          <Descriptions column={2} size="small" bordered>
            <Descriptions.Item label={t("label.workerName")}>
              {value.workerName}
            </Descriptions.Item>
            <Descriptions.Item label={t("label.id")}>
              {value.workerId}
            </Descriptions.Item>

          </Descriptions>
        </Card>
      );
    }

    // Object → Card
    if (
      typeof value === "object" &&
      !Array.isArray(value) &&
      !(value instanceof Date) &&
      !value.$d
    ) {
      return (
        <Card
          size="small"
          style={{ marginBottom: 16, borderRadius: 8 }}
          title={<><UserOutlined /> {label}</>}
        >
          <Descriptions column={1} size="small" bordered>
            {Object.entries(value).map(([k, v]) => (
              <Descriptions.Item key={k} label={getLabel(k)}>
                {formatValue(k, v)}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </Card>
      );
    }

    // Array object → Table
    if (Array.isArray(value) && value.length && typeof value[0] === "object") {
      return (
        <div style={{ marginBottom: 16 }}>
          <b>{label}:</b>
          <Table
            dataSource={value}
            pagination={false}
            size="small"
            rowKey={(record, index) => index}
            columns={Object.keys(value[0])
              .filter((colKey) => !["key", "render", "done", "value"].includes(colKey))
              .map((colKey) => ({
                title: getLabel(colKey),
                dataIndex: colKey,
                render: (v) => formatValue(colKey, v),
              }))}
          />
        </div>
      );
    }

    // Array string/number
    if (Array.isArray(value)) {
      return (
        <div style={{ marginBottom: 8 }}>
          <b>{label}:</b> {value.map((v) => formatValue(keyName, v)).join(", ")}
        </div>
      );
    }

    // Dayjs hoặc Date
    if (value && value.$d) {
      return (
        <div style={{ marginBottom: 8 }}>
          <b>{label}:</b> {value.$d.toLocaleString("vi-VN")}
        </div>
      );
    }

    return (
      <div style={{ marginBottom: 8 }}>
        <b>{label}:</b> {formatValue(keyName, value)}
      </div>
    );
  };

  return (
    <div>
      {step.workDate && (
        <PropertyDisplay label={getLabel("workDate")} value={step.workDate} />
      )}
      {step.shifts && (
        <PropertyDisplay label={getLabel("shifts")} value={step.shifts} keyName="shifts" />
      )}
      {Array.isArray(step.tableData) && step.tableData.length > 0 && (
        <PropertyDisplay label={getLabel("table")} value={step.tableData} />
      )}

      {Object.entries(step)
        .filter(
          ([key]) =>
            !["step", "label", "status", "value", "tableData", "workDate", "shifts", "render"].includes(key)
        )
        .map(([key, value]) => (
          <PropertyDisplay key={key} keyName={key} label={getLabel(key)} value={value} />
        ))}
    </div>
  );
}

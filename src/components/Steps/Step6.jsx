import { Form, InputNumber } from "antd";
import { useTranslation } from "react-i18next";
import Login from "../Layout/WorkerInfoForm";

export default function Step5({ data, updateData }) {
  const { t } = useTranslation();

  const handleValueChange = (_, allValues) => {
    updateData({
      ...allValues,
      value: true,
    });
  };

  return (
    <Form
      layout="vertical"
      initialValues={{
        workerData: data.workerData,
        soleThickness: data.soleThickness,
        tempMaterial: data.tempMaterial,
      }}
      onValuesChange={handleValueChange}
    >
      <Form.Item
        label={t("label.workerInfo")}
        name="workerData"
        style={{ fontWeight: "bold" }}
        rules={[{ required: true, message: t("label.inputWorkerName") }]}
      >
        <Login />
      </Form.Item>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Form.Item
          label={t("label.soleThickness") + " (mm)"}
          name="soleThickness"
          style={{ flex: 1, fontWeight: "bold", minWidth: 140 }}
          rules={[
            { required: true, message: t("label.inputSoleThickness") },
            {
              validator: (_, value) =>
                value === undefined || value === null || isNaN(value)
                  ? Promise.reject(new Error(t("label.validNumber")))
                  : Promise.resolve(),
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            placeholder={t("label.inputSoleThickness")}
            inputMode="numeric"
          />
        </Form.Item>

        <Form.Item
          label={t("label.temperature")}
          name="tempMaterial"
          style={{ flex: 1, fontWeight: "bold", minWidth: 140 }}
          rules={[
            { required: true, message: t("label.inputTemp") },
            {
              validator: (_, value) =>
                value === undefined || value === null || isNaN(value)
                  ? Promise.reject(new Error(t("label.validNumber")))
                  : Promise.resolve(),
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            placeholder={t("label.inputTemp")}
            inputMode="numeric"
          />
        </Form.Item>
      </div>
    </Form>
  );
}

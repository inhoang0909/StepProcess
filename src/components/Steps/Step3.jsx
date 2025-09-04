import { Form, InputNumber, TimePicker } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import Login from "../Layout/WorkerInfoForm";

export default function Step3({ data, updateData }) {
  const { t } = useTranslation();

  const handleValueChange = (_, allValues) => {
    const formattedValues = {
      ...allValues,
      releaseTime: allValues.releaseTime
        ? allValues.releaseTime.format("HH:mm")
        : null,
      value: true,
    };
    updateData(formattedValues);
  };

  return (
    <Form
      layout="vertical"
      initialValues={{
        workerData: data.workerData,
        tempRoll: data.tempRoll,
        releaseTime: data.releaseTime ? dayjs(data.releaseTime, "HH:mm") : null,
        tempMaterial: data.tempMaterial,
        glueWeight: data.glueWeight,
      }}
      onValuesChange={handleValueChange}
    >
      <Form.Item
        label={t("label.workerName")}
        name="workerData"
        style={{ fontWeight: "bold" }}
        rules={[{ required: true, message: t("label.inputWorkerName") }]}
      >
        <Login />
      </Form.Item>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Form.Item
          label={t("label.tempRoll")}
          name="tempRoll"
          style={{ flex: 1, fontWeight: "bold", minWidth: 140 }}
          rules={[
            { required: true, message: t("label.inputTempRoll") },
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
            placeholder={t("label.inputTempRoll")}
            inputMode="numeric"
          />
        </Form.Item>

        <Form.Item
          label={t("label.endTime")}
          name="releaseTime"
          style={{ flex: 1, fontWeight: "bold", minWidth: 140 }}
          rules={[{ required: true, message: t("label.inputEndTime") }]}
        >
          <TimePicker style={{ width: "100%" }} format="HH:mm" inputReadOnly/>
        </Form.Item>
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
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

        <Form.Item
          label={t("label.glueWeight") + " (kg)"}
          name="glueWeight"
          style={{ flex: 1, fontWeight: "bold", minWidth: 140 }}
          rules={[
            { required: true, message: t("label.inputGlueWeight") },
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
            placeholder={t("label.inputGlueWeight")}
            inputMode="numeric"
          />
        </Form.Item>
      </div>
    </Form>
  );
}

import { Form, TimePicker, InputNumber } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import Login from "../Layout/WorkerInfoForm";

export default function Step2({ data, updateData }) {
  const { t } = useTranslation();

  const handleValueChange = (_, allValues) => {
    updateData({
      ...allValues,
      startTime: allValues.startTime
        ? allValues.startTime.format("HH:mm")
        : null,
      endTime: allValues.endTime ? allValues.endTime.format("HH:mm") : null,
      value: true,
    });
  };

  return (
    <Form
      layout="vertical"
      initialValues={{
        workerData: data.workerData,
        startTime: data.startTime ? dayjs(data.startTime, "HH:mm") : null,
        endTime: data.endTime ? dayjs(data.endTime, "HH:mm") : null,
        temperature: data.temperature,
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
          label={t("label.startTime")}
          name="startTime"
          style={{ flex: 1, fontWeight: "bold", minWidth: 140 }}
          rules={[{ required: true, message: t("label.inputStartTime") }]}
        >
          <TimePicker format="HH:mm" style={{ width: "100%" }} inputReadOnly/>
        </Form.Item>

        <Form.Item
          label={t("label.endTime")}
          name="endTime"
          style={{ flex: 1, fontWeight: "bold", minWidth: 140 }}
          rules={[{ required: true, message: t("label.inputEndTime") }]}
        >
          <TimePicker format="HH:mm" style={{ width: "100%" }} inputReadOnly/>
        </Form.Item>
      </div>

      <Form.Item
        label={t("label.temperature")}
        name="temperature"
        style={{ fontWeight: "bold", maxWidth: 200 }}
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
          placeholder={t("label.inputTemp")}
          min={0}
          inputMode="numeric"
        />
      </Form.Item>
    </Form>
  );
}

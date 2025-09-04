import { Form, DatePicker, Select, InputNumber } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import Login from "../Layout/WorkerInfoForm";

export default function Step4({ data, updateData }) {
  const { t } = useTranslation();

  const shoeOptions = ["modelA", "modelB", "modelC"];
  const colorOptions = ["red", "blue", "yellow", "black"];

  const handleValueChange = (_, allValues) => {
    const formattedValues = {
      ...allValues,
      date: allValues.date ? allValues.date.format("YYYY-MM-DD") : null,
      value: true,
    };
    updateData(formattedValues);
  };

  return (
    <Form
      layout="vertical"
      initialValues={{
        workerData: data.workerData,
        date: data.date ? dayjs(data.date) : null,
        shoeModel: data.shoeModel,
        color: data.color,
        chemicalWeight: data.chemicalWeight,
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
          label={t("label.date")}
          name="date"
          style={{ flex: 1, fontWeight: "bold", minWidth: 140 }}
          rules={[{ required: true, message: t("label.inputDate") }]}
        >
          <DatePicker style={{ width: "100%" }} inputReadOnly/>
        </Form.Item>

        <Form.Item
          label={t("label.shoeModel")}
          name="shoeModel"
          style={{ flex: 1, fontWeight: "bold", minWidth: 140 }}
          rules={[{ required: true, message: t("label.chooseShoeModel") }]}
        >
          <Select placeholder={t("label.chooseShoeModel")}>
            {shoeOptions.map((key) => (
              <Select.Option key={key} value={t(`label.${key}`)}>
                {t(`label.${key}`)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Form.Item
          label={t("label.color")}
          name="color"
          style={{ flex: 1, fontWeight: "bold", minWidth: 140 }}
          rules={[{ required: true, message: t("label.chooseColor") }]}
        >
          <Select placeholder={t("label.chooseColor")}>
            {colorOptions.map((key) => (
              <Select.Option key={key} value={t(`label.${key}`)}>
                {t(`label.${key}`)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={t("label.chemicalWeight") + " (kg)"}
          name="chemicalWeight"
          style={{ flex: 1, fontWeight: "bold", minWidth: 140 }}
          rules={[
            { required: true, message: t("label.inputChemicalWeight") },
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
            placeholder={t("label.inputChemicalWeight")}
            inputMode="numeric"
          />
        </Form.Item>
      </div>
    </Form>
  );
}

import { Form, Input, TimePicker, InputNumber, DatePicker, Table } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export default function Step5({ data, updateData }) {
  const { t } = useTranslation();

  const tableData = [
    {
      key: 0,
      mcs: data?.tableData?.[0]?.mcs || "",
      date: data?.tableData?.[0]?.date || "",
      id: data?.tableData?.[0]?.id || "",
    },
  ];

  const columns = [
    {
      title: t("label.mcs") || "MCS",
      dataIndex: "mcs",
      key: "mcs",
      render: (_, __, index) => (
        <Form.Item
          name={["tableData", index, "mcs"]}
          rules={[{ required: true, message: "Enter MCS" }]}
          noStyle
        >
          <Input placeholder={t("label.inputMCS") || "Enter MCS"} />
        </Form.Item>
      ),
    },
    {
      title: t("label.date") || "Date",
      dataIndex: "date",
      key: "date",
      render: (_, __, index) => (
        <Form.Item
          name={["tableData", index, "date"]}
          rules={[{ required: true, message: t("label.inputDate") || "Select date" }]}
          noStyle
        >
          <DatePicker style={{ width: "100%" }} inputReadOnly />
        </Form.Item>
      ),
    },
    {
      title: t("label.id") || "ID",
      dataIndex: "id",
      key: "id",
      render: (_, __, index) => (
        <Form.Item
          name={["tableData", index, "id"]}
          rules={[{ required: true, message: "Enter ID" }]}
          noStyle
        >
          <Input placeholder={t("label.inputId") || "Enter ID"} />
        </Form.Item>
      ),
    },
  ];

  const handleValueChange = (_, allValues) => {
    updateData({ ...allValues, value: true });
  };

  return (
    <Form
      layout="vertical"
      initialValues={{
        tempRoll: data?.tempRoll,
        startTime: data?.startTime ? dayjs(data.startTime, "HH:mm") : null,
        endTime: data?.endTime ? dayjs(data.endTime, "HH:mm") : null,
        temperature: data?.temperature,
        tableData: data?.tableData || [{ mcs: "", date: null, id: "" }],
      }}
      onValuesChange={handleValueChange}
    >
      <Form.Item
        label={t("label.table") || "Table"}
        style={{ fontWeight: "bold" }}
      >
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={false}
          rowKey="key"
        />
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
          label={t("label.temperature")}
          name="temperature"
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
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Form.Item
          label={t("label.startTime")}
          name="startTime"
          style={{ flex: 1, fontWeight: "bold", minWidth: 140 }}
          rules={[{ required: true, message: t("label.inputStartTime") }]}
        >
          <TimePicker format="HH:mm" style={{ width: "100%" }} inputReadOnly />
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
    </Form>
  );
}

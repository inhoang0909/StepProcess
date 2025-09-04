import { Form, Input, DatePicker, Checkbox, Table } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import Login from "../Layout/WorkerInfoForm";

export default function Step1({ data, updateData }) {
  const { t } = useTranslation();

  const tableData = data.tableData?.length
    ? data.tableData
    : [{ key: 0, mcs: "", date: null, id: "" }];

  const columns = [
    {
      title: "MCS",
      dataIndex: "mcs",
      key: "mcs",
      render: (_, __, index) => (
        <Form.Item
          name={["tableData", index, "mcs"]}
          rules={[{ required: true }]}
          noStyle
        >
          <Input />
        </Form.Item>
      ),
    },
    {
      title: t("label.date"),
      dataIndex: "date",
      key: "date",
      render: (_, __, index) => (
        <Form.Item
          name={["tableData", index, "date"]}
          rules={[{ required: true, message: t("label.inputDate") }]}
          noStyle
        >
          <DatePicker style={{ width: "100%" }} inputReadOnly/>
        </Form.Item>
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (_, __, index) => (
        <Form.Item
          name={["tableData", index, "id"]}
          rules={[{ required: true, message: t("label.validNumber") }]}
          noStyle
        >
          <Input placeholder="ID" />
        </Form.Item>
      ),
    },
  ];

  const handleValueChange = (_, allValues) => {
    const formattedValues = {
      ...allValues,
      workDate: allValues.workDate
        ? allValues.workDate.format("YYYY-MM-DD")
        : null,
      tableData: allValues.tableData?.map((row) => ({
        ...row,
        date: row.date ? dayjs(row.date).format("YYYY-MM-DD") : null,
      })),
      value: true,
    };
    updateData(formattedValues);
  };

  return (
    <Form
      layout="vertical"
      initialValues={{
        workerData: data.workerData,
        workDate: data.workDate ? dayjs(data.workDate) : null,
        shifts: data.shifts || [],
        tableData: tableData,
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

      <div style={{ display: "flex", gap: 16 }}>
        <Form.Item
          label={t("label.workDate")}
          name="workDate"
          style={{ flex: 1, fontWeight: "bold" }}
          rules={[{ required: true, message: t("label.inputWorkerDate") }]}
        >
          <DatePicker style={{ width: "200px" }} inputReadOnly/>
        </Form.Item>

        <Form.Item
          label={<span style={{ fontWeight: "bold" }}>{t("label.shifts")}</span>}
          name="shifts"
          rules={[{ required: true, message: t("label.inputShifts") }]}
          style={{ flex: 1 }}
        >
          <Checkbox.Group
            options={[
              t("label.morning") || "Morning",
              t("label.afternoon") || "Afternoon",
              t("label.evening") || "Evening",
            ]}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          />
        </Form.Item>

      </div>

      <Form.Item label={t("label.qc")} style={{ fontWeight: "bold" }}>
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={false}
          rowKey={(record, index) => index}
          scroll={{ x: 400 }}
          size="small"
        />
      </Form.Item>
    </Form>

  );
}

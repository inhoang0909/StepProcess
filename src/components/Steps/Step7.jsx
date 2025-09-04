import { Form, Table, Input, DatePicker, TimePicker, Space, Checkbox } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export default function Step7({ data, updateData }) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const tableData = data.tableData?.length
    ? data.tableData
    : [
        { key: 0, T2: "", T90: "", color: "", thickness: "", width: "", status: false, qc: "" },
        { key: 1, T2: "", T90: "", color: "", thickness: "", width: "", status: false, qc: "" },
        { key: 2, T2: "", T90: "", color: "", thickness: "", width: "", status: false, qc: "" },
      ];

  const handleValueChange = (_, allValues) => {
    updateData({
      ...allValues,
      chopDate: allValues.chopDate ? allValues.chopDate.format("YYYY-MM-DD") : null,
      chopTime: allValues.chopTime ? allValues.chopTime.format("HH:mm") : null,
      value: true,
    });
  };

  const smallInputStyle = { width: "90px" }; 
  const columns = [
    {
      title: t("label.T2"),
      dataIndex: "T2",
      render: (_, __, i) => (
        <Form.Item name={["tableData", i, "T2"]} noStyle>
          <Input style={smallInputStyle} />
        </Form.Item>
      ),
    },
    {
      title: t("label.T90"),
      dataIndex: "T90",
      render: (_, __, i) => (
        <Form.Item name={["tableData", i, "T90"]} noStyle>
          <Input style={smallInputStyle} />
        </Form.Item>
      ),
    },
    {
      title: t("label.color"),
      dataIndex: "color",
      render: (_, __, i) => (
        <Form.Item name={["tableData", i, "color"]} noStyle>
          <Input style={{ width: "100px" }} />
        </Form.Item>
      ),
    },
    {
      title: t("label.thickness"),
      dataIndex: "thickness",
      render: (_, __, i) => (
        <Form.Item name={["tableData", i, "thickness"]} noStyle>
          <Input style={smallInputStyle} inputMode="numeric" />
        </Form.Item>
      ),
    },
    {
      title: t("label.width"),
      dataIndex: "width",
      render: (_, __, i) => (
        <Form.Item name={["tableData", i, "width"]} noStyle>
          <Input style={smallInputStyle} inputMode="numeric" />
        </Form.Item>
      ),
    },
    {
      title: t("label.qc"),
      dataIndex: "qc",
      render: (_, __, i) => (
        <Form.Item name={["tableData", i, "qc"]} noStyle>
          <Input style={{ width: "80px" }} />
        </Form.Item>
      ),
    },
    {
      title: t("label.status"),
      dataIndex: "status",
      render: (_, __, i) => (
        <Form.Item name={["tableData", i, "status"]} valuePropName="checked" noStyle>
          <Checkbox />
        </Form.Item>
      ),
    },
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        tableData,
        chopDate: data.chopDate ? dayjs(data.chopDate) : null,
        chopTime: data.chopTime ? dayjs(data.chopTime, "HH:mm") : null,
      }}
      onValuesChange={handleValueChange}
    >
      <Form.Item label={t("label.table")} style={{ fontWeight: "bold" }}>
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={false}
          rowKey="key"
          size="small"
          scroll={{ x: true }} 
        />
      </Form.Item>

      <Form.Item label={t("label.workDate")} style={{ fontWeight: "bold" }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Form.Item name="chopDate" noStyle>
            <DatePicker style={{ minWidth: 140 }} inputReadOnly/>
          </Form.Item>
          <Form.Item name="chopTime" noStyle>
            <TimePicker format="HH:mm" style={{ minWidth: 120 }} inputReadOnly/>
          </Form.Item>
        </div>
      </Form.Item>
    </Form>
  );
}

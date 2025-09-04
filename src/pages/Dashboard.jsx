import { Table, Tag, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getForms } from "../utils/helper";
import { InfoCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const forms = getForms();
  const { t } = useTranslation();
  const { Title } = Typography;

  const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsTablet(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns = [
    { title: "Form ID", dataIndex: "id", key: "id" },
    {
      title: t("currentStep"),
      dataIndex: "currentStep",
      key: "currentStep",
      render: (s) =>
        s > 7 ? <Tag color="green">{t("completed")}</Tag> : <Tag>{s}/7</Tag>,
    },
    {
      title: t("updatedAt"),
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (d) => (d ? dayjs(d).format("YYYY-MM-DD HH:mm") : "-"),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          {record.currentStep <= 7 && (
            <Button
              type="link"
              onClick={() =>
                navigate(`/step/${record.currentStep}?id=${record.id}`)
              }
            >
              {t("continue")}
            </Button>
          )}
          <Button
            type="link"
            onClick={() => navigate(`/summary?id=${record.id}`)}
          >
            <InfoCircleOutlined style={{ fontSize: 20 }} />
          </Button>
        </div>
      ),
    },
  ];

  if (isTablet) {
    return (
      <div style={{ padding: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
            alignItems: "center",
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            {t("viewSummary") || "Form Dashboard"}
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/")}
            style={{ borderRadius: 8 , backgroundColor: '#001529', borderColor: '#001529'}}
          >
            {t("newForm") || "New Form"}
          </Button>
        </div>

        <div style={{ display: "grid", gap: 16 }}>
          {forms.map((f) => (
            <div
              key={f.id}
              onClick={() => navigate(`/summary?id=${f.id}`)} 
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: 16,
                background: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.05)")
              }
            >
              <div style={{ fontWeight: 600, marginBottom: 8 }}>
                Form ID: {f.id}
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>{t("currentStep")}:</b>{" "}
                {f.currentStep > 7 ? (
                  <Tag color="green">{t("completed")}</Tag>
                ) : (
                  <Tag>{f.currentStep}/7</Tag>
                )}
              </div>
              <div style={{ marginBottom: 12 }}>
                <b>{t("updatedAt")}:</b>{" "}
                {f.updatedAt
                  ? dayjs(f.updatedAt).format("YYYY-MM-DD HH:mm")
                  : "-"}
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                {f.currentStep <= 7 && (
                  <Button
                    type="primary"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      navigate(`/step/${f.currentStep}?id=${f.id}`);
                    }}
                  >
                    {t("continue")}
                  </Button>
                )}
                <Button
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/summary?id=${f.id}`);
                  }}
                >
                  <InfoCircleOutlined />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div style={{ padding: 24, background: "#fff", borderRadius: 8 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
          alignItems: "center",
        }}
      >
        <Title level={3} style={{ margin: 0, textAlign: "center" }}>
          {t("viewSummary") || "Form Dashboard"}
        </Title>
      </div>
      <Table
        dataSource={forms}
        columns={columns}
        rowKey="id"
        size="middle"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

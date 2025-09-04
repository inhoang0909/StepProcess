import { useNavigate, useSearchParams } from "react-router-dom";
import { Collapse, Card, Button, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { getForms } from "../utils/helper";
import { ArrowLeftOutlined } from "@ant-design/icons";
import StepDetail from "../components/Steps/StepDetail";

const { Panel } = Collapse;

export default function Summary() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const formId = searchParams.get("id"); 

  const forms = getForms();
  const form = forms.find((f) => f.id === formId) || { steps: [] };
  const stepsData = form.steps || [];

  const navigateBack = () => {
    navigate("/dashboard");
  };

  const getStatusTag = (status) => {
    if (status === "pass") return <Tag color="green">{t("label.pass")}</Tag>;
    if (status === "fail") return <Tag color="red">{t("label.fail")}</Tag>;
    return <Tag color="orange">{t("label.pending")}</Tag>;
  };

  return (
    <Card title={t("stepDetails")} style={{ margin: "20px auto" }}>
      <Collapse>
        {stepsData.map((step, index) => (
          <Panel
            key={index} 
            header={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: 8,
                }}
              >
                <div>
                  <strong style={{ marginRight: 8 }}>
                    {t("step")} {index + 1}
                  </strong>
                </div>
                <div style={{ minWidth: 80, textAlign: "center" }}>
                  {getStatusTag(step.status)}
                </div>
              </div>
            }
          >
            <StepDetail step={step} />
          </Panel>
        ))}
      </Collapse>
{/* 
      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button type="primary" onClick={navigateBack} style={{ borderRadius: 8 ,backgroundColor: '#001529', borderColor: '#001529'}}>
          <ArrowLeftOutlined/>
        </Button>
      </div> */}
    </Card>
  );
}

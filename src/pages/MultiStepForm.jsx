import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Card, Space } from "antd";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getForms, updateFormStep, upsertForm } from "../utils/helper";
import Step1 from "../components/Steps/Step1";
import Step2 from "../components/Steps/Step2";
import Step3 from "../components/Steps/Step3";
import Step4 from "../components/Steps/Step4";
import Step5 from "../components/Steps/Step5";
import Step6 from "../components/Steps/Step6";
import Step7 from "../components/Steps/Step7";


export default function StepPage() {
  const { step } = useParams();
  const [searchParams] = useSearchParams();
  const formId = searchParams.get("id");

  const navigate = useNavigate();
  const { t } = useTranslation();
  const stepIndex = parseInt(step) - 1;

  const [form, setForm] = useState(() => {
    const forms = getForms();
    return forms.find((f) => f.id === formId);
  });

  useEffect(() => {
    if (form) {
      upsertForm(form);
    }
  }, [form]);

  if (!form) return <div>Form not found</div>;

  const currentData = form.steps?.[stepIndex] || {};

  const updateData = (newData) => {
    const updated = updateFormStep(formId, stepIndex, newData);
    setForm(updated);
  };

  const markStatus = (status) => {
    updateData({ status });
  };

 const handleSave = () => {
  let updated = { ...form };

  if (parseInt(step) === 7) {
    updated.currentStep = 8;
    upsertForm(updated);
    navigate("/dashboard");
  } else {
    updated.currentStep = parseInt(step) + 1;
    upsertForm(updated);
    navigate("/");
  }
};


  const renderStep = () => {
    const props = { data: currentData, updateData };
    switch (parseInt(step)) {
      case 1: return <Step1 {...props} />;
      case 2: return <Step2 {...props} />;
      case 3: return <Step3 {...props} />;
      case 4: return <Step4 {...props} />;
      case 5: return <Step5 {...props} />;
      case 6: return <Step6 {...props} />;
      case 7: return <Step7 {...props} />;
      default: return null;
    }
  };

  return (
    <Card style={{ margin: 50 }}>
      {renderStep()}
      <Space style={{ marginTop: 10, width: "100%", justifyContent: "center" }}>
        <Button
          type={currentData.status === "pass" ? "primary" : "default"}
          style={
            currentData.status === "pass"
              ? { backgroundColor: "green", borderColor: "green" }
              : { borderColor: "green", color: "green" }
          }
          onClick={() => markStatus("pass")}
        >
          {t("label.pass")}
        </Button>

        <Button
          type={currentData.status === "fail" ? "primary" : "default"}
          danger
          onClick={() => markStatus("fail")}
        >
          {t("label.fail")}
        </Button>
        <Button type="primary" onClick={handleSave}>
          {t("save")}
        </Button>
      </Space>
    </Card>
  );
}

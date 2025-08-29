"use client"

import { StepStatusButtons } from "../FormComponent/StatusButton"
import { useTranslation } from "react-i18next"
import FormInput from "../ui/formInput"

interface StepData {
  workerName: string
  timeIn: string
  timeOut: string
  dumpingMatTemp: string
  status: "pass" | "fail" | "pending"
}

interface Step2Props {
  stepId: string
  stepData: StepData
  onUpdateData: (
    stepId: string, 
    newData: Partial<StepData>, status?: "pass" | "fail") => void
}

export function Step2({ stepId, stepData, onUpdateData }: Step2Props) {
  const { t } = useTranslation()

  const handleChange = (field: keyof StepData, value: string) => {
    onUpdateData(stepId, { [field]: value }) 
  }

  return (
    <div className="space-y-4">
      <FormInput
        label={t("form.workerName")}
        name="workerName"
        type="text"
        value={stepData.workerName}
        onChange={(e) => handleChange("workerName", e.target.value)}
        placeholder={t("form.workerPlaceholder") || ""}
      />

      <FormInput
        label={t("form.timeIn")}
        name="timeIn"
        type="time"
        value={stepData.timeIn}
        onChange={(e) => handleChange("timeIn", e.target.value)}
        placeholder={t("form.timeIn_placeholder") || ""}
      />

      <FormInput
        label={t("form.timeOut")}
        name="timeOut"
        type="time"
        value={stepData.timeOut}
        onChange={(e) => handleChange("timeOut", e.target.value)}
        placeholder={t("form.timeOut_placeholder") || ""}
      />

      <FormInput
        label={t("form.dumpingMatTemp")}
        name="dumpingMatTemp"
        type="number"
        value={stepData.dumpingMatTemp}
        onChange={(e) => handleChange("dumpingMatTemp", e.target.value)}
        placeholder={t("form.dumpingMatTemp_placeholder") || ""}
      />

      <StepStatusButtons
        status={stepData.status}
        onStatusChange={(status) =>
          onUpdateData(stepId, { status }, status)
        }
      />
    </div>
  )
}

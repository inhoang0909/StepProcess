"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { StepStatusButtons } from "../FormComponent/StatusButton"
import { useTranslation } from "react-i18next"

interface StepData {
  date: string
  shift: string
  workerName: string
  status: "pass" | "fail" | "pending"
}

interface Step1Props {
  stepId: string
  stepData: StepData
  onUpdateData: (
    stepId: string,
    value: string,
    status?: "pass" | "fail"
  ) => void
}

export function Step1({stepId, stepData, onUpdateData }: Step1Props) {
  const { t } = useTranslation()

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="date">{t("form.date")}</Label>
        <Input
          id="date"
          type="date"
          value={stepData.date}
          onChange={(e) => onUpdateData("date", e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <Label htmlFor="shift">{t("form.shift")}</Label>
        <Select
          value={stepData.shift}
          onValueChange={(val) => onUpdateData("shift", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("form.selectShift")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="morning">{t("form.shiftMorning")}</SelectItem>
            <SelectItem value="afternoon">{t("form.shiftAfternoon")}</SelectItem>
            <SelectItem value="night">{t("form.shiftNight")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="workerName">{t("form.workerName")}</Label>
        <Input
          id="workerName"
          type="text"
          placeholder={t("form.workerPlaceholder")}
          value={stepData.workerName}
          onChange={(e) => onUpdateData("workerName", e.target.value)}
          className="w-full"
        />
      </div>

      <StepStatusButtons
        status={stepData.status}
        onStatusChange={(status) =>
          onUpdateData(stepId, stepData.status, status)
        }
      />
    </div>
  )
}

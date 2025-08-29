"use client"

import { Step1 } from "../steps/Step1"
import { Step2 } from "../steps/Step2"
import { Step3 } from "../steps/Step3"

interface Step1Data {
  date: string
  shift: string
  workerName: string
  status: "pass" | "fail" | "pending"
}

interface Step2Data {
  workerName: string
  timeIn: string
  timeOut: string
  dumpingMatTemp: string
  status: "pass" | "fail" | "pending"
}

interface Step3Data {
  workerName: string
  rollerTemp: string
  timeOut: string
  dumpingMatTemp: string
  virginBatch: string
  status: "pass" | "fail" | "pending"
}

type StepData = Step1Data | Step2Data | Step3Data

interface StepContentProps {
  stepId: string
  stepData: StepData
  onUpdateData: (stepId: string, value: string, status?: "pass" | "fail") => void
}

export function StepContent({ stepId, stepData, onUpdateData }: StepContentProps) {
  switch (stepId) {
    case "step1":
      return <Step1 stepId={stepId} stepData={stepData as Step1Data} onUpdateData={onUpdateData} />
    case "step2":
      return <Step2  stepId={stepId} stepData={stepData as Step2Data} onUpdateData={onUpdateData} />
    case "step3":
      return <Step3 stepId={stepId} stepData={stepData as Step3Data} onUpdateData={onUpdateData} />
    default:
      return null
  }
}

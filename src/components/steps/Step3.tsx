"use client"

import { StepStatusButtons } from "../FormComponent/StatusButton"
import FormInput from "../ui/formInput"

interface StepData {
  workerName: string
  rollerTemp: string
  timeOut: string
  dumpingMatTemp: string
  virginBatch: string
  status: "pass" | "fail" | "pending"
}

interface Step3Props {
  stepId: string
  stepData: StepData
  onUpdateData: (stepId: string, value: string, status?: "pass" | "fail") => void
}

export function Step3({ stepId, stepData, onUpdateData }: Step3Props) {
  return (
    <div className="space-y-4">
      <div>
        <FormInput
          label="Worker Name"
          name="workerName"
          type="text"
          value={stepData.workerName}
          onChange={(e) => onUpdateData("workerName", e.target.value)}
          placeholder="Enter worker name"
        />
      </div>
      <FormInput
        label="Roller Temperature (°C)"
        name="rollerTemp"
        type="number"
        value={stepData.rollerTemp}
        onChange={(e) => onUpdateData("rollerTemp", e.target.value)}
        placeholder="Enter roller temperature"
      />
      <FormInput
        label="Time Out"
        name="timeOut"
        type="time"
        value={stepData.timeOut}
        onChange={(e) => onUpdateData("timeOut", e.target.value)}
        placeholder="Select time out"
      />
      <FormInput
        label="Dumping Mat Temperature (°C)"
        name="dumpingMatTemp"
        type="number"
        value={stepData.dumpingMatTemp}
        onChange={(e) => onUpdateData("dumpingMatTemp", e.target.value)}
        placeholder="Enter dumping mat temperature"
      />
      <div>
        <FormInput
          label="Virgin Batch Weight"
          name="virginBatch"
          type="text"
          value={stepData.virginBatch}
          onChange={(e) => onUpdateData("virginBatch", e.target.value)}
          placeholder="Enter virgin batch weight"
        />
      </div>

      <StepStatusButtons
        status={stepData.status}
        onStatusChange={(status) => onUpdateData(stepId, status)}
      />
    </div>
  )
}

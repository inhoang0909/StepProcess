"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Circle } from "lucide-react"

interface Step {
  id: string
  title: string
  description: string
}

interface StepData {
  value: string
  status: "pass" | "fail" | "pending"
}

interface StepNavigationProps {
  steps: Step[]
  currentStep: number
  formData: { [key: string]: StepData }
  onStepClick: (stepIndex: number) => void
}

export function StepNavigation({ steps, currentStep, formData, onStepClick }: StepNavigationProps) {
  const getStepStatus = (stepIndex: number) => {
    const stepId = steps[stepIndex].id
    const stepData = formData[stepId]

    if (!stepData || !stepData.value) return "pending"
    return stepData.status
  }

  const getStatusIcon = (stepIndex: number) => {
    const status = getStepStatus(stepIndex)

    switch (status) {
      case "pass":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "fail":
        return <XCircle className="w-5 h-5 text-destructive" />
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {steps.map((step, index) => (
        <Button
          key={step.id}
          variant={index === currentStep ? "default" : "outline"}
          size="sm"
          onClick={() => onStepClick(index)}
          className="flex items-center gap-2"
        >
          {getStatusIcon(index)}
          <span className="hidden sm:inline">{step.title}</span>
          <span className="sm:hidden">{index + 1}</span>
        </Button>
      ))}
    </div>
  )
}

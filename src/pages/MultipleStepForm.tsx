"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Circle } from "lucide-react"
import { FormSummary } from "./SummaryForm"
import { StepProgress } from "@/components/FormComponent/StepProgress"
import { StepNavigation } from "@/components/FormComponent/StepNavigation"
import { StepContent } from "@/components/FormComponent/StepContent"


interface StepData {
  value: string
  status: "pass" | "fail" | "pending"
}

interface FormData {
  [key: string]: StepData
}

const STEPS = [
  { id: "step1", title: "Step 1", description: "Material" },
  { id: "step2", title: "Step 2", description: "Banbury Mix" },
  { id: "address", title: "Address", description: "Enter your address details" },
  { id: "employment", title: "Employment", description: "Work information" },
  { id: "education", title: "Education", description: "Educational background" },
  { id: "preferences", title: "Preferences", description: "Your preferences and settings" },
  { id: "review", title: "Review", description: "Review and confirm your information" },
]

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({})
  const [showSummary, setShowSummary] = useState(false)

  useEffect(() => {
    const savedData = localStorage.getItem("multiStepFormData")
    const savedStep = localStorage.getItem("multiStepCurrentStep")

    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
    if (savedStep) {
      setCurrentStep(Number.parseInt(savedStep))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("multiStepFormData", JSON.stringify(formData))
    localStorage.setItem("multiStepCurrentStep", currentStep.toString())
  }, [formData, currentStep])

  const updateStepData = (stepId: string, value: any, status: "pass" | "fail" | "pending" = "pending") => {
    setFormData((prev) => ({
      ...prev,
      [stepId]: { ...prev[stepId], ...value, status },
    }))
  }


  const getStepStatus = (stepIndex: number) => {
    const stepId = STEPS[stepIndex].id
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

  const canProceed = () => {
    const currentStepId = STEPS[currentStep].id
    const stepData = formData[currentStepId]

    if (!stepData) return false

    return Object.entries(stepData).some(
      ([key, val]) => key !== "status" && typeof val === "string" && val.trim() !== ""
    )
  }


  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowSummary(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    setShowSummary(false)
  }

  const handleSubmit = () => {
    alert("Form submitted successfully!")
    setFormData({})
    setCurrentStep(0)
    setShowSummary(false)
    localStorage.removeItem("multiStepFormData")
    localStorage.removeItem("multiStepCurrentStep")
  }

  if (showSummary) {
    return (
      <FormSummary
        steps={STEPS}
        formData={formData}
        onBackToForm={() => setShowSummary(false)}
        onSubmit={handleSubmit}
      />
    )
  }

  const currentStepData = formData[STEPS[currentStep].id] || { value: "", status: "pending" }

  return (
    <div className="space-y-6">
      <StepProgress currentStep={currentStep} totalSteps={STEPS.length} />

      <StepNavigation steps={STEPS} currentStep={currentStep} formData={formData} onStepClick={handleStepClick} />

      {/* Current Step Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getStatusIcon(currentStep)}
            {STEPS[currentStep].title}
          </CardTitle>
          <p className="text-muted-foreground">{STEPS[currentStep].description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <StepContent stepId={STEPS[currentStep].id} stepData={currentStepData} onUpdateData={updateStepData} />

          {STEPS[currentStep].id === "review" && (
            <Button onClick={() => setShowSummary(true)} className="w-full" variant="outline">
              View Summary
            </Button>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              variant="outline"
              className="flex items-center gap-2 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <Button onClick={handleNext} disabled={!canProceed()} className="flex items-center gap-2">
              {currentStep === STEPS.length - 1 ? "Complete" : "Next"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

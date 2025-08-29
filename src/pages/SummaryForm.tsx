"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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

interface FormSummaryProps {
  steps: Step[]
  formData: { [key: string]: StepData }
  onBackToForm: () => void
  onSubmit: () => void
}

export function FormSummary({ steps, formData, onBackToForm, onSubmit }: FormSummaryProps) {
  const getStatusIcon = (stepIndex: number) => {
    const stepId = steps[stepIndex].id
    const stepData = formData[stepId]
    const status = stepData?.status || "pending"

    switch (status) {
      case "pass":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "fail":
        return <XCircle className="w-5 h-5 text-destructive" />
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />
    }
  }

  const passedSteps = Object.values(formData).filter((data) => data.status === "pass").length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Summary Overview
          <Badge variant="secondary">
            {passedSteps} / {steps.length - 1} Passed
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {steps.slice(0, -1).map((step, index) => {
            const stepData = formData[step.id]
            const status = stepData?.status || "pending"

            return (
              <AccordionItem key={step.id} value={step.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(index)}
                    <div className="text-left">
                      <div className="font-medium">{step.title}</div>
                      <div className="text-sm text-muted-foreground">{step.description}</div>
                    </div>
                    <Badge
                      variant={status === "pass" ? "default" : status === "fail" ? "destructive" : "secondary"}
                      className="ml-auto"
                    >
                      {status}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4 pl-8">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">Entered Data:</div>
                      <div className="p-3 bg-muted rounded-md">{stepData?.value || "No data entered"}</div>
                      <div className="text-sm font-medium text-muted-foreground">Status:</div>
                      <Badge variant={status === "pass" ? "default" : status === "fail" ? "destructive" : "secondary"}>
                        {status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        <div className="flex gap-4 mt-6">
          <Button onClick={onBackToForm} variant="outline" className="flex-1 bg-transparent">
            Back to Form
          </Button>
          <Button onClick={onSubmit} className="flex-1">
            Submit Form
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

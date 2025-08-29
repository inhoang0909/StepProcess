"use client"

import { Button } from "@/components/ui/button"

interface StepStatusButtonsProps {
  status: "pass" | "fail" | "pending"
  onStatusChange: (status: "pass" | "fail") => void
}

export function StepStatusButtons({ status, onStatusChange }: StepStatusButtonsProps) {
  return (
    <div className="flex gap-4">
      <Button
        variant={status === "pass" ? "default" : "outline"}
        onClick={() => onStatusChange("pass")}
        className="flex-1"
      >
        Mark as Pass
      </Button>
      <Button
        variant={status === "fail" ? "destructive" : "outline"}
        onClick={() => onStatusChange("fail")}
        className="flex-1"
      >
        Mark as Fail
      </Button>
    </div>
  )
}

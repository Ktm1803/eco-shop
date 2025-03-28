"use client"

import { useLanguage } from "@/hooks/use-language"
import { Check } from "lucide-react"

interface Step {
  id: string
  name: string
}

interface StepsProps {
  steps: Step[]
  currentStep: string
}

export function Steps({ steps, currentStep }: StepsProps) {
  const { t } = useLanguage()

  return (
    <nav aria-label="Progress">
      <ol className="flex items-center">
        {steps.map((step, stepIdx) => {
          const isActive = step.id === currentStep
          const isCompleted = steps.findIndex((s) => s.id === currentStep) > stepIdx

          return (
            <li key={step.id} className={`relative ${stepIdx !== steps.length - 1 ? "flex-1" : ""}`}>
              {isCompleted ? (
                <div className="group flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                    <Check className="h-5 w-5" />
                    <span className="sr-only">{step.name}</span>
                  </span>
                  <span className="ml-2 text-sm font-medium">{step.name}</span>
                </div>
              ) : isActive ? (
                <div className="flex items-center" aria-current="step">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary text-primary">
                    {stepIdx + 1}
                  </span>
                  <span className="ml-2 text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-muted-foreground/30 text-muted-foreground">
                    {stepIdx + 1}
                  </span>
                  <span className="ml-2 text-sm font-medium text-muted-foreground">{step.name}</span>
                </div>
              )}

              {stepIdx !== steps.length - 1 && (
                <div
                  className={`hidden sm:block absolute top-4 left-0 w-full h-0.5 ${isCompleted ? "bg-primary" : "bg-muted"}`}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}


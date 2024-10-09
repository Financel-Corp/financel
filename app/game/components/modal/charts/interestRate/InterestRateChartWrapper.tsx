'use client'

import { InterestRateChartClient } from './InterestRateChartClient'

// Use the same ChartDataPoint interface as in InterestRateChartClient
interface ChartDataPoint {
  date: string
  interestRate: number
}

// Define the props type for the wrapper
interface InterestRateChartWrapperProps {
  initialData: ChartDataPoint[]
  date: string
  guess?: number
}

export default function InterestRateChartWrapper({
  initialData,
  date,
  guess,
}: InterestRateChartWrapperProps) {
  return (
    <InterestRateChartClient
      initialData={initialData}
      date={date}
      guess={guess}
    />
  )
}

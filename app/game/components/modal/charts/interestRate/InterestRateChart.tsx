'use client'

import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface ChartDataPoint {
  date: string
  interestRate: number
}

interface InterestRateChartProps {
  chartData: ChartDataPoint[]
  date: string
  guess?: number
}

export function InterestRateChart({
  chartData,
  date,
  guess,
}: InterestRateChartProps) {
  const [formattedChartData, setFormattedChartData] =
    useState<ChartData<'line'> | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!chartData || chartData.length === 0) {
      setError('No data available')
      return
    }

    // Remove the date format check since we're now passing a correctly formatted date
    // if (!/^[A-Z][a-z]{2} \d{2}$/.test(date)) {
    //   console.error('Invalid date format:', date)
    //   setError('Invalid date format')
    //   return
    // }
    const normalizeDate = (dateString: string) => {
      const [month, day] = dateString.split(' ')
      return `${month} ${day.padStart(2, '0')}`
    }

    const normalizedDate = normalizeDate(date)

    const dateIndex = chartData.findIndex(
      (point) => normalizeDate(point.date) === normalizedDate
    )

    if (dateIndex === -1) setError(`Specified date "${date}" not found in data`)
    // Continue with chart creation, but without the date point

    setFormattedChartData({
      labels: chartData.map((point) => point.date),
      datasets: [
        {
          label: 'Interest Rate',
          data: chartData.map((point) => point.interestRate),
          fill: false,
          backgroundColor: 'rgb(0, 0, 0)',
          borderColor: 'rgb(0, 0, 0)',
          tension: 0.1,
          pointRadius: 0,
          borderWidth: 2,
        },
        ...(dateIndex !== -1
          ? [
              {
                label: 'Actual',
                data: chartData.map((point, index) =>
                  index === dateIndex ? point.interestRate : null
                ),
                pointStyle: 'triangle',
                pointRadius: 10,
                backgroundColor: 'rgb(0, 200, 0)',
                borderColor: 'rgb(0, 200, 0)',
                showLine: false,
              },
            ]
          : []),
        ...(guess !== undefined && dateIndex !== -1
          ? [
              {
                label: 'Your Guess',
                data: chartData.map((_, index) =>
                  index === dateIndex ? guess : null
                ),
                pointStyle: 'circle',
                pointRadius: 8,
                backgroundColor: 'rgb(255, 0, 0)',
                borderColor: 'rgb(255, 0, 0)',
                showLine: false,
              },
            ]
          : []),
      ],
    })
  }, [chartData, date, guess])

  if (error) return <div>Error: {error}</div>

  if (!chartData) return <div>Loading...</div>

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: 'rgb(50, 50, 50)',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgb(50, 50, 50)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'rgb(255, 255, 255)',
        bodyColor: 'rgb(255, 255, 255)',
      },
    },
  }

  return (
    <div style={{ width: '100%', height: '300px' }}>
      {formattedChartData && (
        <Line data={formattedChartData} options={options} />
      )}
    </div>
  )
}

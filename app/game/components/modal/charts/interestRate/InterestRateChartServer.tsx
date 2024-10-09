import { getChartDataForDailyChallenge } from '../../../../../lib/dbFunctions/getChartDataForDailyChallenge'
import InterestRateChartWrapper from './InterestRateChartWrapper'

// Use the same ChartDataPoint interface as in InterestRateChartClient
interface ChartDataPoint {
  date: string
  interestRate: number
}

export default async function InterestRateChartServer() {
  try {
    const chartData = await getChartDataForDailyChallenge()
    console.log('chartData', chartData)

    if (!chartData || chartData.length === 0) {
      console.error('No chart data available')
      return <div>No data available for the chart</div>
    }

    // Assuming chartData is of type ChartDataPoint[]
    return (
      <InterestRateChartWrapper
        initialData={chartData as ChartDataPoint[]}
        date="Jan 25"
        guess={3.4}
      />
    )
  } catch (error) {
    console.error('Error fetching chart data:', error)
    return <div>Error fetching chart data</div>
  }
}

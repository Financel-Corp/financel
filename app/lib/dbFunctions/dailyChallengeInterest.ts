/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
import { Prisma } from '@prisma/client'
import prisma from '../prisma/prisma'

type ChallengeResult = Prisma.DailyChallengeGetPayload<{
  include: {
    date: true
    interestRate: {
      include: {
        rateType: true
      }
    }
    interestRateYearData: true
  }
}>

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export async function createDailyChallenge() {
  console.log('Starting createDailyChallenge function')

  const today = new Date()
  const dateOnly = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  )
  console.log(`Today's date: ${dateOnly.toISOString().split('T')[0]}`)

  // Get all dates that have interest rate data
  const datesWithInterestRates = await prisma.interestRatePrice.findMany({
    select: {
      dateId: true,
      interestId: true,
    },
    distinct: ['dateId', 'interestId'],
  })

  if (datesWithInterestRates.length === 0) {
    console.error('No dates with interest rate data found')
    return
  }

  // Randomly select a date and category combination
  const randomSelection =
    datesWithInterestRates[
      Math.floor(Math.random() * datesWithInterestRates.length)
    ]

  // Fetch the selected date
  const selectedDate = await prisma.dates.findUnique({
    where: { id: randomSelection.dateId },
  })

  if (!selectedDate) {
    console.error('Selected date not found')
    return
  }
  console.log(`Selected date: ${selectedDate.date.toISOString().split('T')[0]}`)

  // Fetch the selected interest rate category
  const selectedCategory = await prisma.interestRate.findUnique({
    where: { id: randomSelection.interestId },
  })

  if (!selectedCategory) {
    console.error('Selected interest rate category not found')
    return
  }
  console.log(`Selected interest rate category: ${selectedCategory.category}`)

  // Find the interest rate for the selected date and category
  const interestRate = await prisma.interestRatePrice.findFirst({
    where: {
      dateId: selectedDate.id,
      interestId: selectedCategory.id,
    },
  })

  if (!interestRate) {
    console.error('No interest rate found for the selected date and category')
    return
  }
  console.log(
    `Interest rate for selected date and category: ${interestRate.rate}`
  )

  // Fetch year data (365 days surrounding the chosen date)
  const startDate = addDays(selectedDate.date, -182)
  const endDate = addDays(selectedDate.date, 182)
  console.log(
    `Fetching data for date range: ${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`
  )

  const yearData = await prisma.interestRatePrice.findMany({
    where: {
      rateType: { id: selectedCategory.id },
      date: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    },
    select: {
      rate: true,
      date: { select: { date: true } },
    },
    orderBy: {
      date: { date: 'asc' },
    },
  })

  console.log(
    `Retrieved ${yearData.length} data points for the surrounding year`
  )
  const yearDataJson = yearData.map((d) => ({
    date: d.date.date.toISOString().split('T')[0],
    rate: d.rate.toNumber(),
  }))

  console.log('Sample of year data (first 5 entries):')
  console.log(JSON.stringify(yearDataJson.slice(0, 5), null, 2))

  // Create the daily challenge
  const challenge = await prisma.dailyChallenge.create({
    data: {
      challengeDate: dateOnly,
      date: { connect: { id: selectedDate.id } },
      interestRate: { connect: { id: interestRate.id } },
      interestRateYearData: {
        create: {
          startDate,
          endDate,
          dataPoints: yearDataJson,
        },
      },
    },
    include: {
      date: true,
      interestRate: {
        include: {
          rateType: true,
        },
      },
      interestRateYearData: true,
    },
  })

  // Type assertion
  const typedChallenge = challenge as ChallengeResult

  console.log('Daily challenge created:')
  console.log(
    JSON.stringify(
      {
        id: typedChallenge.id,
        challengeDate: typedChallenge.challengeDate.toISOString(),
        historicalDate: typedChallenge.date.date.toISOString(),
        interestRateCategory: typedChallenge.interestRate.rateType.category,
        interestRate: typedChallenge.interestRate.rate,
        yearDataId: typedChallenge.interestRateYearData?.id,
        yearDataPoints: typedChallenge.interestRateYearData?.dataPoints
          ? Array.isArray(typedChallenge.interestRateYearData.dataPoints)
            ? typedChallenge.interestRateYearData.dataPoints.length
            : undefined
          : undefined,
      },
      null,
      2
    )
  )

  return typedChallenge
}

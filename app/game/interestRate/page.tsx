'use client'

import { useState } from 'react'

import { InterestRateGuess } from './components/InterestRateGuess'
import { InterestRateDayOf } from './components/InterestRateDayOf'
import classes from '../ui/Game.module.css'

type DayOf = 'image' | 'day' | 'guess'

export default function InterestRatePage() {
  const [initialData, setInitialData] = useState<
    Array<{ date: string; interestRate: number }>
  >([])
  const [challengeDate, setChallengeDate] = useState<DayOf>('image')

  return (
    <>
      <div className={classes.dayOf}>
        <InterestRateDayOf
          setChallengeDate={setChallengeDate}
          setInitialData={setInitialData}
        />
      </div>
      <div className={classes.guess}>
        <InterestRateGuess
          initialData={initialData}
          challengeDate={challengeDate}
        />
      </div>
    </>
  )
}

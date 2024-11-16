'use client'

import { ScoreChart } from './components/ScoreChart'
import { LeaderBoard } from './components/Leaderboard'

import { useScoreContext } from '../../context/user/ScoreContext'
import classes from './ui/FinalPage.module.css'

export default function Final() {
  const { finalScore } = useScoreContext()

  return (
    <div className={classes.container}>
      <div className={classes.scoreDisplay}>
        <h2>Final Score: {finalScore}</h2>
      </div>
      <div className={classes.scoreChartWrapper}>
        <ScoreChart />
      </div>
      <div className={classes.leaderboardWrapper}>
        <LeaderBoard />
      </div>
    </div>
  )
}

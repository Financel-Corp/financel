/* eslint-disable no-plusplus */
import React, { FC, useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Group, Box } from '@mantine/core'
import { SingleDisplay } from '../../../components/display/SingleDisplay'
import classes from './ui/CurrencyGuessDisplay.module.css'

interface CurrencyGuessDisplayProps {
  guess: string
  result?: { amount: ResponseNumbers; direction: Direction } | null
  isSpinning: boolean
  decimal: number
}

export const CurrencyGuessDisplay: FC<CurrencyGuessDisplayProps> = ({
  guess,
  result,
  isSpinning,
  decimal,
}) => {
  const [displayedResults, setDisplayedResults] = useState<
    Array<{ id: string; value: string }>
  >([])
  const [staggeredSpinning, setStaggeredSpinning] = useState<boolean[]>(
    Array(8).fill(false)
  )

  const staggerSpinning = useCallback((spinning: boolean) => {
    const delay = spinning ? 50 : 100 // Faster start, slower stop
    for (let i = 0; i < 8; i++)
      setTimeout(() => {
        setStaggeredSpinning((prev) => {
          const newState = [...prev]
          newState[i] = spinning
          return newState
        })
      }, i * delay)
  }, [])

  useEffect(() => {
    if (isSpinning) staggerSpinning(true)
    else setTimeout(() => staggerSpinning(false), 500) // Delay stopping the animation
  }, [isSpinning, staggerSpinning])

  useEffect(() => {
    if (!isSpinning && result) {
      const resultArray = Array(result.amount).fill(
        result.direction === 'down' ? '↑' : '↓'
      )
      let currentIndex = 0

      const intervalID = setInterval(() => {
        if (currentIndex < resultArray.length) {
          setDisplayedResults((prev) => [
            ...prev,
            { id: uuidv4(), value: resultArray[currentIndex] },
          ])
          currentIndex++
        } else clearInterval(intervalID)
      }, 200)

      return () => clearInterval(intervalID)
    }
    if (isSpinning) setDisplayedResults([])
  }, [isSpinning, result])

  return (
    <Box className={classes.container}>
      <Group className={classes.guessGroup}>
        <SingleDisplay
          value={guess[0] || ''}
          isSpinning={staggeredSpinning[0]}
          isNumber
        />
        {decimal === 1 && <span className={classes.decimal}>.</span>}
        <SingleDisplay
          value={guess[1] || ''}
          isSpinning={staggeredSpinning[1]}
          isNumber
        />
        {decimal === 2 && <span className={classes.decimal}>.</span>}
        <SingleDisplay
          value={guess[2] || ''}
          isSpinning={staggeredSpinning[2]}
          isNumber
        />
        {decimal === 3 && <span className={classes.decimal}>.</span>}
        <SingleDisplay
          value={guess[3] || ''}
          isSpinning={staggeredSpinning[3]}
          isNumber
        />
      </Group>
      <Group className={classes.resultGroup}>
        {displayedResults.map(({ id, value }, index) => (
          <SingleDisplay
            key={id}
            value={value}
            isSpinning={staggeredSpinning[index + 3]}
            isNumber={false}
          />
        ))}
        {Array(5 - displayedResults.length)
          .fill(null)
          .map((_, index) => (
            <SingleDisplay
              key={uuidv4()}
              value=""
              isSpinning={
                staggeredSpinning[index + 3 + displayedResults.length]
              }
              isNumber={false}
            />
          ))}
      </Group>
    </Box>
  )
}

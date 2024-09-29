import { Text, Paper, Container } from '@mantine/core'
import classes from './ui/DayOfInfo.module.css'

interface DayOfInfoProps {
  date: string
  category: string
}
const getDuration = (rateType: string) => {
  switch (rateType) {
    case 'T_30':
      return 'Thirty Year Treasury Bond'
    case 'T_20':
      return 'Twenty Year Treasury Bond'
    case 'T_10':
      return 'Ten Year Treasury Bond'
    case 'T_5':
      return 'Five Year Treasury Bond'
    case 'T_1':
      return 'One Year Treasury Bond'
    case 'T_OVERNIGHT':
      return 'Overnight'
    default:
      return 'Unknown Duration'
  }
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

const addOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return `${day}th`
  switch (day % 10) {
    case 1:
      return `${day}st`
    case 2:
      return `${day}nd`
    case 3:
      return `${day}rd`
    default:
      return `${day}th`
  }
}

export function DayOfInfo({ date, category }: DayOfInfoProps) {
  const duration = getDuration(category)

  const formattedDate = formatDate(date)
  const [month, day, year] = formattedDate.split(' ')
  const dayWithSuffix = addOrdinalSuffix(parseInt(day, 10))
  const finalDate = `${month} ${dayWithSuffix}, ${year}`

  return (
    <Container className={classes.container}>
      <Paper
        shadow="md"
        withBorder
        radius="md"
        p="md"
        className={classes.paper}
      >
        <div className={classes.textContainer}>
          <Text size="lg" className={classes.date}>
            {finalDate}
          </Text>
          <Text size="md" className={classes.bondType}>
            {duration}
          </Text>
        </div>
      </Paper>
    </Container>
  )
}

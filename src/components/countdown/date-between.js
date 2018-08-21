import { padStart, floor } from 'lodash'

export function DateBetween(startDate, endDate) {
  const second = 1000
  const minute = second * 60
  const hour = minute * 60
  const day = hour * 24
  const distance = endDate - startDate

  if (distance < 0) {
    return false
  }

  const days = floor(distance / day)
  const hours = floor((distance % day) / hour)
  const minutes = padStart(floor((distance % hour) / minute), 2, '00')
  const seconds = padStart(floor((distance % minute) / second), 2, '00')

  const between = []

  if (days > 0) { between.push(`${days} day${days > 1 ? 's' : ''}`) }
  between.push(`${hours}:${minutes}:${seconds}`)

  return between.join(' ')
}

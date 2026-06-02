import { format, parseISO } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

const BD_TZ = 'Asia/Dhaka'

export function useDateFormat() {
  const formatMatchDate = (dateStr) => {
    try {
      const date = parseISO(dateStr)
      const bdDate = toZonedTime(date, BD_TZ)
      return format(bdDate, 'dd MMM yyyy')
    } catch {
      return dateStr
    }
  }

  const formatMatchTime = (dateStr) => {
    try {
      const date = parseISO(dateStr)
      const bdDate = toZonedTime(date, BD_TZ)
      return format(bdDate, 'hh:mm a') + ' BST'
    } catch {
      return ''
    }
  }

  const formatMatchDateTime = (dateStr) => {
    try {
      const date = parseISO(dateStr)
      const bdDate = toZonedTime(date, BD_TZ)
      return format(bdDate, 'dd MMM yyyy, hh:mm a') + ' BST'
    } catch {
      return dateStr
    }
  }

  const formatDay = (dateStr) => {
    try {
      const date = parseISO(dateStr)
      const bdDate = toZonedTime(date, BD_TZ)
      return format(bdDate, 'EEEE')
    } catch {
      return ''
    }
  }

  return { formatMatchDate, formatMatchTime, formatMatchDateTime, formatDay }
}

export function formatDate(dateStr) {
  try {
    const date = parseISO(dateStr)
    const bdDate = toZonedTime(date, BD_TZ)
    return format(bdDate, 'dd MMM yyyy')
  } catch {
    return dateStr
  }
}

export function formatTime(dateStr) {
  try {
    const date = parseISO(dateStr)
    const bdDate = toZonedTime(date, BD_TZ)
    return format(bdDate, 'hh:mm a') + ' BST'
  } catch {
    return ''
  }
}

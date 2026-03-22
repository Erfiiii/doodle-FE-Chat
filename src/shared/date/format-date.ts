const formatter = new Intl.DateTimeFormat('de-DE', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

export const formatDate = (date: Date): string => {
  return formatter.format(date)
}

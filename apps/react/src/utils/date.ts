const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
})

export function formatDate(dateString: string): string {
  if (!dateString) {
    return 'present'
  }

  try {
    return dateFormatter.format(new Date(dateString))
  } catch (error) {
    return dateString
  }
}

export function getDates({ startDate, endDate }: { startDate?: string; endDate?: string }): string {
  const start = startDate ? formatDate(startDate) : ''
  const end = endDate ? formatDate(endDate) : 'present'
  const divider = start && end ? ' - ' : ''
  return `${start}${divider}${end}`
}

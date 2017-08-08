export const itemsForSelectFields = [
    { name: 'Monday', value: 'Mon', number: 1 },
    { name: 'Tuesday', value: 'Tue', number: 2 },
    { name: 'Wednesday', value: 'Wed', number: 3 },
    { name: 'Thursday', value: 'Thur', number: 4 },
    { name: 'Friday', value: 'Fri', number: 5 },
    { name: 'Saturday', value: 'Sat', number: 6 },
    { name: 'Sunday', value: 'Sun', number: 7 },
]

export const recipients = [
  { name: 'foo', value: 'foo' },
  { name: 'bar', value: 'bar' },
  { name: 'baz', value: 'baz' }
]

export const defaultRepeatValue = itemsForSelectFields

export const roles = {
  required: {
    fn: (value) => !!value.length,
    text: 'This is required',
    fields: ['title', 'monitoringReport', 'repeat']
  },
  dataRequired: {
    fn: (value) => !!value,
    text: 'This is required',
    fields: ['timeZone', 'from']
  }
}

export const monitoringReport = [
  'Payload Monitoring Report',
  'Fragmentation Monitoring Report',
  'Tooth Detection Report'
]

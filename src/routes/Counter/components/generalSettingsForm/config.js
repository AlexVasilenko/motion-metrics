export const itemsForSelectFields = [
    { name: 'Monday', value: 'Mon' },
    { name: 'Tuesday', value: 'Tue' },
    { name: 'Wednesday', value: 'Wed' },
    { name: 'Thursday', value: 'Thur' },
    { name: 'Friday', value: 'Fri' },
    { name: 'Saturday', value: 'Sat' },
    { name: 'Sunday', value: 'Sun' },
]

export const recipients = [
  { name: 'foo', value: 'foo' },
  { name: 'bar', value: 'bar' },
  { name: 'baz', value: 'baz' }
]

export const defaultRepeatValue = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']

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

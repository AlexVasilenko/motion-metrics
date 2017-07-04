export default {
  required: {
    fn: (value) => !!value.length,
    text: 'This is required',
    fields: ['equipment']
  },
}

export default {
    type: "object",
    properties: {
      prefix: { type: 'string' },
      number : {type: 'number' }
    },
    required: ['number']
  } as const;
  
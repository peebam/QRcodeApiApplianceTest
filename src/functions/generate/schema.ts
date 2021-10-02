export default {
    type: "object",
    properties: {
      prefix: { 
        type: "string"
      },
      quantity : {
        type: "number" 
      },
      addLabel : { 
        type: "boolean"
      }
    },
    required: ["quantity"]
  } as const;
  
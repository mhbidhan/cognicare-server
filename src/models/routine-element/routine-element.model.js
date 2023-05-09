const { Schema, model } = require('mongoose');

const routineElementSchema = new Schema({
  name: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  activityType: {
    type: String,
    enum: ['meal', 'medicine', 'exercise', 'contact', 'game'],
    required: true,
  },
  startTime: {
    type: Number,
    min: 0,
    max: 23,
    required: true,
  },
  endTime: {
    type: Number,
    min: 0,
    max: 23,
    required: true,
  },
  medicine: {
    type: {
      medicine: [
        {
          name: {
            type: {
              type: String,
              min: 3,
              max: 255,
              required: true,
            },
            description: {
              type: String,
              min: 3,
              max: 255,
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
            },
            unit: {
              type: Number,
              required: true,
            },
            packageImgUrl: {
              type: String,
              min: 3,
              max: 255,
              required: true,
            },
            medicineImgUrl: {
              type: String,
              min: 3,
              max: 255,
              required: true,
            },
          },
        },
      ],
    },
    required: () => (this.activityType === 'medicine' ? true : false),
  },
  exercise: {
    type: {
      name: {
        type: String,
        min: 3,
        max: 255,
        required: true,
      },
      description: {
        type: String,
        min: 3,
        max: 255,
        required: true,
      },
      urls: [
        {
          _id: false,
          type: String,
          min: 3,
          max: 255,
          required: true,
        },
      ],
    },
    required: () => (this.activityType === 'exercise' ? true : false),
  },
  meal: {
    type: {
      name: {
        type: String,
        min: 3,
        max: 255,
        required: true,
      },
      description: {
        type: String,
        min: 3,
        max: 255,
        required: true,
      },
    },
    required: () => (this.activityType === 'meal' ? true : false),
  },
  contact: {
    type: {
      contacts: {
        type: [
          {
            type: {
              name: {
                type: String,
                min: 3,
                max: 255,
                required: true,
              },
              email: {
                type: String,
                min: 3,
                max: 255,
                required: true,
              },
              phone: {
                type: String,
                min: 3,
                max: 255,
                required: true,
              },
              imgUrl: {
                type: String,
                min: 3,
                max: 255,
                required: true,
              },
              relationship: {
                type: String,
                min: 3,
                max: 255,
                required: true,
              },
            },
          },
        ],
      },
    },
    required: () => (this.activityType === 'contact' ? true : false),
  },
  game: {
    type: {
      name: {
        type: String,
        min: 3,
        max: 255,
        required: true,
      },
    },
    required: () => (this.activityType === 'game' ? true : false),
  },
});

const routineElements = model('Routine-Element', routineElementSchema);

module.exports = routineElements;

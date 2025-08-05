import { defineMongooseModel } from '#nuxt/mongoose'
import { Types } from 'mongoose'
import type { Preference } from '~/types'

export const PreferenceSchema = defineMongooseModel<Preference>({
  name: 'Preference',
  schema: {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
    dietaries: [{
      type: String,
    }],
    mealType: {
      type: String,
      required: true,
    },
    cookingTime: [{
      type: Number,
    }],
    flavors: [{
      type: String,
    }],
    skillLevel: {
      type: String,
    },
    ingredients: {
      type: String,
      required: true
    },
  },
  options: {
    timestamps: true,
  },
})

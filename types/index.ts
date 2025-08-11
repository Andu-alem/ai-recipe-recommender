import type { ObjectId } from 'mongoose'
import type { PreferenceType } from '~/lib/preferenceSchema'

type Basic = {
  _id: ObjectId
  user: ObjectId
  createdAt: string
  updatedAt: string
}

export type Preference = Basic & PreferenceType

export type GeneratedRecipe = {
  name: string
  cookTime: string
  servings: number
  tags: string[]
  ingredients: string[]
  instructions: string[]
  nutritionInfo: string
}

export type BaseRecipe = GeneratedRecipe & {
  dietaries: string[]
  mealType: string
  flavors: string[]
  skillLevel: string
  cuisine: string
  userIngredients: string
}

export type Recipe = BaseRecipe & {
  _id: ObjectId
  user: ObjectId
  createdAt: string
  updatedAt: string
}


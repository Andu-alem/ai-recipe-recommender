import { defineMongooseModel } from '#nuxt/mongoose'
import { Types } from 'mongoose'
import type { Recipe } from '~/types'

export const RecipeSchema = defineMongooseModel<Recipe>({
    name: 'Recipe',
    schema: {
        user: {
            type: Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true
        },
        servings: {
            type: Number,
            required: true
        },
        tags: [{
            type: String,
            required: true
        }],
        instructions: [{
            type: String,
        }],
        ingredients: [{
            type: String,
            required: true
        }],
        dietaries: [{
            type: String,
        }],
        mealType: {
            type: String,
            required: true,
        },
        cookTime: {
            type: String,
            required: true
        },
        flavors: [{
            type: String,
        }],
        skillLevel: {
            type: String,
        },
        userIngredients: {
            type: String,
            required: true
        },
    },
    options: {
        timestamps: true,
    },
})

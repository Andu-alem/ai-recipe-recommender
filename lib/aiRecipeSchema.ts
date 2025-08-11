import * as z from 'zod'

export const aiRecipeSchema = z.object({
    name: z.string(),
    tags: z.array(z.string()),
    cookTime: z.string().transform(value => [Number(value)]),
    ingredients: z.array(z.string()),
    instructions: z.array(z.string()),
    servings: z.string().transform(value => Number(value)),
    nutritionInfo: z.string(),
})
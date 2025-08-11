import * as z from 'zod'

export const aiRecipeSchema = z.object({
    name: z.string(),
    tags: z.array(z.string()),
    cookTime: z.string().transform(value => [Number(value)]),
    ingredients: z.array(z.string()),
    instructions: z.array(z.string()),
    servings: z.string()
                .transform(value => Number(value))
                .describe("Only in alph numerical value like 3 or 4"),
    nutritionInfo: z.string()
                    .describe("Only general nutritional value of this dish, avoid any additional info or warning"),
})
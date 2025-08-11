
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const preferenceSchema = z.object({
    dietaries: z.array(z.string()).refine(value => value.some(item => item), {
        message: 'You have to select at least one item.',
    }),
    mealType: z.string({
        message: "You have to select a meal type.",
    }),
    cookingTime: z.array(
        z.number().min(10, {
        message: "Minimum allwed cooking time is 10 minitues"
        }).max(120),
    ),
    flavors: z.array(z.string()).refine(value => value.some(item => item), {
        message: 'You have to select at least one flavor.',
    }),
    cuisine: z.string({
        message: 'You have to select at least one cuisine preference.',
    }),
    skillLevel: z.string({
        message: "You have to choose a skill level."
    }),
    ingredients: z.string({
        message: "You need to tell me the ingredients you have."
    })
})

export const formSchema = toTypedSchema(preferenceSchema)

export type PreferenceType = z.infer<typeof preferenceSchema>
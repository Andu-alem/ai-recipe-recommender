import { generateObject } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { aiRecipeSchema } from '~/lib/aiRecipeSchema'
import type { Preference } from "~/types"


function generatePrompt(preference: Preference) {
    const prompt = `
        You are a culinary expert AI that generates recipes based on user preferences and available ingredients.

        User Preferences:
        - Flavours: ${preference.flavors}
        - Dietary Restrictions: ${preference.dietaries}
        - Meal Type: ${preference.mealType}
        - Cooking Skill Level: ${preference.skillLevel}
        - Time Available: ${preference.cookingTime[0]}
        - Cuisine Preference: ${preference.cuisine}

        Available Ingredients:
        ${preference.ingredients}

        Generate 3 to 5 recipes that:
        - Use only or mostly the provided ingredients
        - Match the user's preferences
        - Are creative but practical
    `
    return prompt
}

export default defineEventHandler(async (event) => {
    // accept preferences
    // make llm call using preferences
    // accept a structure response from llm
    // respond back the llm response to the user
    const body = await readBody(event) // preferences
    const config = useRuntimeConfig()

    const gemini = createGoogleGenerativeAI({
        apiKey: config.GOOGLE_GENERATIVE_AI_API_KEY
    })

    if (!body) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing preferences payload in request',
        })
    }

    try {
        const { object } = await generateObject({
            model: gemini("gemini-1.5-flash"),
            output: "array",
            schema: aiRecipeSchema,
            temperature: 0.7,
            prompt: generatePrompt(body),
        })

        return object
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Server Error!',
        })
    }
})
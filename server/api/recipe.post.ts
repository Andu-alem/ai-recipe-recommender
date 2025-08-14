import { generateObject } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { aiRecipeSchema } from '~/lib/aiRecipeSchema'
import type { Preference } from "~/types"
import { Redis } from "@upstash/redis"
import { Ratelimit } from "@upstash/ratelimit"
import { auth } from "~/lib/auth"


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
    // check ratelimit
    // make llm call using preferences
    // fetch a structured response from llm
    // respond back the llm response to the user
    const body = await readBody(event) // preferences
    const config = useRuntimeConfig()
    const session = await auth.api.getSession({
        headers: event.headers
    })

    if (!session) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Unauthorized user request',
        })
    }

    if (!body) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing preferences payload in request',
        })
    }

    const redis = new Redis({
        url: config.UPSTASH_REDIS_REST_URL,
        token: config.UPSTASH_REDIS_REST_TOKEN
    })

    const ratelimit = new Ratelimit({
        redis: redis,
        limiter: Ratelimit.slidingWindow(7, '24 h'),
        analytics: true,
        prefix: '@upstash/ratelimit'
    })

    const { success, limit, reset, remaining } = await ratelimit.limit(session.user.id)

    if (!success) {
        setResponseHeaders(event, {
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': String(remaining),
            'X-RateLimit-Reset': String(reset)
        })
            
        throw createError({
            statusCode: 429,
            statusMessage: 'Too Many Requests'
        })
    }

    const gemini = createGoogleGenerativeAI({
        apiKey: config.GOOGLE_GENERATIVE_AI_API_KEY
    })

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
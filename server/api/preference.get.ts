import { auth } from "~/lib/auth"

export default defineEventHandler(async (event) => {
    const session = await auth.api.getSession({
        headers: event.headers
    })

    if (!session) {
        throw createError({
            statusCode: 403,
            statusMessage: "Unauthorized user request",
        })
    }
    
    try {
        return await PreferenceSchema.findOne({
            user: session?.session.userId
        })
    }
    catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Server Error!',
        })
    }
})
  
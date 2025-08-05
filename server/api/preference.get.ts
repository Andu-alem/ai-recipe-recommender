import { auth } from "~/lib/auth"

export default defineEventHandler(async (event) => {
    const session = await auth.api.getSession({
        headers: event.headers
    })
    try {
        return await PreferenceSchema.findOne({
            user: session?.session.userId
        })
    }
    catch {
        throw createError({
            statusCode: 400,
            statusMessage: 'not found!',
        })
    }
})
  
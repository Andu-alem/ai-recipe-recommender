import { auth } from "~/lib/auth"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const session = await auth.api.getSession({
        headers: event.headers
    })

    if (!body) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing payload in request',
        })
    }

    if (!session) {
        throw createError({
            statusCode: 403,
            statusMessage: "Unauthorized user request",
        })
    }

    try {
        return await new RecipeSchema({
            user: session.user.id,
            ...body,
        }).save()
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Server Error!',
        })
    }
})
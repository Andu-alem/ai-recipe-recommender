import { auth } from "~/lib/auth"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const session = await auth.api.getSession({
        headers: event.headers
    })

    if (!body.id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing recipe id in request',
        })
    }

    if (!session) {
        throw createError({
            statusCode: 403,
            statusMessage: "Unauthorized user request",
        })
    }
  
    return await RecipeSchema.deleteOne({
        _id: body.id
    })
})
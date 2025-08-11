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
        if (body.id) {
            return await PreferenceSchema.findOneAndUpdate(
                { _id: body.id },
                {
                    ...body.pref
                }
            )
        } else {
            return await new PreferenceSchema({
                user: session.user.id,
                ...body.pref
            }).save()
        }
    } catch {
        throw createError({
            statusCode: 500,
            statusMessage: 'Server Error!',
        })
    }
})
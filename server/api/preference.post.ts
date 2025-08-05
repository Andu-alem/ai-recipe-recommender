import { auth } from "~/lib/auth"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const session = await auth.api.getSession({
        headers: event.headers
    })
    if (session) {
        return await new PreferenceSchema({
            user: session.user.id,
            ...body,
        }).save()
    }
})
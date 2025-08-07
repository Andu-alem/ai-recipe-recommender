import { auth } from "~/lib/auth"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const session = await auth.api.getSession({
        headers: event.headers
    })
    
    if (session) {
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
    }
})
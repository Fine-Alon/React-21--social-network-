import {string, z} from "zod";

export const UserSchema = z.object({
    id: string(),
    username: string()
})

export type User = z.infer<typeof UserSchema>

export function fetchUser(id: string): Promise<User> {
    return fetch(`api/users/${id}`)
        .then(res => res.json())
        .then(res => UserSchema.parse(res))
}

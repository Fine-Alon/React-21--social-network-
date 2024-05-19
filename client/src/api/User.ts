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

export async function validateResponse(res: Response): Promise<Response> {
    if (!res.ok) {
        throw new Error(await res.text())
    }
    return res
}

export function registerUser(userName: string, password: string): Promise<void> {
    return fetch('api/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({password, userName})
    }).then(validateResponse).then(() => undefined)
}

export function loginUser(userName: string, password: string): Promise<void> {
    return fetch('api/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userName, password})
    }).then(validateResponse).then(() => undefined)
}

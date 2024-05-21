import {string, z} from "zod";
import {validateResponse} from "./validateResponse.ts";

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

export function registerUser(username: string, password: string): Promise<void> {
    return fetch('api/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({password, username})
    }).then(validateResponse).then(() => undefined)
}

export function loginUser(username: string, password: string): Promise<void> {
    return fetch('api/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    }).then(validateResponse).then(() => undefined)
}

export function fetchMe(): Promise<User> {
    return fetch('api/users/me')
        .then(validateResponse)
        .then(res => res.json())
        .then(res => UserSchema.parse(res))
}

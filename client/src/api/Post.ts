import {number, string, z} from "zod";
import {useEffect, useState} from "react";
import { QueryClient } from '@tanstack/react-query'


export const PostSchema = z.object({
    id: z.string(),
    text: z.string(),
    authorId: string(),
    createdAt: number()
});

export type Post = z.infer<typeof PostSchema>;
export const PostListSchema = z.array(PostSchema)

export type PostList = z.infer<typeof PostListSchema>
export const FetchPostListSchema = z.object({list: PostListSchema})

export type FetchPostListResponse = z.infer<typeof FetchPostListSchema>

export function fetchPostList(): Promise<FetchPostListResponse> {
    return fetch('api/posts')
        .then(res => res.json())
        .then(res => FetchPostListSchema.parse(res))
}

interface IdleRequestState {
    status: 'idle'
}

interface PendingRequestState {
    status: 'pending'
}

interface SuccessRequestState {
    status: 'success',
    data: PostList
}

interface ErrorRequestState {
    status: 'error',
    error: unknown
}

type RequestState = IdleRequestState | PendingRequestState | SuccessRequestState | ErrorRequestState

export function usePostList() {
    const [state, setState] = useState<RequestState>({status: 'idle'})

    useEffect(() => {
        if (state.status === "pending") {
            fetchPostList()
                .then((data) => {
                    setState({status: 'success', data: data.list})
                })
                .catch((error) => {
                    setState({status: 'error', error})
                })
        }
    }, [state])

    useEffect(() => {
        setState({status: 'pending'})
    }, []);


    const refetch = () => {
        setState({status: 'pending'})
    }

    return {state, refetch}
}


export interface Post {
    /**
    * Post identity
    */
    id: string,
    text: string,
    authorId: string,
    createdAt: number
}

export type PostList = Post[]

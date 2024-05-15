import {fetchPostList} from "../../api/Post.ts";
import {Loader} from "../Loader";
import {PostListView} from "./PostListView.tsx";
import {useQuery} from "@tanstack/react-query";
import {queryClient} from "../../api/queryClient.ts";
import {FC} from "react";


export const FetchPostListView:FC = () => {
    const postListQuery = useQuery({queryKey: ['posts'], queryFn: fetchPostList}, queryClient)

    switch (postListQuery.status) {
        case "pending":
            return <Loader/>
        case "success":
            return <PostListView postList={postListQuery.data.list}/>
        case "error":
            return <div>
                <p>here presents some error</p>
                <button
                    // onClick={() => {refetch()}}
                    onClick={() => postListQuery.refetch}
                >Try load again
                </button>
            </div>
        default:
            break;

    }
}

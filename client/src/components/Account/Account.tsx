import {useQuery} from "@tanstack/react-query";
import {queryClient} from "../../api/queryClient.ts";
import {fetchMe} from "../../api/User.ts";
import {Loader} from "../Loader";
import {AuthForm} from "../AuthForm";
import {PostForm} from "../PostForm";

export const Account = () => {
    const queryMe = useQuery({
        queryFn: () => fetchMe(),
        queryKey: ['users', 'me']
    }, queryClient)

    switch (queryMe.status) {
        case "pending":
            return <Loader/>
        case "success":
            return <PostForm/>
        case "error":
            return <AuthForm/>
    }
}

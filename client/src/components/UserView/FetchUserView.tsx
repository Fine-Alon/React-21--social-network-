import {useQuery} from "@tanstack/react-query";
import {queryClient} from "../../api/queryClient.ts";
import {fetchUser} from "../../api/User.ts";
import {FC} from "react";
import {Loader} from "../Loader";
import {UserView} from "./UserView.tsx";

interface FetchUserViewProps {
    userId: string
}

export const FetchUserView: FC<FetchUserViewProps> = ({userId}) => {
    const info = useQuery({
        queryKey: ['users', userId],
        queryFn: () => fetchUser(userId)
    }, queryClient)

    switch (info.status) {
        case 'pending':
            return <Loader/>
        case 'success':
            console.log(info.data)

            return <UserView user={info.data}/>
        case 'error':
            return <div>
                <p>here presents some error</p>
                <button
                    onClick={() => info.refetch()}
                >Try load again
                </button>
            </div>
    }
}

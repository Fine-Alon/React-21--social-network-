import {FC} from 'react';
import {Button} from '../Button';
import {FormField} from '../FormField';
import './PostForm.css';
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "../../api/queryClient.ts";
import {createPost} from "../../api/Post.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod";


export interface IPostFormProps {
}

const SchemaPostForm = z.object({
    text: z.string().min(10, '10 characters at least')
})

type TypePostForm = z.infer<typeof SchemaPostForm>

export const PostForm: FC<IPostFormProps> = () => {

    const mutationPost = useMutation(
        {
            mutationFn: createPost,
            onSuccess() {
                queryClient.invalidateQueries({queryKey: ['posts']})
            }
        }, queryClient)

    const {
        register, handleSubmit,
        formState: {errors}
        } = useForm<TypePostForm>({resolver: zodResolver(SchemaPostForm)})

    return (
        <form onSubmit={handleSubmit((data) => {
            mutationPost.mutate(data.text)
        })} className="post-form">
            <FormField label="Текст поста" errorMessage={errors.text?.message}>

                <textarea className="post-form__input"{...register("text")}/>
            </FormField>

            <Button type="submit" title="Опубликовать" isLoading={mutationPost.isPending}/>
        </form>
    );
};

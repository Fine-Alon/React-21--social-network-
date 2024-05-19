import {FC, FormEventHandler, useState} from 'react';

import {FormField} from '../FormField';
import {Button} from '../Button';
import './LoginForm.css';
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "../../api/queryClient.ts";
import {loginUser} from "../../api/User.ts";

export const LoginForm: FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const mutationLogin = useMutation(
        {mutationFn: () => loginUser(username, password)}, queryClient)

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        mutationLogin.mutate()
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <FormField label="Имя пользователя">
                <input
                    type="text"
                    name="username"
                    onChange={(event) => setUsername(event.target.value)}
                    value={username}
                />
            </FormField>

            <FormField label="Пароль">
                <input
                    type="password"
                    name="password"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                />
            </FormField>

            {mutationLogin.error && <span>{mutationLogin.error.message}</span>}

            <Button type="submit" title="Login" isLoading={mutationLogin.isPending}/>
        </form>
    );
};

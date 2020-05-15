import React, {useState} from 'react';
import {useHttp} from "../hooks/http.hook";


export const AuthPage = () => {
    const {loading, error, request} = useHttp();
    const [form , setForm] = useState({
        email: '',
        password: ''
    });

    const changeHandler = event => {
        setForm( {...form , [event.target.name]: event.target.value})
    };

    const registerHandler = async () =>{
        try {
            const data = await request('api/auth/register', 'POST', {...form});
            console.log(data)
        } catch {
            console.log(error)
        }
    };

    return (
        <div>
            <form>
                <input onChange={changeHandler} name={"email"} type={"text"} placeholder={"email"}/>
                <input onChange={changeHandler} name={"password"} type={"password"} placeholder={"password"}/>
                <button onClick={registerHandler} disabled={loading}>Registration</button>
                <button disabled={loading}>Log in</button>
            </form>
        </div>
    );
}


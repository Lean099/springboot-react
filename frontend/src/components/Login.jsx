import axios from 'axios'
import { useState } from 'react'
import { useCookies } from "react-cookie";

export const Login = ()=>{

    const [dataForm, setDataForm] = useState({username: "", password: ""})
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    const handleChange = (e)=>{
        setDataForm(
            {
                ...dataForm, 
                [e.target.name] : e.target.value
            }
        )
    }

    const handleCookie = (token)=>{
        const date = new Date()
        setCookie("token", token?.access_token, {
            path: "/",
            expires: date.setMinutes(date.getMinutes + 10),
            maxAge: 600
        })
        // Faltaria agregar esa cookie al contexto de la aplicacion
    }

    const submitForm = (e)=>{
        e.preventDefault()
        const loginFormData = new FormData();
        loginFormData.append("username", dataForm.username)
        loginFormData.append("password", dataForm.password)
        try {
            const response = axios({
                method: "post",
                url: "https://8080-lean099-learnsbgitpod-oxuz64x7mr5.ws-us47.gitpod.io/login",
                data: loginFormData,
                headers: { 
                    "Content-Type": "application/x-www-form-urlencoded"
                },
            });
            response.then(res => {
                handleCookie(res.data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <form onSubmit={submitForm}>
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" name="username" onChange={handleChange} value={dataForm.username}/>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" onChange={handleChange} value={dataForm.password}/>
            </div>
            
            <button type="submit" class="btn btn-primary btn-sm">Log In</button>
        </form>
    )
}
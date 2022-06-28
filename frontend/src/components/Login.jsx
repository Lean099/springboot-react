import axios from 'axios'
import { useState, useContext } from 'react'
import { useCookies } from "react-cookie";
import { Context } from './Home'
import { TYPES } from '../actions/pageAction'

export const Login = ()=>{

    const [dataForm, setDataForm] = useState({username: "", password: ""})
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const context = useContext(Context)

    const handleChange = (e)=>{
        setDataForm(
            {
                ...dataForm, 
                [e.target.name] : e.target.value
            }
        )
    }

    const handleCookie = (data)=>{
        const date = new Date()
        setCookie("token", data?.access_token, {
            path: "/",
            expires: date.setMinutes(date.getMinutes + 10),
            maxAge: 600
        })
    }

    const submitForm = (e)=>{
        e.preventDefault()
        const loginFormData = new FormData();
        loginFormData.append("username", dataForm.username)
        loginFormData.append("password", dataForm.password)
        try {
            const response = axios({
                method: "post",
                url: `${import.meta.env.VITE_API_DOMAIN}/login`,
                data: loginFormData,
                headers: { 
                    "Content-Type": "application/x-www-form-urlencoded"
                },
            });
            response.then(res => {
                // el res.data es simplemente un objeto {...} dentro tiene las propiedades access_token e id_user
                handleCookie(res.data)
                context.pageDispatch({ type: TYPES.LOGIN, payload: res.data })
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
            {context.pageState.isAuthenticated +" "+ context.pageState.token +" "+ context.pageState.idUser}
            <button type="submit" class="btn btn-primary btn-sm">Log In</button>
        </form>
    )
}
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
        setCookie("id_user", data?.id_user, {
            path: "/",
            expires: date.setMinutes(date.getMinutes + 10),
            maxAge: 600
        })
    }

    const getUserData = (data)=>{
        const response = axios({
            method: "get",
            url: `${import.meta.env.VITE_API_DOMAIN}/api/user/${data.id_user}`,
            headers: { 'Authorization': `Bearer ${data?.access_token}` }
        })
        response.then(res => {
            // Es un simple objeto con props: id, dob, picturePublicId, pictureUrl, username, email, questionsList, answersList
            context.pageDispatch({ type: TYPES.LOGIN, payload: res.data })
        })
        document.getElementById("modalLoginRegister").classList.remove("show", "d-block");
		document.querySelectorAll(".modal-backdrop").forEach(el => el.classList.remove("modal-backdrop"));
        document.getElementsByTagName("body")[0].style = ''
		document.getElementsByTagName("body")[0].classList.remove('modal-open')
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
                getUserData(res.data)
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
import { useState } from "react"
import axios from 'axios'

export const Register = ()=>{

    const [dataForm, setDataForm] = useState({username: "", email: "", password: ""})
    const [username, setUsername] = useState("")
  
    const handleChange = (e)=>{
      setDataForm(
          {
              ...dataForm, 
              [e.target.name] : e.target.value
          }
      )
    }

    const submitForm = (e)=>{
        e.preventDefault()
        const userData = JSON.stringify({
            "username": dataForm.username,
            "email": dataForm.email,
            "password": dataForm.password
        })
        try {
            const response = axios({
                method: 'post',
                url: `${import.meta.env.VITE_API_DOMAIN}/api/user/create`,
                data: userData,
                headers: { 
                    'Content-Type': 'application/json'
                }
            })
            response.then(res => setUsername(res.data.username))
        } catch (error) {
            console.log(error)
        }

    }


  
    return(
      <form onSubmit={submitForm}>
          <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username" name="username" onChange={handleChange} value={dataForm.username} required/>
          </div>
          <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="text" class="form-control" id="email" name="email" onChange={handleChange} value={dataForm.email} required/>
          </div>
          <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" name="password" onChange={handleChange} value={dataForm.password} required/>
          </div>
          <button type="submit" class="btn btn-primary btn-sm">Create Account</button>
          { username.length>0 && <span  class="alert alert-success ms-2" style={{padding: "2px"}}>User: {username} created successfully</span>}
      </form>
    )
}
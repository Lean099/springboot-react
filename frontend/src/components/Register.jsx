import { useState } from "react"

export const Register = ()=>{

    const [dataForm, setDataForm] = useState({username: "", email: "", password: ""})
  
    const handleChange = (e)=>{
      setDataForm(
          {
              ...dataForm, 
              [e.target.name] : e.target.value
          }
      )
    }
  
    return(
      <form>
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
      </form>
    )
}
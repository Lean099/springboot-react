import axios from "axios";
import { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import { useCookies } from "react-cookie";
import { Context } from './Home'
import { TYPES } from '../actions/pageAction'

import "react-datepicker/dist/react-datepicker.css";

export const EditPersonalData = ()=>{

  const context = useContext(Context)
  const [cookies, setCookie, removeCookie] = useCookies(["token", "id_user"])
  const [file, setFile] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [dataUser, setDataUser] =  useState({
    username: "",
    email: "",
    password: ""
  })
  const [dobInput, setDobInput] = useState(false)
  const [remove, setRemove] = useState(false)

  const handleChange = (e)=>{
    setDataUser({
      ...dataUser,
      [e.target.name] : e.target.value
    })
  }

  const handleFile = (e)=>{
    setFile(e.target.files[0])
  }

  const resetInputFile = (e)=>{
    document.getElementById(e.target.name).value = "";
    setFile(null)
  }

  const disableInput = (e)=>{
    const input = document.getElementById(e.target.name)
    input.disabled = !input.disabled
  }

  const updateUserData = ()=>{
    const userData = JSON.stringify({
      "username": dataUser.username!=="" ? dataUser.username : null,
      "dob": startDate!==null ? startDate : null
    })
    axios({
      method: 'post',
      url: `${import.meta.env.VITE_API_DOMAIN}/api/user/usernameAndDob/${cookies.id_user}`,
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`
      },
      data: userData
    }).then(res =>{
      context.pageDispatch({ type: TYPES.UPDATE_USERNAME_DOB, payload: res.data })
    }).catch(error => console.log(error))
  }

  const updateCredentials = ()=>{
    const credentials = JSON.stringify({
      "email": dataUser.email!=="" ? dataUser.email : null,
      "password": dataUser.password!=="" ? dataUser.password : null
    })
    axios({
      method: 'post',
      url: `${import.meta.env.VITE_API_DOMAIN}/api/user/emailAndPassword/${cookies.id_user}`,
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`
      },
      data: credentials
    }).then(res => {
      context.pageDispatch({type: TYPES.UPDATE_EMAIL, payload: res.data})
    }).catch(error => console.log(error))
  }

  const updatePicture = ()=>{
    const formData = new FormData()
    formData.append('file', file)
    axios({
      method: 'post',
      url: `${import.meta.env.VITE_API_DOMAIN}/api/upload/${cookies.id_user}`,
      headers:{
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${cookies.token}`
      },
      data: formData
    }).then(res =>{
      context.pageDispatch({ type: TYPES.UPDATE_PICTURE_URL, payload: res.data })
    }).catch(error => console.log(error))
  }

  const deleteCurrentPicture = ()=>{
    axios({
      method: 'post',
      url: `${import.meta.env.VITE_API_DOMAIN}/api/upload/deleteUserPicture/${cookies.id_user}`,
      headers: {
        'Authorization': `Bearer ${cookies.token}`
      }
    })
    .then(res => context.pageDispatch({type: TYPES.UPDATE_PICTURE_URL, payload: null}))
    .catch(error => console.log(error))
  }

  const submitForm = (e)=>{
    e.preventDefault()
    if(file){
      updatePicture()
    }
    if(dataUser.username || startDate){
      updateUserData()
    }
    if(dataUser.email || dataUser.password){
      updateCredentials()
    }
  }

  const removeAccount = ()=>{
    axios({
      method: 'delete',
      url: `${import.meta.env.VITE_API_DOMAIN}/api/user/deleteUser/${cookies.id_user}`,
      headers: {
        'Authorization': `Bearer ${cookies.token}`
      }
    })
    .then(res => {
      removeCookie("token")
      removeCookie("id_user")
      context.pageDispatch({type: TYPES.LOGOUT})
      window.location.reload()
    })
    .catch(error => console.log(error))
  }

  return(
    <div>
      <button className="btn btn-primary btn-sm ms-2" data-bs-toggle="modal" data-bs-target="#editPersonalDataModal">Edit Personal Data</button>
      
      <div class="modal fade" id="editPersonalDataModal" tabindex="-1" aria-labelledby="editPersonalDataModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editPersonalDataModalLabel">Edit your data</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
              <div class="modal-body">
                {
                  !remove ? (
                    <form onSubmit={submitForm}>
                      <div class="mb-3 d-flex justify-content-between">
                        <div>
                          <label for="username" class="form-label">Username</label>
                            <div className="input-group">
                              <input onChange={handleChange} type="text" class="form-control form-control-sm" name="username" id="username" aria-describedby="usernameHelp" value={dataUser.username}/>
                              <button class="btn btn-dark btn-sm" onClick={(e)=>{setDataUser({...dataUser, username: ""}); disableInput(e)}} type="button" name="username" id="fileInput" style={{zIndex: "0"}}>
                                <div class="btn-close btn-close-white btn-sm"></div>
                              </button>
                            </div>
                        </div>
                        <div>
                          <label for="dob" class="form-label">Birthday Date</label>
                          <div className="input-group">
                            <div>
                              <DatePicker disabled={dobInput} className="form-control form-control-sm" name="dob" id="dob" dateFormat="dd/MM/yyyy" selected={startDate ? startDate : new Date()} peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" onChange={(date) => setStartDate(date)} />
                            </div>
                            <button class="btn btn-dark btn-sm" onClick={ ()=>{ setStartDate(null); setDobInput(prev => !prev) } } type="button" name="dob" id="fileInput" style={{zIndex: "0"}}>
                              <div class="btn-close btn-close-white btn-sm"></div>
                            </button>
                          </div>       
                        </div>
                                    
                      </div>
                      <div class="mb-3">
                        <label for="file" class="form-label">Select the profile image you want to upload. Or delete your current profile picture.</label>
                        <div class="input-group">
                          <input type="file" onChange={handleFile} class="form-control form-control-sm" name="file" id="file" aria-describedby="img" aria-label="Upload"/>
                          <button class="btn btn-dark btn-sm" onClick={resetInputFile} type="button" id="fileInput" name="file" style={{zIndex: "0"}}>
                            <div class="btn-close btn-close-white btn-sm"></div>
                          </button>
                          <button class="btn btn-danger btn-sm" onClick={deleteCurrentPicture}>Delete</button>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <div className="input-group">
                          <input type="email" onChange={handleChange} class="form-control form-control-sm" name="email" id="email" aria-describedby="emailHelp" value={dataUser.email}/>
                          <button class="btn btn-dark btn-sm" onClick={(e)=>{setDataUser({...dataUser, email: ""}); disableInput(e)}} type="button" name="email" id="fileInput" style={{zIndex: "0"}}>
                            <div class="btn-close btn-close-white btn-sm"></div>
                          </button>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <div className="input-group">
                          <input type="password" onChange={handleChange} class="form-control form-control-sm" name="password" id="password" value={dataUser.password}/>
                          <button class="btn btn-dark btn-sm" onClick={(e)=>{setDataUser({...dataUser, password: ""}); disableInput(e)}} type="button" name="password" id="fileInput" style={{zIndex: "0"}}>
                            <div class="btn-close btn-close-white btn-sm"></div>
                          </button>
                        </div>       
                      </div>

                      <div className="d-flex justify-content-between">
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <button onClick={()=>setRemove(!remove)} className="btn btn-danger btn-sm">Remove Account</button>
                      </div>
                    </form>
                  )
                  :
                  (
                    <div>
                      <h4 class="mb-4 lead text-center">Are you sure you want to delete your account and all its information?</h4>
                      <div class="d-flex justify-content-between">
                        <button onClick={()=>setRemove(!remove)} class="btn btn-dark">Cancel</button>
                        <button onClick={removeAccount} class="btn btn-danger">Confirm</button>
                      </div>
                      
                    </div>
                  )
                }
                
              </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
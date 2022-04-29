import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const EditPersonalData = ()=>{

  const [file, setFile] = useState("")
  const [startDate, setStartDate] = useState(new Date());
  const [dataUser, setDataUser] =  useState({
    username: "",
    age: new Date(),
    email: "",
    password: ""
  })

  const handleChnage = (e)=>{
    setDataUser({
      ...dataUser,
      [e.target.name] : e.target.value
    })
  }

  const resetInputFile = ()=>{
    document.getElementById("fileInput").value = "";
  }

  const disableInput = (e)=>{
    console.log(document.getElementById(e.target.name))
    console.log(document.getElementById(e.target.name).disabled)
    const input = document.getElementById(e.target.name).disabled
    if(input){
      document.getElementById(e.target.name).disabled = false
    }else{
      document.getElementById(e.target.name).disabled = true
    }
  }

  console.log(dataUser)

  return(
    <div>
      <button className="btn btn-primary btn-sm ms-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Personal Data</button>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit your data</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <form>
                              <div class="mb-3 d-flex justify-content-between">
                                <div>
                                  <label for="username" class="form-label">Username</label>
                                  <div className="input-group">
                                    <input onChange={handleChnage} type="email" class="form-control form-control-sm" name="username" id="username" aria-describedby="usernameHelp"/>
                                    <button class="btn btn-dark btn-sm" onClick={disableInput} type="button" name="username" id="fileInput" style={{zIndex: "0"}}>
                                        <div class="btn-close btn-close-white btn-sm"></div>
                                    </button>
                                  </div>
                                </div>
                                <div>
                                  <label for="age" class="form-label">Age</label>
                                  
                                  <div className="input-group">
                                    <div><DatePicker className="form-control form-control-sm" name="age" id="age" dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date) => setStartDate(date)} /></div>
                                    <button class="btn btn-dark btn-sm" onClick={disableInput} type="button" name="age" id="fileInput" style={{zIndex: "0"}}>
                                        <div class="btn-close btn-close-white btn-sm"></div>
                                    </button>
                                  </div>
                                  
                                </div>
                                
                              </div>
                              <div class="mb-3">
                                <label for="file" class="form-label">Select the profile image you want to upload.</label>
                                <div class="input-group">
                                    <input type="file" class="form-control form-control-sm" name="file" id="file" aria-describedby="img" aria-label="Upload"/>
                                    <button class="btn btn-dark btn-sm" onClick={resetInputFile} type="button" id="fileInput" style={{zIndex: "0"}}>
                                        <div class="btn-close btn-close-white btn-sm"></div>
                                    </button>
                                </div>
                              </div>
                              <div class="mb-3">
                                <label for="email" class="form-label">Email address</label>
                                <div className="input-group">
                                  <input type="email" class="form-control form-control-sm" name="email" id="email" aria-describedby="emailHelp"/>
                                  <button class="btn btn-dark btn-sm" onClick={disableInput} type="button" name="email" id="fileInput" style={{zIndex: "0"}}>
                                      <div class="btn-close btn-close-white btn-sm"></div>
                                  </button>
                                </div>
                              </div>
                              <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <div className="input-group">
                                  <input type="password" class="form-control form-control-sm" name="password" id="password"/>
                                  <button class="btn btn-dark btn-sm" onClick={disableInput} type="button" name="password" id="fileInput" style={{zIndex: "0"}}>
                                      <div class="btn-close btn-close-white btn-sm"></div>
                                  </button>
                                </div>
                                
                              </div>
                              <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
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
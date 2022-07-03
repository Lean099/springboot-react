import { useState } from "react"
import { Login } from "./Login"
import { Register } from "./Register"

export const FormModal = (props)=>{

    const [loginOrRegister, setLoginOrRegister] = useState(false)
    
    return(
      <div>
        {
          props.component ? (
            <button type="button" class="btn btn-primary btn-sm mt-2" data-bs-toggle="modal" data-bs-target="#modalLoginRegister">
              Login
            </button>
          ) : (
            <button type="button" class="btn btn-dark btn-sm mt-2" data-bs-toggle="modal" data-bs-target="#modalLoginRegister">
              Ask
            </button>
          )
        }
          
          <div class="modal fade" id="modalLoginRegister" tabindex="-1" aria-labelledby="modalLoginRegisterLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="modalLoginRegisterLabel">{loginOrRegister ? "Register" : "Log In" }</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  
                  {
                    loginOrRegister ? <Register/> : <Login/>
                  }
                  <div class="mt-3 text-center">
                      <p>{ loginOrRegister ? "Do you already have an account?" : "Not a member?"} <span class="text-decoration-none btn btn-link" style={{verticalAlign: "baseline", margin: "0", padding: "0"}} onClick={()=> setLoginOrRegister(!loginOrRegister)}>{loginOrRegister ? "Log In" : "Register"}</span></p>
                  </div>
                  
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
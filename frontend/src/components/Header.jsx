import React, { useContext } from 'react'
import { EditPersonalData } from './EditPersonalData'
import { Context } from './Home'
import { FormModal } from './FormModal'
import { useCookies } from "react-cookie";
import { TYPES } from '../actions/pageAction'
import dateformat from 'dateformat'

export const Header = ()=>{

  const context = useContext(Context)
  const [cookies, setCookie, removeCookie] = useCookies(["token", "id_user"]);

  const logout = ()=>{
    removeCookie("token")
    removeCookie("id_user")
    context.pageDispatch({type: TYPES.LOGOUT})
  }

  return(
      <div className="header mt-1">
          <div className="card">
            <div className="row">
              <div className="col-md-2">
                <div className='frameHeader'>
                  <span className='helper'>
                    <img id="profilePicture" src={context.pageState.user.pictureUrl ? context.pageState.user.pictureUrl : "https://res.cloudinary.com/lean99/image/upload/v1645893281/Portfolio/DefaultPhoto_eyiivp.png"} alt="profile" className="ms-3 rounded"/>
                  </span>
                </div>
              </div>
              <div className="col-md-10">
                <div className="card-body d-flex">
                  <div className="col-8">
                    <h3 className="card-title">{context.pageState.user.username ? context.pageState.user.username : "Username"}</h3>
                    <p className="card-text fw-light">User Information:</p>
                    <p className="card-text fw-light my-1">Email: { context.pageState.user.email ? context.pageState.user.email : "user@mail.com"}</p>
                    <p className="card-text fw-light">DoB: {context.pageState.user.dob ? dateformat(context.pageState.user.dob, "mmm dd, yyyy") : "--/--/--"}</p>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p><span className="badge rounded-pill bg-dark">{ context.pageState.user.questions ? context.pageState.user.questions.length : "0"}</span> Questions</p>
                      <p><span className="badge rounded-pill bg-dark ms-2">{ context.pageState.user.answers ? context.pageState.user.answers.length : "0" }</span> Answers</p>
                    </div>
                    <div className="d-flex">
                      {
                        context.pageState.isAuthenticated ? (
                          <React.Fragment>
                            <button onClick={logout} className="btn btn-danger btn-sm">Log Out</button>
                            <EditPersonalData/>
                          </React.Fragment>
                        )  : <FormModal component={"header"}/>
                      }
                    </div>    
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
  )
}
import React, { useContext } from 'react'
import { EditPersonalData } from './EditPersonalData'
import { Context } from './Home'
import TimeAgo from 'react-timeago'
import { FormModal } from './FormModal'

export const Header = ()=>{

  const context = useContext(Context)

  return(
      <div className="header mt-1">
          <div className="card">
            <div className="row">
              <div className="col-md-2">
                <div className='frameHeader'>
                  <span className='helper'>
                    <img id="profilePicture" src="https://res.cloudinary.com/lean99/image/upload/v1645893281/Portfolio/DefaultPhoto_eyiivp.png" alt="profile" className="ms-3 rounded"/>
                  </span>
                </div>
              </div>
              <div className="col-md-10">
                <div className="card-body d-flex">
                  <div className="col-8">
                    <h3 className="card-title">{context.pageState.username ? context.pageState.username : "Username"}</h3>
                    <p className="card-text fw-light">User Information:</p>
                    <p className="card-text fw-light my-1">Email: { context.pageState.email ? context.pageState.email : "user@mail.com"}</p>
                    <p className="card-text fw-light">Age: {context.pageState.dob ? <TimeAgo date="1999/22/11"/> : "--/--/--"}</p>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p><span className="badge rounded-pill bg-dark">{ context.pageState.user.questions ? context.pageState.user.questions.length : "0"}</span> Questions</p>
                      <p><span className="badge rounded-pill bg-dark ms-2">{ context.pageState.user.questions ? "0": "0" }</span> Answers</p>
                    </div>
                    <div className="d-flex">
                      {
                        context.pageState.isAuthenticated ? (
                          <React.Fragment>
                            <button className="btn btn-danger btn-sm">Log Out</button>
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
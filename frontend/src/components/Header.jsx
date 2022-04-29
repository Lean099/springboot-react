import { EditPersonalData } from './EditPersonalData'

export const Header = ()=>{
  return(
      <div className="header mt-1">
          <div className="card">
            <div className="row">
              <div className="col-md-2">
                <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="profile" className="img-fluid ms-3" width="120px" height="120px"/>
              </div>
              <div className="col-md-10">
                <div className="card-body d-flex">
                  <div className="col-8">
                    <h3 className="card-title">Username</h3>
                    <p className="card-text">User Information:</p>
                    <p className="card-text">Email: user@mail.com</p>
                    <p className="card-text">Age: 19</p>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p><span className="badge rounded-pill bg-dark">0</span> Questions</p>
                      <p><span className="badge rounded-pill bg-dark ms-2">0</span> Answers</p>
                    </div>
                    <div className="d-flex">
                     <button className="btn btn-danger btn-sm">Log Out</button>
                     <EditPersonalData/>
                    </div>    
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
  )
}
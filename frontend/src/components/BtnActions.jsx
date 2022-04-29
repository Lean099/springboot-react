import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight,  faTrashCan, faPenToSquare, faMessage } from '@fortawesome/free-solid-svg-icons'

export const BtnActions = ({modifyOrCreateAAnswer, valueProperty, makeAQuestion})=>{
  return(
    <div className={"d-flex "+ valueProperty}>
      <div className="ms-2" data-bs-toggle="collapse" data-bs-target={"#"+valueProperty} aria-expanded="false" aria-controls={valueProperty}>
          <button className="btn btn-light btn-sm" style={{height: "24px"}}><FontAwesomeIcon style={{marginBottom: "10px"}} icon={faAngleRight} /></button>
      </div>
      <div className="btn-group collapse collapse-horizontal" role="group" aria-label="Basic example" id={valueProperty} style={{marginTop: "2px"}}>
        <button onClick={modifyOrCreateAAnswer} className="btn btn-primary btn-sm" style={{height: "24px"}}><FontAwesomeIcon style={{marginBottom: "10px"}} icon={faPenToSquare} /></button>
        {
          valueProperty === "collapseQuestBtnActions" && <button onClick={makeAQuestion} className="btn btn-warning btn-sm" style={{height: "24px"}}><FontAwesomeIcon style={{marginBottom: "10px"}} icon={faMessage} /></button>
        }
        <button className="btn btn-danger btn-sm" style={{height: "24px"}}><FontAwesomeIcon style={{marginBottom: "10px"}} icon={faTrashCan} /></button>
      </div>
    </div>
  )
}
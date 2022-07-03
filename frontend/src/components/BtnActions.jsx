import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight,  faTrashCan, faPenToSquare, faMessage } from '@fortawesome/free-solid-svg-icons'

                          // modifyOrCreateAAnswer - makeAQuestion
export const BtnActions = ({edit, createAnswerToQuestion, deleteEntity, propertyValue, id})=>{
  return(
    <div className={"d-flex "+ propertyValue}>
      <div className="ms-2" data-bs-toggle="collapse" data-bs-target={"#"+propertyValue+id} aria-expanded="false" aria-controls={propertyValue+id}>
          <button className="btn btn-light btn-sm" style={{height: "24px"}}><FontAwesomeIcon style={{marginBottom: "10px"}} icon={faAngleRight} /></button>
      </div>
      <div className="btn-group collapse collapse-horizontal" role="group" aria-label="Basic example" id={propertyValue+id} style={{marginTop: "2px"}}>
        {
          edit && <button onClick={edit} className="btn btn-primary btn-sm" style={{height: "24px"}}><FontAwesomeIcon style={{marginBottom: "10px"}} icon={faPenToSquare} /></button>
        }
        {
          (propertyValue === "collapseQuestionBtnActions" && createAnswerToQuestion) && <button onClick={createAnswerToQuestion} className="btn btn-warning btn-sm" style={{height: "24px"}}><FontAwesomeIcon style={{marginBottom: "10px"}} icon={faMessage} /></button>
        }
        {
          deleteEntity && <button onClick={deleteEntity} className="btn btn-danger btn-sm" style={{height: "24px"}}><FontAwesomeIcon style={{marginBottom: "10px"}} icon={faTrashCan} /></button>
        }
      </div>
    </div>
  )
}
import { useState, useContext } from 'react'
import { BtnActions } from './BtnActions'
import { Context } from './Home'

export const Question = (props)=>{

    // Dentro del state question en vez de "" recibiremos el content de la question que me viene por prop de la db
    const [question, setQuestion] = useState(props.question.content)
    const [editQuestion, setEditQuestion] = useState(false)
    const context = useContext(Context)

    const handleChange = (e)=>{
        setQuestion(e.target.value)
    }

    const deleteQuestion = ()=>{

    }

    const submitEdit = ()=>{

    }

    return(
        <div className="d-flex justify-content-between">
            <div className="d-flex">
                {
                    editQuestion ? (
                        <div className="d-flex" style={{width: "750px"}}>
                            <input onChange={handleChange} type="text" className="form-control me-2" name="question" value={question}/>
                            <button onClick={submitEdit} className="btn btn-primary btn-sm">Edit</button>
                        </div>
                    ) 
                    : 
                    <p className="h5">{props.question.content}</p>
                }
                {/* Aqui va el componente con los botones de accion */}
                {
                    context.pageState.isAuthenticated && (props.idUserLogged===props.question.idUserQuestion ? 
                        props.question.answer!==null ?
                            <BtnActions edit={()=>setEditQuestion(!editQuestion)} deleteEntity={deleteQuestion} propertyValue={"collapseQuestionBtnActions"} id={props.question.id}/>
                            :
                            // Por aca pasar el id de la question a la funcion createAnswer, comento el createAnswerToQuestion ya que no tiene sentido crear una respuesta para mi propia pregunta
                            <BtnActions edit={()=>setEditQuestion(!editQuestion)} /*createAnswerToQuestion={()=>props.createAnswer(props.question.id)}*/ deleteEntity={deleteQuestion} propertyValue={"collapseQuestionBtnActions"} id={props.question.id}/>
                        :
                        !props.question.answer && ( <BtnActions createAnswerToQuestion={()=>props.createAnswer(props.question.id)} propertyValue={"collapseQuestionBtnActions"} id={props.question.id}/> )
                        )
                }
                
            </div>
            <p className="fw-light">- {props.question.username}</p>
        </div>
    )
}
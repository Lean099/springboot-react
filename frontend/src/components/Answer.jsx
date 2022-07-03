import { useState, useContext } from "react"
import { BtnActions } from './BtnActions'
import { Context } from './Home'

export const Answer = (props)=>{

    /* Este componente va a recibir por props dos cosas una el id de la question que servira al momento de querer
    crear una answer para esa question, segundo un boleano para saber si el */
    const [answer, setAnswer] = useState(props.answer.content)
    const [editAnswer, setEditAnswer] = useState(false)
    const context = useContext(Context)

    const handleChange = (e)=>{
        setAnswer(e.target.value)
    }

    const deleteAnswer = ()=>{

    }

    const submitEdit = ()=>{

    }

    return(
        <div className="d-flex justify-content-between">
            <div className="d-flex">
                {
                    editAnswer ? (
                        <div className="d-flex" style={{width: "750px"}}>
                            <input type="text" onChange={handleChange} className="form-control me-2" value={answer}/>
                            <button onClick={submitEdit} className="btn btn-primary btn-sm">Edit</button>
                        </div>
                    ) 
                    :
                    <p className="lead">{props.answer.content}</p> 
                }
                {/* Aqui va el componente con los botones de accion */}
                {
                    (context.pageState.isAuthenticated&&props.idUserLogged===props.answer.idUserAnswer) && (
                        <BtnActions edit={()=>setEditAnswer(!editAnswer)} deleteEntity={deleteAnswer} propertyValue={"collapseAnswerBtnActions"} id={props.answer.id}/>
                    )
                }
                
            </div>
            <p className="fw-light">- {props.answer.username}</p>
        </div>
    )
}
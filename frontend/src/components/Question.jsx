import axios from 'axios'
import { useState, useContext } from 'react'
import { TYPES } from '../actions/pageAction'
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
        axios({
            method: 'delete',
            url: `${import.meta.env.VITE_API_DOMAIN}/api/question/${props.question.id}`,
            headers:{
                'Authorization': `Bearer ${props.token}`
            },
            data:{}
        }) // simplemente retorna un string -> Question deleted con status 200, me imagino que sera lo mismo para las answer
        .then(res => context.pageDispatch({type: TYPES.DELETE_QUESTION, payload: props.question.id}))
        .catch(error => console.log(error))
    }

    const submitEdit = ()=>{
        const content = JSON.stringify({
            "content": question
        })
        axios({
            method: 'post',
            url: `${import.meta.env.VITE_API_DOMAIN}/api/question/${props.question.id}`,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            },
            data: content
        }) // El res.data retorna un objeto {} dentro las props id, idUserQuestion, content, etc..
        .then(res => {
            context.pageDispatch({type: TYPES.UPDATE_QUESTION, payload: res.data})
            setEditQuestion(!editQuestion)
        })
        .catch(error => console.log(error))
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
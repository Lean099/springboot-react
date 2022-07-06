import axios from "axios"
import { useState, useContext } from "react"
import { TYPES } from "../actions/pageAction"
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
        axios({
            method: 'delete',
            url: `${import.meta.env.VITE_API_DOMAIN}/api/answer/${props.answer.id}`,
            headers:{
                'Authorization': `Bearer ${props.token}`
            },
            data:{}
        })
        .then(res => context.pageDispatch({type: TYPES.DELETE_ANSWER, payload: props.answer}))
        .catch(error => console.log(error))
    }

    const submitEdit = ()=>{
        const content = JSON.stringify({
            "content": answer
        })
        axios({
            method: 'post',
            url: `${import.meta.env.VITE_API_DOMAIN}/api/answer/${props.answer.id}`,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            },
            data: content
        })
        .then(res => {
            context.pageDispatch({type: TYPES.UPDATE_ANSWER , payload: res.data})
            setEditAnswer(!editAnswer)
        })
        .catch(error => console.log(error))
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
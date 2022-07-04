import { useState, useContext, useEffect } from 'react'
import { BtnActions } from './BtnActions'
import { Context } from './Home'
import axios from 'axios'
import { TYPES } from '../actions/pageAction'
import { Question } from './Question'
import { Answer } from './Answer'
import { useCookies } from "react-cookie";

export const QuestionsAndAnswers = ()=>{

  const context = useContext(Context)
  const [cookies, setCookie, removeCookie] = useCookies(["token", "id_user"]);
  const [createAnswer, setCreateAnswer] = useState({idQuestion: "", create: false})
  const [newAnswer, setNewAnswer] = useState("")

  useEffect(()=>{
    fetchData()
  }, [])

  const fetchData = ()=>{
    axios.get(`${import.meta.env.VITE_API_DOMAIN}/api/question/`)
    .then(res => {
      context.pageDispatch({type: TYPES.ADD_QUESTIONS_ANSWERS, payload: res.data})
    })
    .catch(err => console.log(err))
  }

  const handleNewAnswer = (e)=>{
    setNewAnswer(e.target.value)
  }

  const submitAnswer = ()=>{

    // Al crear la nueva answer no olvidar de extraer el id del usuario logeado de la cookie o contexto
  }

  console.log(context.pageState)
  console.log(createAnswer)
  return(
    <div className="mt-2">
      <hr />

      {
        context.pageState.allQuestionsAndAnswers && (
          context.pageState.allQuestionsAndAnswers.map(question => {
            return(
              <div key={question.id}>

                <Question question={question} createAnswer={ (id)=>setCreateAnswer((prev) => ({idQuestion: id, create: !prev.create})) } idUserLogged={cookies.id_user}/>
                {
          // La propiedad answer existe en question, pero si no tiene un objeto con los datos de la answer tendra un null
                  question.answer ? 
                    <Answer answer={question.answer} idUserLogged={cookies.id_user}/>
                  :
                  (createAnswer.create && question.id==createAnswer.idQuestion) && (
                    <div className="d-flex" style={{width: "750px"}}>
                      <input type="text" onChange={handleNewAnswer} className="form-control me-2" name="newAnswer" value={newAnswer}/>
                      <button onClick={submitAnswer} className="btn btn-primary btn-sm">Send</button>
                    </div>
                  )
                }
                
                <hr />
              </div>
            )
          })
          
        )
      }

    </div>
  )
}
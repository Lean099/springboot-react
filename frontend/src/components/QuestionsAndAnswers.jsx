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
  const [hasQuestion, setHasQuestion] = useState(false)
  const [mod, setMod] = useState(false)
  const [ans, setAns] = useState(false)

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

  const editQuestion = ()=>{
    if(mod){
      setMod(false)
    }else{
      setMod(true)
    }
  }

  const editAnswer = ()=>{
    if(ans){
      setAns(false)
    }else{
      setAns(true)
    }
  }

  const makeAQuestion = ()=>{
    if(hasQuestion){
      setHasQuestion(false)
    }else{
      setHasQuestion(true)
    }
  }

  console.log(context.pageState)
  console.log(createAnswer)
  return(
    <div className="mt-2">
      <hr />

      {/* Una pregunta con respuesta */}
      <div className="">
        <div className="d-flex justify-content-between">
          <p className="h5">¿Cuantos años tiene Carlos?</p> 
          <p className="fw-light">- Camila</p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="lead">Tengo 19 años</p>
          <p className="fw-light">- Carlos</p>
        </div>
        
        <hr/>
      </div>

    {/* Una pregunta sin respuesta */}
      <div className="">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            { mod ? (
              <div className="d-flex" style={{width: "750px"}}>
                <input type="text" className="form-control me-2" value="¿Cual es el apellido de Carlos?"/>
                <button onClick={editQuestion} className="btn btn-primary btn-sm">Edit</button>
              </div> ) 
              : 
              <p className="h5">¿Cual es el apellido de Carlos?</p> 
              }
            <BtnActions modifyOrCreateAAnswer={editQuestion} valueProperty={"collapseQuestBtnActions"} makeAQuestion={makeAQuestion}/>
          </div>
          <p className="fw-light">- Juan</p>
          
        </div>

              { /* ANSWER */ }
        {
          hasQuestion ? (
            <div className="d-flex justify-content-between">
              <input className="form-control" type="text" value="Su apellido es Ramirez"/>
              <button onClick={makeAQuestion} className="btn btn-primary ms-2">Ask</button> 
            </div>
          ) : // Aca podemos hacer un codicional si la question tiene answer muestre el comp asnwers sino un input
          <div className="d-flex justify-content-between">
              <div className="d-flex">
                {
                  ans ? (
                    <div className="d-flex" style={{width: "750px"}}>
                      <input type="text" className="form-control me-2" value="Su apellido es Ramirez"/>
                      <button onClick={editAnswer} className="btn btn-primary btn-sm">Edit</button>
                    </div> )
                    :
                    <p className="lead">Su apellido es Ramirez</p> 
                }
                <BtnActions modifyOrCreateAAnswer={editAnswer} valueProperty={"collapseAnsBtnActions"}/>
              </div>
              <p className="fw-light">- Martin</p>
          </div>
        }    
        
        <hr/>
      </div>

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
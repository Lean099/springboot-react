import { useState } from 'react'
import { BtnActions } from './BtnActions'

export const QuestionsAndAnswers = ()=>{

  const [question, setQuestion] = useState(false)
  const [mod, setMod] = useState(false)
  const [ans, setAns] = useState(false)

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
    if(question){
      setQuestion(false)
    }else{
      setQuestion(true)
    }
  }

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

        {
          question ? (
            <div className="d-flex justify-content-between">
              <input className="form-control" type="text" value="Su apellido es Ramirez"/>
              <button onClick={makeAQuestion} className="btn btn-primary ms-2">Ask</button> 
            </div>
          ) : 
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

    </div>
  )
}
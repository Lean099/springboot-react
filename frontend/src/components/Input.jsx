import { useContext, useState } from 'react'
import { Context } from './Home'
import { FormModal } from './FormModal'
import axios from 'axios'
import { useCookies } from "react-cookie";
import { TYPES } from '../actions/pageAction';

export const Input = ()=>{

    const context = useContext(Context)
    const [newQuestion, setNewQuestion] = useState("")
    const [cookies, setCookie, removeCookie] = useCookies(["token", "id_user"]);

    const handleChange = (e)=>{
      setNewQuestion(e.target.value)
    }

    const submitQuestion = ()=>{
      const question = JSON.stringify({
        "content": newQuestion
      })
      axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_DOMAIN}/api/question/create/userId/${cookies.id_user}`,
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.token}`
        },
        data: question
      })
      .then(res => {
        context.pageDispatch({type: TYPES.NEW_QUESTION, payload: res.data})
        setNewQuestion("")
      })
      .catch(error => console.log(error))
    }

    return(
      <div className="mt-2">
        <textarea type="text" onChange={handleChange} className="form-control" value={newQuestion}/>
        {
          context.pageState.isAuthenticated ? 
                <button onClick={submitQuestion} className="btn btn-dark btn-sm mt-2">Ask</button> 
                :
                <FormModal/>
        }
      </div>
    )
}
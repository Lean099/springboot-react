import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { Context } from './Home'
import { TYPES } from '../actions/pageAction'
import { useCookies } from "react-cookie";
import axios from 'axios'


export const SortQA = ()=>{

  const context = useContext(Context)
  const [cookies, setCookie, removeCookie] = useCookies(["token", "id_user"]);

  const fetchAllQuestions = ()=>{
    axios.get(`${import.meta.env.VITE_API_DOMAIN}/api/question/`)
    .then(res => {
      context.pageDispatch({type: TYPES.ALL_QUESTIONS, payload: res.data})
    })
    .catch(err => console.log(err))
  }

  const fetchMyQuestions = ()=>{
    const idUser = JSON.stringify({
      "id": cookies.id_user
    })
    axios({
      method:'post',
      url: `${import.meta.env.VITE_API_DOMAIN}/api/question/findAllByIdUserQuestion/`,
      headers: {
        'Authorization': `Bearer ${cookies.token}`,
        'Content-Type': 'application/json'
      },
      data: idUser
    })
    .then(res => context.pageDispatch({type: TYPES.MY_QUESTIONS, payload: res.data}))
    .catch(error => console.log(error))
  }

  const fetchMyAnswers = ()=>{
    const idUser = JSON.stringify({
      "id": cookies.id_user
    })
    axios({
      method:'post',
      url: `${import.meta.env.VITE_API_DOMAIN}/api/question/findAllQuestionsRelatedToAnswers/`,
      data: idUser,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.token}`
      }
    })
    .then(res => context.pageDispatch({type: TYPES.MY_ANSWERS, payload: res.data}))
    .catch(error => console.log(error))
  }

  return(
    <div className="d-flex justify-content-end">
      <div class="btn-group mt-2 dropstart">
        <button class="btn btn-dark btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <FontAwesomeIcon icon={faFilter} className="me-1" />Sort
        </button>
        <ul class="dropdown-menu">
          <li><button onClick={fetchAllQuestions} class="dropdown-item">All</button></li>
          <li><button onClick={fetchMyQuestions} class="dropdown-item">My questions</button></li>
          <li><button onClick={fetchMyAnswers} class="dropdown-item">My answers</button></li>
        </ul>
      </div>
    </div>
  )
}
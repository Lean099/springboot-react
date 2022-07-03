import React, { useState, useReducer, useEffect } from 'react'
import { Header } from './Header'
import { Input } from './Input'
import { QuestionsAndAnswers } from './QuestionsAndAnswers'
import { SortQA } from './SortQA'
import { useCookies } from "react-cookie";
import axios from 'axios'
import { TYPES } from '../actions/pageAction'

import { initialState, pageReducer } from '../reducers/pageReducer'
export const Context = React.createContext()


export const Home = ()=>{

  const [state, dispatch] = useReducer(pageReducer, initialState)
  const [cookies, setCookie, removeCookie] = useCookies(["token", "id_user"]);

  useEffect(()=>{
    if(cookies?.token && cookies?.id_user && state.isAuthenticated===false){
      console.log("Dentro del useEffect")
      const response = axios({
        method: "get",
        url: `${import.meta.env.VITE_API_DOMAIN}/api/user/${cookies?.id_user}`,
        headers: { 'Authorization': `Bearer ${cookies?.token}` }
    })
    response.then(res => {
      dispatch({ type: TYPES.LOGIN, payload: res.data })
    })
    }
  }, [])

  return(
    <Context.Provider value={{ pageState: state, pageDispatch: dispatch }}>
      <div class="container" style={{maxWidth: "1000px"}}>
          <Header/>
          <Input/>
          <SortQA/>
          <QuestionsAndAnswers/>
      </div>
    </Context.Provider> 
  )
}
import React, { useState, useReducer, useEffect } from 'react'
import { Header } from './Header'
import { Input } from './Input'
import { QuestionsAndAnswers } from './QuestionsAndAnswers'
import { SortQA } from './SortQA'

import { initialState, pageReducer } from '../reducers/pageReducer'
export const Context = React.createContext()


export const Home = ()=>{

  const [state, dispatch] = useReducer(pageReducer, initialState)

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
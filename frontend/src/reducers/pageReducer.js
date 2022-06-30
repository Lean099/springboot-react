import { TYPES } from '../actions/pageAction'

export const initialState = {
    isAuthenticated: false,
    user: {
      id: "",
      username: "",
      email: "",
      token: ""
    },
    allQuestionsAndAnswers: null
}
  
export function pageReducer(state, action){
    switch(action.type){
      case TYPES.ADD_QUESTIONS_ANSWERS:{
        return {...state, allQuestionsAndAnswers: action.payload}
      }
      case TYPES.LOGIN:{
        return {...state, isAuthenticated: true, user: {...user, id: action.payload.id_user, token: action.payload.access_token}}
      }
      default:
        return state
    }
}
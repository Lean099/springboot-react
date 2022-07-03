import { TYPES } from '../actions/pageAction'

export const initialState = {
    isAuthenticated: false,
    user: {
      id: null,
      username: null,
      dob: null,
      email: null,
      pictureUrl: null,
      picturePublicId: null,
      questions: null
    },
    allQuestionsAndAnswers: null
}
  
export function pageReducer(state, action){
    switch(action.type){
      case TYPES.ADD_QUESTIONS_ANSWERS:{
        return {...state, allQuestionsAndAnswers: action.payload}
      }
      case TYPES.LOGIN:{
        return {...state, isAuthenticated: true, user: {
          id: action.payload.id,
          username: action.payload.username,
          dob: action.payload.dob,
          email: action.payload.email,
          pictureUrl: action.payload.pictureUrl,
          picturePublicId: action.payload.picturePublicId,
          questions: action.payload.questionsList
        }}
      }
      default:
        return state
    }
}
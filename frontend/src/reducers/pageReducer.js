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
    allQuestionsAndAnswers: null,
    order: 'all'
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
      case TYPES.ALL_QUESTIONS:{
        return {...state, allQuestionsAndAnswers: action.payload, order: 'all'}
      }
      case TYPES.MY_QUESTIONS:{
        return {...state, allQuestionsAndAnswers: action.payload, order: 'my_questions'}
      }
      case TYPES.MY_ANSWERS:{
        return {...state, allQuestionsAndAnswers: action.payload, order: 'my_answers'}
      }
      default:
        return state
    }
}
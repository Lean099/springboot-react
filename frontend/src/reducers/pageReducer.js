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
      questions: null,
      answers: null
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
          questions: action.payload.questionsList,
          answers: action.payload.answersList
        }}
      }
      case TYPES.LOGOUT:{
        return {...state, isAuthenticated: false, user: initialState.user}
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
      case TYPES.NEW_QUESTION:{
        return {...state, allQuestionsAndAnswers: [...state.allQuestionsAndAnswers, action.payload]}
      }
      case TYPES.NEW_ANSWER:{
        let index = state.allQuestionsAndAnswers.findIndex(q => q.id===action.payload.idQuestion)
        if(index!==-1){
          let newAnswerInArr = [...state.allQuestionsAndAnswers]
          newAnswerInArr[index].answer=action.payload
          return {...state, allQuestionsAndAnswers: newAnswerInArr}
        }else{
          return {...state}
        } 
      }
      case TYPES.UPDATE_QUESTION:{
        let index = state.allQuestionsAndAnswers.findIndex(q => q.id===action.payload.id)
        if(index!==-1){
          let newArr = [...state.allQuestionsAndAnswers]
          newArr[index].content = action.payload.content
          return {...state, allQuestionsAndAnswers: newArr}
        }else{
          return {...state}
        }
      }
      case TYPES.DELETE_QUESTION:{
        let index = state.allQuestionsAndAnswers.findIndex(q => q.id===action.payload)
        if(index!==-1){
          return {...state, allQuestionsAndAnswers: state.allQuestionsAndAnswers.filter(question => question.id!==action.payload)}
        }else{
          return {...state}
        }
      }
      case TYPES.UPDATE_ANSWER:{
        let index = state.allQuestionsAndAnswers.findIndex(q => q.id===action.payload.idQuestion)
        if(index!==-1){
          let newArr = [...state.allQuestionsAndAnswers]
          newArr[index].answer = action.payload
          return {...state, allQuestionsAndAnswers: newArr}
        }else{
          return {...state}
        }
      }
      case TYPES.DELETE_ANSWER:{
        let index = state.allQuestionsAndAnswers.findIndex(q => q.id===action.payload.idQuestion)
        if(index!==-1){
          let newArr = [...state.allQuestionsAndAnswers]
          newArr[index].answer = null
          return {...state, allQuestionsAndAnswers: newArr}
        }else{
          return {...state}
        }
      }
      case TYPES.UPDATE_USERNAME_DOB:{
        let newUserData = {
          ...state.user,
          username: action.payload.username ? action.payload.username : null,
          dob: action.payload.dob ? action.payload.dob : null
        }
        return {...state, user: newUserData}
      }
      case TYPES.UPDATE_EMAIL:{
        let newUserData = {
          ...state.user,
          email: action.payload.email ? action.payload.email : null
        }
        return {...state, user: newUserData}
      }
      case TYPES.UPDATE_PICTURE_URL:{
        let newUserData = {
          ...state.user,
          pictureUrl: action.payload ? action.payload : null
        }
        return {...state, user: newUserData}
      }
      default:
        return state
    }
}
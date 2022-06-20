import { TYPES } from '../actions/pageAction'

export const initialState = {
    isAuthenticated: false,
    cookie: ""
}
  
export function pageReducer(state, action){
    switch(action.type){
      case TYPES.EXAMPLE:{
        // Hace algo
      }
      case TYPES.EXAMPLE2:{
        // Hace algo
      }
      default:
        return state
    }
}
import {
  HANDLE_USER
} from '../actions/types'

const initialState = {
  userInfo: null
}

export default (state = initialState, action) => {
  switch (action.type) {

    case HANDLE_USER:
      return {
        ...state,
        userInfo: action.payload
      }

    default:
      return state
  }
}
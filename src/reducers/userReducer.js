import {
  HANDLE_USER,
  PUSH_DATA_BEGIN,
  PUSH_DATA_SUCCESS,
  PUSH_DATA_ERROR
} from '../actions/types'

const initialState = {
  userInfo: JSON.parse(localStorage.getItem('authUser')),
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {

    case HANDLE_USER:
      return {
        ...state,
        userInfo: action.payload
      }

    case PUSH_DATA_BEGIN:
      return {
        ...state,
        loading: true
      }

    case PUSH_DATA_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case PUSH_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}
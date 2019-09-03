import { 
  OPEN_LIST_MODAL, 
  CLOSE_LIST_MODAL 
} from '../actions/types'

const initialState = {
  modalOpen: false
}

export default (state = initialState, action) => {
  switch(action.type) {

    case OPEN_LIST_MODAL:
      return {
        ...state,
        modalOpen: true
      }
    
    case CLOSE_LIST_MODAL:
    return {
      ...state,
      modalOpen: false
    }

    default:
      return state
  }
}
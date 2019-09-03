import {
  OPEN_LIST_MODAL,
  CLOSE_LIST_MODAL,
  CHANGE_LIST_MODAL_NAME,
  RESET_LIST_MODAL_NAME,
  ADD_NEW_LIST
} from '../actions/types'

const initialState = {
  modalOpen: false,
  nameInput: '',
  allLists: [{name: 'sandbox', createdAt: 1}]
}

export default (state = initialState, action) => {
  switch (action.type) {

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

    case CHANGE_LIST_MODAL_NAME:
      return {
        ...state,
        nameInput: action.payload
      }

    case RESET_LIST_MODAL_NAME:
      return {
        ...state,
        nameInput: initialState.nameInput
      }

    case ADD_NEW_LIST:
      return {
        ...state,
        allLists: [
          ...state.allLists,
          {
            name: state.nameInput,
            createdAt: new Date()
          }
        ]
      }

    default:
      return state
  }
}
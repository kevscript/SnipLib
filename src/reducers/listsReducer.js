import {
  OPEN_LIST_MODAL,
  CLOSE_LIST_MODAL,
  CHANGE_LIST_MODAL_NAME,
  RESET_LIST_MODAL_NAME,
  ADD_NEW_LIST,
  SET_SELECTED_LIST
} from '../actions/types'

const initialState = {
  modalOpen: false,
  nameInput: '',
  allLists: [{name: 'sandbox', createdAt: Date.now(), selected: true}]
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
      const selected = state.allLists.findIndex(x => x.selected === true)
      state.allLists[selected] = {...state.allLists[selected], selected: false }

      return {
        ...state,
        allLists: [
          ...state.allLists,
          {
            name: state.nameInput,
            createdAt: Date.now(),
            selected: true
          }
        ]
      }

    case SET_SELECTED_LIST:
      const oldSelected = state.allLists.findIndex(x => x.selected === true)
      state.allLists[oldSelected] = {...state.allLists[oldSelected], selected: false }
      const newSelected = state.allLists.findIndex(x => x.createdAt === action.payload)
      state.allLists[newSelected] = {...state.allLists[newSelected], selected: true }

      return {
        ...state
      }

    default:
      return state
  }
}
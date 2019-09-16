import {
  OPEN_LIST_MODAL,
  CLOSE_LIST_MODAL,
  CHANGE_LIST_MODAL_NAME,
  RESET_LIST_MODAL_NAME,
  ADD_NEW_LIST,
  DELETE_LIST,
  SET_SELECTED_LIST,
  HANDLE_ERROR,
  RESET_ERROR,
  EDIT_LIST,
  SET_EDIT_LIST
} from '../actions/types'

const initialState = {
  error: '',
  modalOpen: false,
  editMode: false,
  nameInput: '',
  allLists: [{ name: 'sandbox', createdAt: Date.now(), selected: true }]
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
      state.allLists[selected] = { ...state.allLists[selected], selected: false }

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

    case SET_EDIT_LIST:
      return {
        ...state,
        editMode: true,
        nameInput: action.payload
      }

    case EDIT_LIST:
      const newList = [...state.allLists]
      let selectedListIndex = newList.findIndex(x => x.selected === true)

      newList[selectedListIndex] = {
        ...newList[selectedListIndex],
        name: state.nameInput
      }

      return {
        ...state,
        editMode: false,
        allLists: [...newList]
      }

    case DELETE_LIST:
      const newLists = state.allLists.filter(x => x.selected !== true)

      return {
        ...state,
        allLists: [...newLists]
      }

    case SET_SELECTED_LIST:
      const oldSelected = state.allLists.findIndex(x => x.selected === true)
      state.allLists[oldSelected] = { ...state.allLists[oldSelected], selected: false }
      const newSelected = state.allLists.findIndex(x => x.createdAt === action.payload)
      state.allLists[newSelected] = { ...state.allLists[newSelected], selected: true }

      return {
        ...state
      }

    case HANDLE_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case RESET_ERROR:
      return {
        ...state,
        error: ''
      }

    default:
      return state
  }
}
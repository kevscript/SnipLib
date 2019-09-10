import {
  CHANGE_SNIPPET_NAME,
  CHANGE_SNIPPET_LIST,
  CHANGE_SNIPPET_CODE,
  CHANGE_SNIPPET_SYNTAX,
  ADD_NEW_SNIPPET,
  SET_SELECTED_SNIPPET,
  SET_VIEW_MODE,
  RESET_SNIPPET_INPUTS,
  HANDLE_ERROR
} from '../actions/types'

const initialState = {
  error: '',
  viewMode: '',
  nameInput: '',
  syntaxInput: '',
  codeInput: '',
  parentId: null,
  allSnippets: [],
}

export default (state = initialState, action) => {
  switch (action.type) {

    case SET_VIEW_MODE:
      return {
        ...state,
        viewMode: action.payload
      }

    case CHANGE_SNIPPET_NAME:
      return {
        ...state,
        nameInput: action.payload
      }

    case CHANGE_SNIPPET_LIST:
      return {
        ...state,
        parentId: parseInt(action.payload)
      }

    case CHANGE_SNIPPET_CODE:
      return {
        ...state,
        codeInput: action.payload
      }

    case CHANGE_SNIPPET_SYNTAX:
      return {
        ...state,
        syntaxInput: action.payload
      }

    case ADD_NEW_SNIPPET:
      const selected = state.allSnippets.findIndex(x => x.selected === true)
      state.allSnippets[selected] = { ...state.allSnippets[selected], selected: false }

      return {
        ...state,
        allSnippets: [
          ...state.allSnippets,
          {
            selected: false,
            name: state.nameInput,
            syntax: state.syntax,
            parentId: state.parentId,
            code: state.codeInput,
            createdAt: Date.now()
          }
        ]
      }

    case SET_SELECTED_SNIPPET:
      const newState = { ...state }
      const oldSelected = newState.allSnippets.findIndex(x => x.selected === true)
      newState.allSnippets[oldSelected] = {
        ...newState.allSnippets[oldSelected], selected: false
      }

      const newSelected = newState.allSnippets.findIndex(x => x.createdAt === action.payload)
      newState.allSnippets[newSelected] = { ...newState.allSnippets[newSelected], selected: true }

      return {
        ...newState
      }

    case RESET_SNIPPET_INPUTS:
      return {
        ...state,
        nameInput: '',
        syntaxInput: '',
        codeInput: '',
        parentId: '',
      }

    case HANDLE_ERROR:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

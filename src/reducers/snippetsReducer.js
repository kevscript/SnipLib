import {
  CHANGE_SNIPPET_NAME,
  CHANGE_SNIPPET_LIST,
  CHANGE_SNIPPET_CODE,
  CHANGE_SNIPPET_SYNTAX,
  ADD_NEW_SNIPPET,
  SET_SELECTED_SNIPPET,
  SET_VIEW_MODE,
  RESET_SNIPPET_INPUTS,
  HANDLE_ERROR,
  DELETE_LIST,
  RESET_ERROR,
  DELETE_SNIPPET,
  EDIT_SNIPPET,
  SET_EDIT_MODE
} from '../actions/types'

const initialState = {
  error: '',
  viewMode: '',
  nameInput: '',
  syntaxInput: '',
  codeInput: '',
  parentId: '',
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
            selected: true,
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

    case RESET_ERROR:
      return {
        ...state,
        error: ''
      }

    case DELETE_LIST:
      const newSnippets = state.allSnippets.filter(x => x.parentId !== action.payload)

      return {
        ...state,
        allSnippets: [...newSnippets]
      }

    case DELETE_SNIPPET:
      const newSnips = state.allSnippets.filter(x => x.selected !== true)

      return {
        ...state,
        allSnippets: [...newSnips]
      }

    case SET_EDIT_MODE:
      return {
        ...state,
        nameInput: action.payload.name,
        codeInput: action.payload.code,
        parentId: action.payload.parentId
      }

    case EDIT_SNIPPET:
      const newSnipps = [...state.allSnippets]
      const selectedSnipp = newSnipps.find(x => x.selected === true)

      return {
        ...state
      }

    default:
      return state
  }
}

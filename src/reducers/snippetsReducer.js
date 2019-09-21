import {
  CHANGE_SNIPPET_NAME,
  CHANGE_SNIPPET_LIST,
  CHANGE_SNIPPET_CODE,
  CHANGE_SNIPPET_LANGUAGE,
  ADD_NEW_SNIPPET,
  SET_SELECTED_SNIPPET,
  SET_VIEW_MODE,
  RESET_SNIPPET_INPUTS,
  HANDLE_ERROR,
  DELETE_LIST,
  RESET_ERROR,
  DELETE_SNIPPET,
  EDIT_SNIPPET,
  SET_EDIT_MODE,
  GET_DATA_SUCCESS
} from '../actions/types'

const initialState = {
  error: '',
  viewMode: '',
  nameInput: '',
  languageInput: '',
  codeInput: '',
  parentId: '',
  allSnippets: [],
  allLanguages: ['javascript', 'css', 'xml', 'markdown', 'php', 'python', 'ruby', 'clike']
}

export default (state = initialState, action) => {
  switch (action.type) {

    case GET_DATA_SUCCESS:
      return {
        ...state,
        allSnippets: action.payload.snippets ? action.payload.snippets : []
      }

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

    case CHANGE_SNIPPET_LANGUAGE:
      return {
        ...state,
        languageInput: action.payload
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
            language: state.languageInput,
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
        languageInput: '',
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
        languageInput: action.payload.language,
        parentId: action.payload.parentId
      }

    case EDIT_SNIPPET:
      const newSnipps = [...state.allSnippets]
      let selectedSnipIndex = newSnipps.findIndex(x => x.selected === true)
      
      newSnipps[selectedSnipIndex] = {
        ...newSnipps[selectedSnipIndex],
        name: state.nameInput,
        parentId: state.parentId,
        language: state.languageInput,
        code: state.codeInput
      }

      return {
        ...state,
        allSnippets: [...newSnipps]
      }

    default:
      return state
  }
}
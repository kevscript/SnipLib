import {
  OPEN_LIST_MODAL,
  CLOSE_LIST_MODAL,
  CHANGE_LIST_MODAL_NAME,
  RESET_LIST_MODAL_NAME,
  ADD_NEW_LIST,
  SET_SELECTED_LIST,
  CHANGE_SNIPPET_NAME,
  CHANGE_SNIPPET_SYNTAX,
  CHANGE_SNIPPET_CODE,
  SET_VIEW_MODE,
  ADD_NEW_SNIPPET,
  CHANGE_SNIPPET_LIST,
  RESET_SNIPPET_INPUTS,
  HANDLE_ERROR
} from './types'

export const openListModal = () => ({
  type: OPEN_LIST_MODAL
})

export const closeListModal = () => ({
  type: CLOSE_LIST_MODAL
})

export const changeListModalName = (value) => ({
  type: CHANGE_LIST_MODAL_NAME,
  payload: value
})

export const resetListModalName = () => ({
  type: RESET_LIST_MODAL_NAME
})

export const addNewList = () => ({
  type: ADD_NEW_LIST
})

export const setSelectedList = (id) => ({
  type: SET_SELECTED_LIST,
  payload: id
})

//////////////////////////////////////////////////////////////////

export const changeSnippetName = (value) => ({
  type: CHANGE_SNIPPET_NAME,
  payload: value
})

export const changeSnippetCode = (value) => ({
  type: CHANGE_SNIPPET_CODE,
  payload: value
})

export const setViewMode = (value) => ({
  type: SET_VIEW_MODE,
  payload: value
})

export const addNewSnippet = () => {
  return (dispatch, getState) => {
    const snippets = getState().snippets
    const { parentId, codeInput, nameInput } = snippets

    if (codeInput.trim() === '') {
      return dispatch(handleError('Your snippet is empty'))
    }

    if (nameInput.trim() === '') {
      return dispatch(handleError('Add a title for your snippet'))
    }

    if (parentId === null) {
      return dispatch(handleError('Select a valid parent list'))
    }

    else {
      dispatch({ type: ADD_NEW_SNIPPET })
      dispatch(setViewMode(''))
      dispatch(resetSnippetInputs())
    }
  }
  
}

export const changeSnippetList = (id) => ({
  type: CHANGE_SNIPPET_LIST,
  payload: id
})

export const changeSnippetSyntax = (value) => ({
  type: CHANGE_SNIPPET_SYNTAX,
  payload: value
})

export const resetSnippetInputs = () => ({
  type: RESET_SNIPPET_INPUTS
})

export const handleError = (message) => ({
  type: HANDLE_ERROR,
  payload: message
})
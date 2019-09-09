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
  RESET_SNIPPET_INPUTS
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

export const addNewSnippet = () => ({
  type: ADD_NEW_SNIPPET
})

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
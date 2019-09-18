import {
  OPEN_LIST_MODAL,
  CLOSE_LIST_MODAL,
  CHANGE_LIST_MODAL_NAME,
  RESET_LIST_MODAL_NAME,
  ADD_NEW_LIST,
  DELETE_LIST,
  EDIT_LIST,
  SET_EDIT_LIST,
  SET_SELECTED_LIST,
  CHANGE_SNIPPET_NAME,
  CHANGE_SNIPPET_LANGUAGE,
  CHANGE_SNIPPET_CODE,
  SET_VIEW_MODE,
  ADD_NEW_SNIPPET,
  CHANGE_SNIPPET_LIST,
  RESET_SNIPPET_INPUTS,
  HANDLE_ERROR,
  RESET_ERROR,
  SET_SELECTED_SNIPPET,
  DELETE_SNIPPET,
  EDIT_SNIPPET,
  SET_EDIT_MODE
} from './types'


// HANDLE LIST MODAL
export const openListModal = () => ({
  type: OPEN_LIST_MODAL
})

export const closeListModal = () => {
  return (dispatch) => {
    dispatch({ type: CLOSE_LIST_MODAL })
    dispatch(resetError())
    dispatch(resetListModalName())
  }
}

export const changeListModalName = (value) => ({
  type: CHANGE_LIST_MODAL_NAME,
  payload: value
})

export const resetListModalName = () => ({
  type: RESET_LIST_MODAL_NAME
})


// HANDLE LISTS
export const setEditList = () => {
  return (dispatch, getState) => {
    const selectedList = {...getState().lists.allLists.find(x => x.selected === true)}
    dispatch({ type: SET_EDIT_LIST, payload: selectedList.name })
    dispatch(openListModal())
  }
}

export const editList = () => {
  return (dispatch) => {
    dispatch({ type: EDIT_LIST })
    dispatch(closeListModal())
  }
}

export const addNewList = () => {
  return (dispatch, getState) => {
    const nameInput = getState().lists.nameInput

    if(nameInput.trim() === '') {
      return dispatch(handleError('Name is empty or not valid'))
    }

    dispatch({type: ADD_NEW_LIST})
    dispatch(closeListModal())
  }
}

export const deleteList = () => {
  return (dispatch, getState) => {
    const selectedList = getState().lists.allLists.find(x => x.selected === true)
    const listId = selectedList.createdAt

    dispatch({
      type: DELETE_LIST,
      payload: listId
    })
  }
}

export const setSelectedList = (id) => ({
  type: SET_SELECTED_LIST,
  payload: id
})


// HANDLE SNIPPETS
export const setSelectedSnippet = (id) => ({
  type: SET_SELECTED_SNIPPET,
  payload: id
})

export const setViewMode = (value) => ({
  type: SET_VIEW_MODE,
  payload: value
})

export const addNewSnippet = () => {
  return (dispatch, getState) => {
    const snippets = getState().snippets
    const { parentId, codeInput, nameInput, languageInput } = snippets

    if (codeInput.trim() === '') {
      return dispatch(handleError('Your snippet is empty'))
    }

    if (nameInput.trim() === '') {
      return dispatch(handleError('Add a title for your snippet'))
    }

    if (parentId === '') {
      return dispatch(handleError('Select a valid parent list'))
    }

    if (languageInput === '') {
      return dispatch(handleError('Select a valid language syntax'))
    }

    else {
      dispatch({ type: ADD_NEW_SNIPPET })
      dispatch(setViewMode('read'))
      dispatch(resetSnippetInputs())
      dispatch(resetError())
    }
  }
}

export const setEditMode = () => {
  return (dispatch, getState) => {
    const selectedSnip = {...getState().snippets.allSnippets.find(x => x.selected === true)}
    dispatch({ type: SET_EDIT_MODE, payload: selectedSnip })
    dispatch(setViewMode('edit'))
  }
}

export const editSnippet = () => {
  return (dispatch, getState) => {
    const snippets = getState().snippets
    const { parentId, codeInput, nameInput } = snippets
    const selectedSnip = getState().snippets.allSnippets.find(x => x.selected === true)
    const id = selectedSnip.createdAt

    if (codeInput.trim() === '') {
      return dispatch(handleError('Your snippet is empty'))
    }

    if (nameInput.trim() === '') {
      return dispatch(handleError('Add a title for your snippet'))
    }

    if (parentId === '') {
      return dispatch(handleError('Select a valid parent list'))
    }

    else {
      dispatch({ type: EDIT_SNIPPET, payload: id })
      dispatch(setViewMode('read'))
      dispatch(resetSnippetInputs())
      dispatch(resetError())
    }
  }
}

export const deleteSnippet = () => ({
  type: DELETE_SNIPPET
})


// HANDLE SNIPPET FORM
export const changeSnippetName = (value) => ({
  type: CHANGE_SNIPPET_NAME,
  payload: value
})

export const changeSnippetCode = (value) => ({
  type: CHANGE_SNIPPET_CODE,
  payload: value
})


export const changeSnippetList = (id) => ({
  type: CHANGE_SNIPPET_LIST,
  payload: id
})

export const changeSnippetLanguage = (value) => ({
  type: CHANGE_SNIPPET_LANGUAGE,
  payload: value
})

export const resetSnippetInputs = () => ({
  type: RESET_SNIPPET_INPUTS
})


// HANDLE ERRORS
export const handleError = (message) => ({
  type: HANDLE_ERROR,
  payload: message
})

export const resetError = () => ({
  type: RESET_ERROR
})
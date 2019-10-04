
import firebase from 'firebase/app'
import 'firebase/database'

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
  SET_EDIT_MODE,
  HANDLE_USER,
  PUSH_DATA_BEGIN,
  PUSH_DATA_SUCCESS,
  PUSH_DATA_ERROR,
  GET_DATA_BEGIN,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
  OPEN_CONFIRM_DELETE_LIST_MODAL,
  OPEN_CONFIRM_DELETE_SNIPPET_MODAL,
  CLOSE_CONFIRM_DELETE_LIST_MODAL,
  CLOSE_CONFIRM_DELETE_SNIPPET_MODAL,
  INIT_UI
} from './types'

// HANDLE HELPER MODALS
export const openConfirmDeleteListModal = () => ({ type: OPEN_CONFIRM_DELETE_LIST_MODAL })
export const closeConfirmDeleteListModal = () => ({ type: CLOSE_CONFIRM_DELETE_LIST_MODAL })

export const openConfirmDeleteSnippetModal = () => ({ type: OPEN_CONFIRM_DELETE_SNIPPET_MODAL })
export const closeConfirmDeleteSnippetModal = () => ({ type: CLOSE_CONFIRM_DELETE_SNIPPET_MODAL })


// HANDLE FIREBASE DATABASE
export const handleUser = (user) => ({
  type: HANDLE_USER,
  payload: user
})

export const pushDataBegin = () => ({ type: PUSH_DATA_BEGIN })

export const pushDataError = (error) => ({
  type: PUSH_DATA_ERROR,
  payload: error.message
})

export const pushDataSuccess = () => ({ type: PUSH_DATA_SUCCESS })

export const pushData = () => {
  return (dispatch, getState) => {
    dispatch(pushDataBegin())
    const lists = getState().lists.allLists
    const snippets = getState().snippets.allSnippets
    const userId = getState().user.userInfo.uid

    firebase.database().ref('users/' + userId).set({lists, snippets})
      .then(() => {
        firebase.database().ref('users/' + userId).once('value', () => {
          dispatch(pushDataSuccess())
        }, error => {
          dispatch(pushDataError(error))
        })
      })
  }
}

export const getDataBegin = () => ({ type: GET_DATA_BEGIN })

export const getDataError = (error) => ({
  type: GET_DATA_ERROR,
  payload: error.message
})

export const getDataSuccess = (data) => ({
  type: GET_DATA_SUCCESS,
  payload: data
})

export const getData = () => {
  return (dispatch, getState) => {
    dispatch(getDataBegin())
    const userId = getState().user.userInfo.uid

    firebase.database().ref('users/' + userId).once("value", snap => {
      const values = snap.val()
      dispatch(getDataSuccess(values))
      // sets the UI logic based on data
      dispatch(initUi())
    }, error => {
      dispatch(getDataError(error))
    })
  }
}

// INIT UI
export const initUi = () => {
  return (dispatch, getState) => {
    const allSnips = getState().snippets.allSnippets
    if (allSnips.length > 0) {
      const selectedSnip = allSnips.find(x => x.selected === true)
      if (selectedSnip) {
        dispatch(setSelectedList(selectedSnip.parentId))
      } else {
        console.log('initUi: no selected snippet')
      }
    } else {
      console.log('initUi: no snippets')
    }
  }
}


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
    const selectedList = { ...getState().lists.allLists.find(x => x.selected === true) }
    dispatch({ type: SET_EDIT_LIST, payload: selectedList.name })
    dispatch(openListModal())
  }
}

export const editList = () => {
  return (dispatch) => {
    dispatch({ type: EDIT_LIST })
    dispatch(pushData())
    dispatch(closeListModal())
  }
}

export const addNewList = () => {
  return (dispatch, getState) => {
    const nameInput = getState().lists.nameInput

    if (nameInput.trim() === '') {
      return dispatch(handleError('Name is empty or not valid'))
    }

    dispatch({ type: ADD_NEW_LIST })
    dispatch(pushData())
    dispatch(closeListModal())
  }
}

export const deleteList = () => {
  return (dispatch, getState) => {
    const lists = getState().lists
    const selectedList = lists.allLists.find(x => x.selected === true)
    const listId = selectedList.createdAt
    dispatch({ type: DELETE_LIST, payload: listId })
    dispatch(pushData())
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
      dispatch(pushData())
      dispatch(setViewMode('read'))
      dispatch(resetSnippetInputs())
      dispatch(resetError())
    }
  }
}

export const setEditMode = () => {
  return (dispatch, getState) => {
    const selectedSnip = { ...getState().snippets.allSnippets.find(x => x.selected === true) }
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
      dispatch(pushData())
      dispatch(setViewMode('read'))
      dispatch(resetSnippetInputs())
      dispatch(resetError())
    }
  }
}

export const deleteSnippet = () => {
  return (dispatch) => {
    dispatch({ type: DELETE_SNIPPET })
    dispatch(pushData())
  }
}

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


/////////////////////////////////////////////////////

import { 
  OPEN_LIST_MODAL, 
  CLOSE_LIST_MODAL,
  CHANGE_LIST_MODAL_NAME,
  RESET_LIST_MODAL_NAME,
  ADD_NEW_LIST
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
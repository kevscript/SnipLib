import { 
  OPEN_LIST_MODAL, 
  CLOSE_LIST_MODAL 
} from './types'

export const openListModal = () => ({
  type: OPEN_LIST_MODAL
})

export const closeListModal = () => ({
  type: CLOSE_LIST_MODAL
})
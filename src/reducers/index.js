import { combineReducers } from 'redux'
import listsReducer from './listsReducer'
import snippetsReducer from './snippetsReducer'

export default combineReducers({
  lists: listsReducer,
  snippets: snippetsReducer
})

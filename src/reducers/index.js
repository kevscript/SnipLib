import { combineReducers } from 'redux'
import listsReducer from './listsReducer'
import snippetsReducer from './snippetsReducer'
import userReducer from './userReducer'

export default combineReducers({
  lists: listsReducer,
  snippets: snippetsReducer,
  user: userReducer
})

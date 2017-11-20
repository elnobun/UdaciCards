import initialState from './initial-state'

const restoreDefaultDecks = (state, action) => {
  return {...state, ...initialState}
}

export default restoreDefaultDecks

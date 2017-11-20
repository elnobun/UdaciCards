const deleteDeck = (state, action) => {
  const {name} = action.payload
  const newState = {...state}
  delete newState[name]
  return newState
}

export default deleteDeck

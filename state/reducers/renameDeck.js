const renameDeck = (state, action) => {
  const {name, newName} = action.payload
  const deck = {...state[name], title: newName}
  const newState = {...state}
  delete newState[name]
  return {
    ...newState,
    [newName]: deck
  }
}

export default renameDeck

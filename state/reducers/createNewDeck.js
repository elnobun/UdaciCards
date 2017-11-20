const createNewDeck = (state, action) => {
  const {name} = action.payload
  return {
    ...state,
    [name]: {
      title: name,
      questions: []
    }
  }
}

export default createNewDeck

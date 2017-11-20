const addCardToDeck = (state, action) => {
  const {card, deckName} = action.payload
  const updatedDeck = {...state[deckName]}
  updatedDeck.questions = [...state[deckName].questions]
  updatedDeck.questions.push(card)

  return {
    ...state,
    [deckName]: updatedDeck
  }
}

export default addCardToDeck

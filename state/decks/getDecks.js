const getDecks = data => {
  return Object.values(data).map(deck => ({...deck, key: deck.title}))
}

export default getDecks

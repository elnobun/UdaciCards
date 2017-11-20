const getDeckIds = data => {
  return Object.values(data).map(deck => deck.title)
}

export default getDeckIds

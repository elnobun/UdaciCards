import arrayShuffle from 'array-shuffle'

const getDeckQuestionsShuffled = (data, id) => {
  return arrayShuffle(data[id].questions)
}

export default getDeckQuestionsShuffled

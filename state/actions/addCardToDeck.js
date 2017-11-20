import {ADD_CARD_TO_DECK} from './types'
export const addCardToDeck = payload => {
  return {type: ADD_CARD_TO_DECK, payload}
}

export default addCardToDeck

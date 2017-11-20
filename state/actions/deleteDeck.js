import {DELETE_DECK} from './types'
const deleteDeck = payload => {
  return {type: DELETE_DECK, payload}
}

export default deleteDeck

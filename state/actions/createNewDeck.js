import {CREATE_NEW_DECK} from './types'
const createNewDeck = payload => {
  return {type: CREATE_NEW_DECK, payload}
}

export default createNewDeck

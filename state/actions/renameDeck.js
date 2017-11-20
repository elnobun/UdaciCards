import {RENAME_DECK} from './types'
const renameDeck = payload => {
  return {type: RENAME_DECK, payload}
}

export default renameDeck

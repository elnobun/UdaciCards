import {AsyncStorage} from 'react-native'
import {createStore} from 'redux'
import {persistStore, autoRehydrate} from 'redux-persist'
import {composeWithDevTools} from 'remote-redux-devtools'
import reducer from './reducers/reducer'

const store = createStore(reducer, {}, composeWithDevTools(autoRehydrate()))
persistStore(store, {storage: AsyncStorage})

export default store

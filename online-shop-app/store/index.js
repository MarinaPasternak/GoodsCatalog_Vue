import Vuex from 'vuex'
import { state, mutations, actions, getters } from './modules/products'

const createStore = () => {
  return new Vuex.Store({
    state,
    mutations,
    actions,
    getters
  })
}

export default createStore

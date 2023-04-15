import Vuex from 'vuex'
import { 
  state as productState, 
  mutations as productMutations,
  actions as productActions,
} from './modules/products';
import { 
  state as categoryState,
  mutations as categoryMutations,
  actions as categoryActions,
} from './modules/categories';

const createStore = () => {
  return new Vuex.Store({
    modules: {
      products: {
        state: productState,
        mutations: productMutations,
        actions: productActions,
      },
      categories: {
        state: categoryState,
        mutations: categoryMutations,
        actions: categoryActions,
      }
    }
  })
}

export default createStore
